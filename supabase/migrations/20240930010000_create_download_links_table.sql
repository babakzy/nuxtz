-- Migration: Create download_links table
-- Purpose: Creates a table to store secure download links for purchased boilerplates
-- Affected Tables: download_links
-- Timestamp: 2024-09-30 01:00:00 UTC

-- Create the download_links table
CREATE TABLE public.download_links (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID NOT NULL REFERENCES public.customers(id),
    token TEXT NOT NULL UNIQUE,
    product_name TEXT NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::TEXT, now()) NOT NULL,
    is_used BOOLEAN DEFAULT FALSE NOT NULL
);

-- Add comments to the columns
COMMENT ON TABLE public.download_links IS 'Securely stores download tokens for purchased boilerplates';
COMMENT ON COLUMN public.download_links.token IS 'Unique token used in download URL';
COMMENT ON COLUMN public.download_links.customer_id IS 'Reference to the customer who purchased the boilerplate';
COMMENT ON COLUMN public.download_links.product_name IS 'Name of the product/boilerplate being downloaded';
COMMENT ON COLUMN public.download_links.expires_at IS 'When this download link expires';
COMMENT ON COLUMN public.download_links.is_used IS 'Whether this download link has been used';

-- Enable row level security
ALTER TABLE public.download_links ENABLE ROW LEVEL SECURITY;

-- Create policy for service_role to have full access
CREATE POLICY "Allow service_role full access to download_links" 
  ON public.download_links
  AS PERMISSIVE
  FOR ALL
  TO service_role
  USING (TRUE)
  WITH CHECK (TRUE);

-- Create index on token for faster lookups
CREATE INDEX download_links_token_idx ON public.download_links (token);

-- Create index on customer_id for faster lookups
CREATE INDEX download_links_customer_id_idx ON public.download_links (customer_id); 