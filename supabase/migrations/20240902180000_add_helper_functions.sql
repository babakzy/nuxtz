-- Migration: Add helper functions for API endpoints
-- Purpose: Creates utility functions for checking database state
-- Affected Tables: none
-- Timestamp: 2024-09-02 18:00:00 UTC

-- Function to check if another function exists
create or replace function public.check_function_exists(function_name text)
returns boolean language plpgsql security definer as $$
begin
  return exists (
    select 1 from pg_proc 
    where proname = function_name
  );
end;
$$;

-- Add appropriate comment
comment on function public.check_function_exists(text) is 'Checks if a function exists in the database';

-- Create trigger check function
create or replace function public.check_trigger_exists(trigger_name text, table_name text)
returns boolean language plpgsql security definer as $$
begin
  return exists (
    select 1 from pg_trigger
    where tgname = trigger_name
    and tgrelid = (table_name::regclass)::oid
  );
end;
$$;

-- Add appropriate comment
comment on function public.check_trigger_exists(text, text) is 'Checks if a trigger exists on a specified table'; 