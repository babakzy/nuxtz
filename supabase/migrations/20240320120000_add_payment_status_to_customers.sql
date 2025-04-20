-- Add payment status tracking to customers table
alter table public.customers
add column payment_status text default 'pending';

-- Optional: Add an index if you query by status often
-- create index idx_customers_payment_status on public.customers(payment_status); 