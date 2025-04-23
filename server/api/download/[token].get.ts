import { defineEventHandler, createError } from 'h3'
import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'

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
        Update: {
          is_used?: boolean;
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
    console.error('[download] Supabase Service Role Key is not configured')
    throw createError({ 
      statusCode: 500, 
      statusMessage: 'Server configuration error' 
    })
  }
  
  // Initialize Supabase Client
  const supabaseUrl = process.env.SUPABASE_URL || '';
  if (!supabaseUrl) {
    console.error('[download] SUPABASE_URL is not configured')
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
      console.error(`[download] Download link not found:`, linkError)
      throw createError({
        statusCode: 404,
        statusMessage: 'Download link not found or invalid',
      })
    }
    
    // Check if link has expired
    if (new Date(link.expires_at) < new Date()) {
      console.error(`[download] Download link expired:`, link.id)
      throw createError({
        statusCode: 410,
        statusMessage: 'Download link has expired',
      })
    }
    
    // Get the file path based on product name
    const fileName = getFileNameForProduct(link.product_name)
    const filePath = path.resolve(process.cwd(), 'downloads', fileName)
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.error(`[download] File not found:`, filePath)
      throw createError({
        statusCode: 404,
        statusMessage: 'File not found',
      })
    }
    
    // Update the link to mark it as used
    await supabase
      .from('download_links')
      .update({ is_used: true })
      .eq('id', link.id)
    
    // Set headers for download
    event.node.res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`)
    event.node.res.setHeader('Content-Type', 'application/zip')
    
    // Stream the file
    const fileStream = fs.createReadStream(filePath)
    return fileStream
  } catch (error: any) {
    console.error('[download] Error:', error)
    
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

// Helper function to get the correct file name based on product name
function getFileNameForProduct(productName: string): string {
  // Map product names to their respective files
  // This could be improved by storing file paths in the database
  const productMap: Record<string, string> = {
    'Minimal Boilerplate': 'nuxtz-minimal-boilerplate.zip',
    'Full-Stack Boilerplate': 'nuxtz-fullstack-boilerplate.zip'
  }
  
  return productMap[productName] || 'nuxtz-minimal-boilerplate.zip'
} 