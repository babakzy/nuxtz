import { defineEventHandler, createError } from 'h3'
import { createClient } from '@supabase/supabase-js'

interface Database {
  public: {
    Tables: {
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
      }
    }
  }
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const token = event.context.params?.token
  
  // Validate token
  if (!token) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid download token',
    })
  }
  
  // Check for required config
  if (!config.supabaseServiceRoleKey) {
    console.error('[download-info] Supabase Service Role Key is not configured')
    throw createError({ 
      statusCode: 500, 
      statusMessage: 'Server configuration error' 
    })
  }
  
  // Initialize Supabase Client
  const supabaseUrl = process.env.SUPABASE_URL || '';
  if (!supabaseUrl) {
    console.error('[download-info] SUPABASE_URL is not configured')
    throw createError({ 
      statusCode: 500, 
      statusMessage: 'Server configuration error' 
    })
  }
  
  const supabase = createClient<Database>(supabaseUrl, config.supabaseServiceRoleKey)
  
  try {
    // Find the download link with this token
    const { data: link, error: linkError } = await supabase
      .from('download_links')
      .select('*')
      .eq('token', token)
      .single()
    
    if (linkError || !link) {
      console.error(`[download-info] Download link not found:`, linkError)
      throw createError({
        statusCode: 404,
        statusMessage: 'Download link not found or invalid',
      })
    }
    
    // Check if link has expired
    if (new Date(link.expires_at) < new Date()) {
      console.error(`[download-info] Download link expired:`, link.id)
      throw createError({
        statusCode: 410,
        statusMessage: 'Download link has expired',
      })
    }
    
    // Return basic info about the download
    return {
      productName: link.product_name,
      expiresAt: link.expires_at,
      isUsed: link.is_used
    }
  } catch (error: any) {
    console.error('[download-info] Error:', error)
    
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