import { defineEventHandler, readBody } from 'h3'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

// Define the expected structure for the database interactions
interface Customer {
  id: string
  payment_status?: string | null
}
interface Database {
  public: {
    Tables: {
      customers: {
        Row: Customer
        Update: Partial<Omit<Customer, 'id'>>
      }
    }
  }
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const { sessionId } = await readBody(event)

  // Validate input
  if (!sessionId || typeof sessionId !== 'string' || !sessionId.startsWith('cs_')) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid Stripe Session ID provided.',
    })
  }

  // Check for secret keys
  if (!config.stripeSecretKey) {
    console.error('Stripe Secret Key is not configured in runtimeConfig.')
    throw createError({ statusCode: 500, statusMessage: 'Server configuration error.' })
  }
  if (!config.supabaseServiceRoleKey) {
    console.error('Supabase Service Role Key is not configured in runtimeConfig.')
    throw createError({ statusCode: 500, statusMessage: 'Server configuration error.' })
  }

  // Initialize Stripe
  const stripe = new Stripe(config.stripeSecretKey, {
    apiVersion: '2025-03-31.basil', // Use the API version suggested by types
  })

  // Initialize Supabase Client with Service Role Key
  // Note: Use the public URL from runtime config or env if needed, not hardcoded
  const supabaseUrl = process.env.SUPABASE_URL || ''
  const supabase = createClient<Database>(supabaseUrl, config.supabaseServiceRoleKey)

  try {
    // Retrieve the session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    // Check payment status and client reference ID
    if (session.payment_status === 'paid' && session.client_reference_id) {
      const customerId = session.client_reference_id

      // Update the customer record in Supabase
      const { error: updateError } = await supabase
        .from('customers')
        .update({ payment_status: 'paid' })
        .eq('id', customerId)

      if (updateError) {
        console.error(`Failed to update customer ${customerId} payment status:`, updateError)
        // Decide if this should be a 500 error or just a failed verification status
        return { status: 'failed', message: 'Failed to update customer record.' }
      }

      console.log(`Successfully verified payment and updated customer ${customerId}`)
      return { status: 'success' }

    } else {
      console.warn(`Session ${sessionId} not paid or missing client_reference_id. Status: ${session.payment_status}`)
      return { status: 'failed', message: 'Payment not confirmed by Stripe.' }
    }

  } catch (error: any) {
    console.error(`Error verifying Stripe session ${sessionId}:`, error)
    // Handle specific Stripe errors if necessary
    if (error.type === 'StripeInvalidRequestError') {
      throw createError({ statusCode: 404, statusMessage: 'Stripe Session not found.' })
    }
    throw createError({ statusCode: 500, statusMessage: 'Failed to verify Stripe session.' })
  }
}) 