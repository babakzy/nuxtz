import { defineEventHandler, readBody, createError } from 'h3'
import { createClient } from '@supabase/supabase-js'
import crypto from 'crypto'

interface GenerateUrlRequest {
  customerId: string;
  productName: string;
}

// Define customer type for database interaction
interface Customer {
  id: string;
  payment_status: string;
  email: string;
  full_name: string;
  product_name?: string;
}

interface Database {
  public: {
    Tables: {
      customers: {
        Row: Customer;
        Update: Partial<Customer>;
      }
      download_links: {
        Row: {
          id: string;
          customer_id: string;
          token: string;
          product_name: string;
          expires_at: string;
          created_at: string;
          is_used: boolean;
        };
        Insert: {
          customer_id: string;
          token: string;
          product_name: string;
          expires_at: string;
          is_used?: boolean;
        };
      }
    }
  }
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  
  // Get request body
  const body = await readBody<GenerateUrlRequest>(event)
  
  // Validate input
  if (!body || !body.customerId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required field: customerId',
    })
  }
  
  // Check for required config
  if (!config.supabaseServiceRoleKey) {
    console.error('[generate-download-url] Supabase Service Role Key is not configured')
    throw createError({ 
      statusCode: 500, 
      statusMessage: 'Server configuration error' 
    })
  }

  // Initialize Supabase client
  const supabaseUrl = process.env.SUPABASE_URL || '';
  if (!supabaseUrl) {
    console.error('[generate-download-url] SUPABASE_URL is not configured')
    throw createError({ 
      statusCode: 500, 
      statusMessage: 'Server configuration error' 
    })
  }
  
  const supabase = createClient<Database>(supabaseUrl, config.supabaseServiceRoleKey)
  
  try {
    // Verify customer exists and has paid
    const { data: customer, error: customerError } = await supabase
      .from('customers')
      .select('id, email, full_name, payment_status, product_name')
      .eq('id', body.customerId)
      .single()
    
    if (customerError || !customer) {
      console.error(`[generate-download-url] Customer not found:`, customerError)
      throw createError({
        statusCode: 404,
        statusMessage: 'Customer not found',
      })
    }
    
    if (customer.payment_status !== 'paid') {
      console.error(`[generate-download-url] Customer has not paid:`, customer.id)
      throw createError({
        statusCode: 403,
        statusMessage: 'Payment not completed',
      })
    }
    
    // Generate secure token
    const token = crypto.randomBytes(32).toString('hex')
    
    // Set expiration date (7 days from now)
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + 7)
    
    // Store token in database
    const { data: link, error: linkError } = await supabase
      .from('download_links')
      .insert({
        customer_id: customer.id,
        token: token,
        product_name: customer.product_name || body.productName || 'Minimal Boilerplate',
        expires_at: expiresAt.toISOString(),
        is_used: false
      })
      .select()
      .single()
    
    if (linkError) {
      console.error(`[generate-download-url] Error creating download link:`, linkError)
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to generate download link',
      })
    }
    
    // Generate the download URL
    const baseUrl = config.public?.baseUrl || 'http://localhost:3000'
    const downloadUrl = `${baseUrl}/download/${token}`
    
    return {
      url: downloadUrl,
      expiresAt: expiresAt.toISOString()
    }
  } catch (error: any) {
    console.error('[generate-download-url] Error:', error)
    
    // Re-throw H3 errors, otherwise wrap in a generic 500
    if (error.statusCode) {
      throw error
    }
    
    throw createError({
      statusCode: 500,
      statusMessage: `An unexpected error occurred: ${error.message || 'Unknown error'}`,
    })
  }
}) 