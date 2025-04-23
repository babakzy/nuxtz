-- Migration: Remove unique constraint from email in customers table
-- Purpose: Allows customers to purchase multiple times with the same email
-- Affected Tables: customers
-- Timestamp: 2024-08-28 12:30:00 UTC

-- First drop the constraint
ALTER TABLE public.customers
DROP CONSTRAINT IF EXISTS customers_email_key;

-- Still keep email as not null
ALTER TABLE public.customers
ALTER COLUMN email SET NOT NULL; 