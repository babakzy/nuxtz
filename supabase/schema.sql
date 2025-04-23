

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


CREATE EXTENSION IF NOT EXISTS "pg_net" WITH SCHEMA "extensions";






COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE OR REPLACE FUNCTION "public"."check_function_exists"("function_name" "text") RETURNS boolean
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
begin
  return exists (
    select 1 from pg_proc 
    where proname = function_name
  );
end;
$$;


ALTER FUNCTION "public"."check_function_exists"("function_name" "text") OWNER TO "postgres";


COMMENT ON FUNCTION "public"."check_function_exists"("function_name" "text") IS 'Checks if a function exists in the database';



CREATE OR REPLACE FUNCTION "public"."check_trigger_exists"("trigger_name" "text", "table_name" "text") RETURNS boolean
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
begin
  return exists (
    select 1 from pg_trigger
    where tgname = trigger_name
    and tgrelid = (table_name::regclass)::oid
  );
end;
$$;


ALTER FUNCTION "public"."check_trigger_exists"("trigger_name" "text", "table_name" "text") OWNER TO "postgres";


COMMENT ON FUNCTION "public"."check_trigger_exists"("trigger_name" "text", "table_name" "text") IS 'Checks if a trigger exists on a specified table';



CREATE OR REPLACE FUNCTION "public"."handle_updated_at"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
begin
    new.updated_at = timezone('utc'::text, now());
    return new;
end;
$$;


ALTER FUNCTION "public"."handle_updated_at"() OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."customers" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "email" "text" NOT NULL,
    "full_name" "text" NOT NULL,
    "company_name" "text",
    "phone_number" "text",
    "created_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL,
    "payment_status" "text" DEFAULT 'pending'::"text",
    "product_name" "text"
);


ALTER TABLE "public"."customers" OWNER TO "postgres";


COMMENT ON COLUMN "public"."customers"."product_name" IS 'Name of the product the customer is interested in or has purchased';



CREATE TABLE IF NOT EXISTS "public"."download_links" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "customer_id" "uuid" NOT NULL,
    "token" "text" NOT NULL,
    "product_name" "text" NOT NULL,
    "expires_at" timestamp with time zone NOT NULL,
    "created_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL,
    "is_used" boolean DEFAULT false NOT NULL
);


ALTER TABLE "public"."download_links" OWNER TO "postgres";


COMMENT ON TABLE "public"."download_links" IS 'Securely stores download tokens for purchased boilerplates';



COMMENT ON COLUMN "public"."download_links"."customer_id" IS 'Reference to the customer who purchased the boilerplate';



COMMENT ON COLUMN "public"."download_links"."token" IS 'Unique token used in download URL';



COMMENT ON COLUMN "public"."download_links"."product_name" IS 'Name of the product/boilerplate being downloaded';



COMMENT ON COLUMN "public"."download_links"."expires_at" IS 'When this download link expires';



COMMENT ON COLUMN "public"."download_links"."is_used" IS 'Whether this download link has been used';



CREATE TABLE IF NOT EXISTS "public"."waiting_customers" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "email" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL,
    "notified" boolean DEFAULT false NOT NULL
);


ALTER TABLE "public"."waiting_customers" OWNER TO "postgres";


COMMENT ON COLUMN "public"."waiting_customers"."email" IS 'User email address for the full-stack boilerplate waiting list.';



COMMENT ON COLUMN "public"."waiting_customers"."created_at" IS 'Timestamp when the email was added.';



COMMENT ON COLUMN "public"."waiting_customers"."updated_at" IS 'Timestamp when the record was last updated.';



COMMENT ON COLUMN "public"."waiting_customers"."notified" IS 'Whether the customer has been notified about product availability.';



CREATE TABLE IF NOT EXISTS "public"."waiting_list" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "email" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL,
    CONSTRAINT "waiting_list_email_check" CHECK (("email" ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$'::"text"))
);


ALTER TABLE "public"."waiting_list" OWNER TO "postgres";


COMMENT ON COLUMN "public"."waiting_list"."email" IS 'User email address for the waiting list.';



COMMENT ON COLUMN "public"."waiting_list"."created_at" IS 'Timestamp when the email was added.';



ALTER TABLE ONLY "public"."customers"
    ADD CONSTRAINT "customers_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."download_links"
    ADD CONSTRAINT "download_links_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."download_links"
    ADD CONSTRAINT "download_links_token_key" UNIQUE ("token");



ALTER TABLE ONLY "public"."waiting_customers"
    ADD CONSTRAINT "waiting_customers_email_key" UNIQUE ("email");



ALTER TABLE ONLY "public"."waiting_customers"
    ADD CONSTRAINT "waiting_customers_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."waiting_list"
    ADD CONSTRAINT "waiting_list_email_key" UNIQUE ("email");



ALTER TABLE ONLY "public"."waiting_list"
    ADD CONSTRAINT "waiting_list_pkey" PRIMARY KEY ("id");



CREATE INDEX "download_links_customer_id_idx" ON "public"."download_links" USING "btree" ("customer_id");



CREATE INDEX "download_links_token_idx" ON "public"."download_links" USING "btree" ("token");



CREATE OR REPLACE TRIGGER "on_customers_updated" BEFORE UPDATE ON "public"."customers" FOR EACH ROW EXECUTE FUNCTION "public"."handle_updated_at"();



CREATE OR REPLACE TRIGGER "on_waiting_customers_updated" BEFORE UPDATE ON "public"."waiting_customers" FOR EACH ROW EXECUTE FUNCTION "public"."handle_updated_at"();



ALTER TABLE ONLY "public"."download_links"
    ADD CONSTRAINT "download_links_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "public"."customers"("id");



CREATE POLICY "Allow anonymous insert access" ON "public"."waiting_customers" FOR INSERT TO "anon" WITH CHECK (true);



CREATE POLICY "Allow anonymous insert access" ON "public"."waiting_list" FOR INSERT TO "anon" WITH CHECK (true);



CREATE POLICY "Allow authenticated insert access" ON "public"."waiting_customers" FOR INSERT TO "authenticated" WITH CHECK (true);



CREATE POLICY "Allow service_role full access" ON "public"."waiting_customers" TO "service_role" USING (true) WITH CHECK (true);



CREATE POLICY "Allow service_role full access" ON "public"."waiting_list" TO "service_role" USING (true) WITH CHECK (true);



CREATE POLICY "Allow service_role full access to download_links" ON "public"."download_links" TO "service_role" USING (true) WITH CHECK (true);



CREATE POLICY "Anon users can insert customer data" ON "public"."customers" FOR INSERT TO "anon" WITH CHECK (true);



CREATE POLICY "Authenticated users can view their own customer data" ON "public"."customers" FOR SELECT TO "authenticated" USING (("auth"."uid"() = "id"));



CREATE POLICY "Users can insert their own customer data" ON "public"."customers" FOR INSERT TO "authenticated" WITH CHECK (("auth"."uid"() = "id"));



CREATE POLICY "Users can update their own customer data" ON "public"."customers" FOR UPDATE TO "authenticated" USING (("auth"."uid"() = "id")) WITH CHECK (("auth"."uid"() = "id"));



ALTER TABLE "public"."customers" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."download_links" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."waiting_customers" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."waiting_list" ENABLE ROW LEVEL SECURITY;




ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";





GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

















































































































































































GRANT ALL ON FUNCTION "public"."check_function_exists"("function_name" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."check_function_exists"("function_name" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."check_function_exists"("function_name" "text") TO "service_role";



GRANT ALL ON FUNCTION "public"."check_trigger_exists"("trigger_name" "text", "table_name" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."check_trigger_exists"("trigger_name" "text", "table_name" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."check_trigger_exists"("trigger_name" "text", "table_name" "text") TO "service_role";



GRANT ALL ON FUNCTION "public"."handle_updated_at"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_updated_at"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_updated_at"() TO "service_role";


















GRANT ALL ON TABLE "public"."customers" TO "anon";
GRANT ALL ON TABLE "public"."customers" TO "authenticated";
GRANT ALL ON TABLE "public"."customers" TO "service_role";



GRANT ALL ON TABLE "public"."download_links" TO "anon";
GRANT ALL ON TABLE "public"."download_links" TO "authenticated";
GRANT ALL ON TABLE "public"."download_links" TO "service_role";



GRANT ALL ON TABLE "public"."waiting_customers" TO "anon";
GRANT ALL ON TABLE "public"."waiting_customers" TO "authenticated";
GRANT ALL ON TABLE "public"."waiting_customers" TO "service_role";



GRANT ALL ON TABLE "public"."waiting_list" TO "anon";
GRANT ALL ON TABLE "public"."waiting_list" TO "authenticated";
GRANT ALL ON TABLE "public"."waiting_list" TO "service_role";









ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";






























RESET ALL;
