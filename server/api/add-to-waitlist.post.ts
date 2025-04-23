import { defineEventHandler, readBody, createError } from 'h3'
// Import the standard client for anonymous access
import { serverSupabaseClient } from '#supabase/server'
import { EmailService } from '../utils/emailService'

// Define the expected body structure
interface WaitlistBody {
  email: string
}

// Define the database structure for type safety (optional but recommended)
// Note: You'd ideally generate this with `supabase gen types typescript`
interface Database {
  public: {
    Tables: {
      waiting_customers: {
        Row: { id: string; email: string; created_at: string; updated_at: string; notified: boolean }
        Insert: { email: string }
      }
    }
  }
}

export default defineEventHandler(async (event) => {
  console.log('[/api/add-to-waitlist] Route handler invoked.');
  let body: WaitlistBody;
  
  try {
    body = await readBody<WaitlistBody>(event);
  } catch (error) {
    console.error('[/api/add-to-waitlist] Error reading request body:', error);
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid request body. Expected JSON with email field.',
    });
  }

  // --- Basic Validation ---
  if (!body || !body.email) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required field: email.',
    })
  }

  // Basic email format validation (consider a more robust library for production)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(body.email)) {
     throw createError({
      statusCode: 400,
      statusMessage: 'Invalid email format.',
    })
  }

  try {
    console.log('[/api/add-to-waitlist] Getting Supabase client...');
    // Get the Supabase client instance (uses anon key by default)
    const supabase = await serverSupabaseClient<Database>(event)
    console.log('[/api/add-to-waitlist] Supabase client initialized');

    const waitlistData: { email: string } = {
      email: body.email,
    }

    console.log(`[/api/add-to-waitlist] Attempting to insert email: ${body.email}`);
    
    try {
      // Attempt to insert the email
      const { data, error } = await supabase
        .from('waiting_customers')
        .insert(waitlistData)

      if (error) {
        console.error('[/api/add-to-waitlist] Supabase insert error:', error);
        // Check for unique constraint violation (duplicate email)
        if (error.code === '23505') { // Postgres unique violation code
           throw createError({ 
             statusCode: 409, 
             statusMessage: 'This email is already registered.', 
             data: { code: 'DUPLICATE_EMAIL' } 
           })
        }
        
        // Handle "relation does not exist" error
        if (error.message && error.message.includes('does not exist')) {
          throw createError({
            statusCode: 500,
            statusMessage: 'Waiting list table not found. Please contact support.',
            data: { 
              code: 'TABLE_NOT_FOUND',
              details: 'The waiting_customers table does not exist in the database.'
            }
          })
        }
        
        // For other insert errors using anon key (RLS issues, network, etc.)
        throw createError({ 
          statusCode: 500, 
          statusMessage: 'Failed to add email to the waiting list.', 
          data: { error: error.message, code: error.code } 
        })
      }

      console.log('[/api/add-to-waitlist] Successfully inserted email');
      
      // Get Resend API key from runtime config
      const config = useRuntimeConfig(event);
      
      // Initialize the email service
      const emailService = EmailService.fromRuntimeConfig(config);
      
      // Send confirmation email
      try {
        const emailSent = await emailService.sendWaitlistConfirmation(body.email);
        if (emailSent) {
          console.log(`[/api/add-to-waitlist] Sent confirmation email to ${body.email}`);
        } else {
          console.warn(`[/api/add-to-waitlist] Failed to send confirmation email to ${body.email}`);
        }
      } catch (emailError) {
        // Log the error but don't fail the request - user is still on waitlist
        console.error('[/api/add-to-waitlist] Email service error:', emailError);
      }
      
      // Success
      // Set status code to 201 for resource creation
      event.node.res.statusCode = 201;
      return { message: 'Successfully added to the waiting list.' }
    } catch (insertError: any) {
      // If this is already a H3 error, just re-throw it
      if (insertError.statusCode) {
        throw insertError;
      }
      
      // Otherwise wrap it
      console.error('[/api/add-to-waitlist] Insert operation error:', insertError);
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to process your request',
        data: { 
          message: 'An error occurred while adding your email to the waitlist.' 
        }
      });
    }
  } catch (error: any) {
    console.error('[/api/add-to-waitlist] Error during waitlist API call:', error)
    
    // Log more details about the error
    if (error.cause) {
      console.error('[/api/add-to-waitlist] Error cause:', error.cause)
    }
    
    // Re-throw H3 errors, otherwise wrap in a generic 500
    if (error.statusCode) {
        throw error;
    }
    
    throw createError({ 
      statusCode: 500, 
      statusMessage: 'An unexpected error occurred.', 
      data: { 
        message: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined 
      } 
    })
  }
}) 