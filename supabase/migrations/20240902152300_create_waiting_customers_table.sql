-- Migration: Create waiting_customers table
-- Purpose: Creates a table to store emails for customers waiting for the full-stack boilerplate.
-- Affected Tables: waiting_customers
-- Timestamp: 2024-09-02 15:23:00 UTC

-- create the waiting_customers table
create table public.waiting_customers (
    id uuid primary key default gen_random_uuid(),
    email text not null unique, -- Store any email format
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    notified boolean default false not null -- track if customer has been notified
);

-- add comments to the columns
comment on column public.waiting_customers.email is 'User email address for the full-stack boilerplate waiting list.';
comment on column public.waiting_customers.created_at is 'Timestamp when the email was added.';
comment on column public.waiting_customers.updated_at is 'Timestamp when the record was last updated.';
comment on column public.waiting_customers.notified is 'Whether the customer has been notified about product availability.';

-- enable row level security for the table
alter table public.waiting_customers enable row level security;

-- create rls policy for anonymous users to insert their email
create policy "Allow anonymous insert access" on public.waiting_customers
as permissive
for insert
to anon -- Applies to anonymous users
with check (true); -- Allows any insert

-- create rls policy for authenticated users to insert their email
create policy "Allow authenticated insert access" on public.waiting_customers
as permissive
for insert
to authenticated -- Applies to authenticated users
with check (true);

-- create rls policy for service_role to manage all data
create policy "Allow service_role full access" on public.waiting_customers
as permissive
for all -- Applies to SELECT, INSERT, UPDATE, DELETE
to service_role -- Applies only to requests using the service_role key
using (true)
with check (true);

-- Create the handle_updated_at function if it doesn't exist
do
$do$
begin
  if not exists (select from pg_proc where proname = 'handle_updated_at') then
    execute 
    '
    create or replace function public.handle_updated_at()
    returns trigger as $trigger$
    begin
        new.updated_at = timezone(''utc''::text, now());
        return new;
    end;
    $trigger$ language plpgsql security definer;
    ';
  end if;
end
$do$;

-- Create trigger for updating updated_at timestamp
create trigger on_waiting_customers_updated
    before update on public.waiting_customers
    for each row
    execute procedure public.handle_updated_at(); 