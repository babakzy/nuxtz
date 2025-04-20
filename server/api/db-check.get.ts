import { defineEventHandler, createError } from 'h3'
import { serverSupabaseClient } from '#supabase/server'

// Define type for the table
interface Customer {
  id: string
  email: string
  created_at: string
  updated_at: string
  notified: boolean
}

// Define Database types
interface Database {
  public: {
    Tables: {
      waiting_customers: {
        Row: Customer
      }
    }
  }
}

export default defineEventHandler(async (event) => {
  console.log('[/api/db-check] Database check initiated')
  
  try {
    // Get Supabase client
    const supabase = await serverSupabaseClient<Database>(event)
    
    // Check if we can access the waiting_customers table
    const { data, error, count } = await supabase
      .from('waiting_customers')
      .select('*', { count: 'exact' })
      .limit(0)
    
    if (error) {
      console.error('[/api/db-check] Error accessing waiting_customers table:', error)
      return {
        success: false,
        tableExists: false,
        error: error.message
      }
    }
    
    return {
      success: true,
      tableExists: true,
      rowCount: count || 0
    }
  } catch (error: any) {
    console.error('[/api/db-check] Database check failed:', error)
    
    // If the error is about the table not existing, that's useful info
    if (error.message && error.message.includes('does not exist')) {
      return {
        success: false,
        tableExists: false,
        error: "The waiting_customers table doesn't exist. Run migrations to create it."
      }
    }
    
    throw createError({
      statusCode: 500,
      statusMessage: 'Database check failed',
      data: { 
        message: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined 
      }
    })
  }
}) 