-- Create customers table to store customer information
create table public.customers (
    id uuid default gen_random_uuid() primary key,
    email text not null unique,
    full_name text not null,
    company_name text,
    phone_number text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.customers enable row level security;

-- RLS Policies --

-- Allow anonymous users to insert their data
-- We don't link anonymous submissions to auth.uid()
create policy "Anon users can insert customer data" on public.customers
    for insert
    to anon
    with check (true);

-- Allow authenticated users to view their own data (if needed later)
create policy "Authenticated users can view their own customer data" on public.customers
    for select
    to authenticated
    using (auth.uid() = id);

-- Allow authenticated users to insert their own data (if needed later, assumes id matches auth.uid())
create policy "Users can insert their own customer data" on public.customers
    for insert
    to authenticated
    with check (auth.uid() = id);

-- Allow authenticated users to update their own data (if needed later)
create policy "Users can update their own customer data" on public.customers
    for update
    to authenticated
    using (auth.uid() = id)
    with check (auth.uid() = id);

-- Create trigger for updating updated_at timestamp
create or replace function public.handle_updated_at()
returns trigger as $$
begin
    new.updated_at = timezone('utc'::text, now());
    return new;
end;
$$ language plpgsql security definer;

create trigger on_customers_updated
    before update on public.customers
    for each row
    execute procedure public.handle_updated_at();

-- Migration: Create waiting_list table
-- Purpose: Creates a table to store emails for the product waiting list.
-- Affected Tables: waiting_list
-- Timestamp: Set dynamically during file creation

-- create the waiting_list table
create table public.waiting_list (
    id uuid primary key default gen_random_uuid(),
    email text not null unique check (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$'), -- Basic email format validation
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- add comments to the columns
comment on column public.waiting_list.email is 'User email address for the waiting list.';
comment on column public.waiting_list.created_at is 'Timestamp when the email was added.';

-- enable row level security for the table
alter table public.waiting_list enable row level security;

-- create rls policy for anonymous users to insert their email
-- this table is intended for public sign-ups, so anon users need insert permissions.
create policy "Allow anonymous insert access" on public.waiting_list
as permissive
for insert
to anon -- Applies to anonymous users (e.g., using the default Supabase client)
with check (true); -- Allows any insert without specific checks on the data itself

-- create rls policy for authenticated users (service_role) to select/delete/update data
-- this allows backend processes using the service role key to manage the list.
create policy "Allow service_role full access" on public.waiting_list
as permissive
for all -- Applies to SELECT, INSERT, UPDATE, DELETE
to service_role -- Applies only to requests using the service_role key
using (true) -- Allows access to all existing rows
with check (true); -- Allows all operations on new/updated rows 