-- Migration: Add product_name column to customers table
-- Purpose: Adds a column to track which product the customer is interested in
-- Affected Tables: customers
-- Timestamp: 2024-08-28 12:25:00 UTC

-- Add product_name column to customers table
alter table public.customers
add column product_name text default null;

-- Add comment to explain the column's purpose
comment on column public.customers.product_name is 'Name of the product the customer is interested in or has purchased';

-- Optional: Add an index if you query by product_name often
-- create index idx_customers_product_name on public.customers(product_name); 