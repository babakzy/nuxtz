import { defineEventHandler, readBody, createError } from 'h3'
// Import the specific service role client function
import { serverSupabaseServiceRole } from '#supabase/server'

// Define the expected structure for the database interactions
interface CustomerInsert {
  full_name: string
  email: string
  company_name?: string | null
  phone_number?: string | null
  payment_status?: string | null
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

  // Get the Supabase client instance explicitly using the Service Role Key
  const supabaseAdmin = serverSupabaseServiceRole<Database>(event)

  // --- Remove or comment out the test read, no longer needed for diagnosis ---
  // try {
  //   const { error: testReadError } = await supabaseAdmin.from('customers').select('id').limit(1);
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
    const customerData: CustomerInsert = {
      full_name: body.full_name,
      email: body.email,
      company_name: body.company_name || null,
      phone_number: body.phone_number || null,
      payment_status: 'pending',
    }

    // Use the admin client which bypasses RLS
    const { data: newCustomer, error } = await supabaseAdmin
      .from('customers')
      .insert(customerData)
      .select('id') // Select only the ID
      .single()     // Expect a single row back

    if (error) {
      // Log the error regardless of type now
      console.error('Supabase insert error (using Service Role): ', error);
      // Check for unique constraint violation (e.g., duplicate email)
      if (error.code === '23505') { // Postgres unique violation code
         throw createError({ statusCode: 409, statusMessage: 'Email already exists.', data: { code: 'DUPLICATE_EMAIL' } })
      }
      // For any other insert error using service role, it's likely a server/DB issue
      throw createError({ statusCode: 500, statusMessage: 'Failed to create customer record in database.' })
    }

    if (!newCustomer || !newCustomer.id) {
        console.error('Supabase insert succeeded but did not return an ID.')
        throw createError({ statusCode: 500, statusMessage: 'Failed to retrieve customer ID after creation.' })
    }

    // Return the ID of the newly created customer
    return { customerId: newCustomer.id }

  } catch (error: any) {
    console.error('Error during customer creation API call:', error)
    // Re-throw H3 errors, otherwise wrap in a generic 500
    if (error.statusCode) {
        throw error;
    }
    throw createError({ statusCode: 500, statusMessage: 'An unexpected error occurred.' })
  }
}) 