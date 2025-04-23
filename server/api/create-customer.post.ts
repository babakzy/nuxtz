import { defineEventHandler, readBody, createError } from 'h3'
// Switch back to service role for admin operations
import { serverSupabaseServiceRole } from '#supabase/server'

// Define the expected structure for the database interactions
interface CustomerInsert {
  full_name: string
  email: string
  company_name?: string | null
  phone_number?: string | null
  payment_status?: string | null
  product_name?: string | null
}

interface CustomerRow {
    id: string
    // include other fields if needed from the select
}

interface Database {
  public: {
    Tables: {
      customers: {
        Row: CustomerRow
        Insert: CustomerInsert
      }
    }
  }
}

export default defineEventHandler(async (event) => {
  console.log('[/api/create-customer] Route handler invoked.');
  const body = await readBody<Omit<CustomerInsert, 'payment_status'>>(event)

  // Basic validation
  if (!body || !body.email || !body.full_name) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required customer information (email, full_name).',
    })
  }

  // --- Remove or comment out the test read, no longer needed for diagnosis ---
  // try {
  //   const { error: testReadError } = await supabase.from('customers').select('id').limit(1);
  //   if (testReadError) {
  //     console.log('[create-customer] Test read failed: ', testReadError.message);
  //   } else {
  //     console.log('[create-customer] Test read successful.');
  //   }
  // } catch (e) {
  //     console.log('[create-customer] Exception during test read.', e);
  // }
  // --------------------------------------------------------------------------

  try {
    // Log the input data for debugging
    console.log('[create-customer] Input data:', JSON.stringify(body, null, 2));
    
    // Switch back to service role client
    const supabaseAdmin = await serverSupabaseServiceRole<Database>(event)
    
    const customerData: CustomerInsert = {
      full_name: body.full_name,
      email: body.email,
      company_name: body.company_name || null,
      phone_number: body.phone_number || null,
      payment_status: 'pending',
      product_name: body.product_name || null,
    }

    console.log('[create-customer] Prepared data for insert:', JSON.stringify(customerData, null, 2));

    // Use the service role client to bypass RLS
    const { data: newCustomer, error } = await supabaseAdmin
      .from('customers')
      .insert(customerData)
      .select('id') // Select only the ID
      .single()     // Expect a single row back

    if (error) {
      // Log the detailed error for diagnosis
      console.error('Supabase insert error (using service role):', {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint,
        fullError: JSON.stringify(error, null, 2)
      });
      
      // NOTE: We've removed the duplicate email check since we're allowing repeated emails now
      // RLS policy allows anon insert, so errors might be constraints (like unique email if re-enabled) or DB issues.
      // If using service_role, RLS check isn't the primary concern here. Check for other constraints.
      if (error.code === '23505') { // Handle potential unique constraint violations
           throw createError({ 
             statusCode: 409, 
             statusMessage: 'This email might already be registered.', // Adjust message as needed
             data: { code: 'DUPLICATE_ENTRY' } 
           })
      }
      
      // For any database error
      throw createError({ 
        statusCode: 500, 
        statusMessage: `Failed to create customer record in database: ${error.message || 'Unknown error'}` 
      })
    }

    if (!newCustomer || !newCustomer.id) {
        console.error('Supabase insert succeeded but did not return an ID.')
        throw createError({ statusCode: 500, statusMessage: 'Failed to retrieve customer ID after creation.' })
    }

    console.log('[create-customer] Successfully created customer with ID:', newCustomer.id);
    
    // Return the ID of the newly created customer
    return { customerId: newCustomer.id }

  } catch (error: any) {
    console.error('Error during customer creation API call:', error)
    // Re-throw H3 errors, otherwise wrap in a generic 500
    if (error.statusCode) {
        throw error;
    }
    throw createError({ 
      statusCode: 500, 
      statusMessage: `An unexpected error occurred: ${error.message || 'Unknown error'}` 
    })
  }
}) 