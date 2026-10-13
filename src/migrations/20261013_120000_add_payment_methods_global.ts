import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

// Adds the "Payment Methods" global: the admin setting that turns checkout payment options on and
// off. Purely additive: two new tables and one new enum, no existing table is touched.
//
// Every statement is idempotent, because a database that has been through the dev server's schema
// push may already have the tables. The three rows are seeded only when the setting has no rows yet,
// and they are exactly what checkout offered before the setting existed (Card via VeracuePay,
// Zelle, Stripe payment link, all on), so applying this changes nothing a customer sees.
//
// This database's payload_migrations table only records the dev push, so `payload migrate` must not
// be used against it: it would replay every earlier migration, including the cents-to-dollars one,
// over live data. Apply this file on its own.
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DO $$ BEGIN
    CREATE TYPE "public"."enum_payment_methods_methods_key" AS ENUM('veracuepay', 'zelle', 'stripe_link');
   EXCEPTION
    WHEN duplicate_object THEN null;
   END $$;

   CREATE TABLE IF NOT EXISTS "payment_methods_methods" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "key" "enum_payment_methods_methods_key" NOT NULL,
    "enabled" boolean DEFAULT true,
    "label" varchar NOT NULL,
    "description" varchar NOT NULL
   );

   CREATE TABLE IF NOT EXISTS "payment_methods" (
    "id" serial PRIMARY KEY NOT NULL,
    "updated_at" timestamp(3) with time zone,
    "created_at" timestamp(3) with time zone
   );

   -- Supabase switches row level security on for tables created outside Payload's own push. Payload
   -- expects it off, as on every other table in this database, and the app connects as the table
   -- owner either way, so match it.
   ALTER TABLE "payment_methods_methods" DISABLE ROW LEVEL SECURITY;
   ALTER TABLE "payment_methods" DISABLE ROW LEVEL SECURITY;

   DO $$ BEGIN
    ALTER TABLE "payment_methods_methods" ADD CONSTRAINT "payment_methods_methods_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."payment_methods"("id") ON DELETE cascade ON UPDATE no action;
   EXCEPTION
    WHEN duplicate_object THEN null;
   END $$;

   CREATE INDEX IF NOT EXISTS "payment_methods_methods_order_idx" ON "payment_methods_methods" USING btree ("_order");
   CREATE INDEX IF NOT EXISTS "payment_methods_methods_parent_id_idx" ON "payment_methods_methods" USING btree ("_parent_id");`)

  // Seed the starting rows, once.
  await db.execute(sql`
   DO $$
   DECLARE parent_id integer;
   BEGIN
    IF NOT EXISTS (SELECT 1 FROM "payment_methods") THEN
     INSERT INTO "payment_methods" ("updated_at", "created_at") VALUES (now(), now()) RETURNING "id" INTO parent_id;
     INSERT INTO "payment_methods_methods" ("_order", "_parent_id", "id", "key", "enabled", "label", "description") VALUES
      (1, parent_id, substr(md5(random()::text || clock_timestamp()::text || '1'), 1, 24), 'veracuepay', true, 'Credit / Debit Card', 'You''ll be securely redirected to our payment partner, VeracuePay, to enter your card details.'),
      (2, parent_id, substr(md5(random()::text || clock_timestamp()::text || '2'), 1, 24), 'zelle', true, 'Zelle', 'You''ll receive Zelle payment instructions on the next page after placing your order.'),
      (3, parent_id, substr(md5(random()::text || clock_timestamp()::text || '3'), 1, 24), 'stripe_link', true, 'Stripe (Custom Payment Link)', 'Secure payment via an emailed Stripe link.');
    END IF;
   END $$;`)
}

// Removes only what this migration created. Nothing else in the database is affected.
export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE IF EXISTS "payment_methods_methods" CASCADE;
   DROP TABLE IF EXISTS "payment_methods" CASCADE;
   DROP TYPE IF EXISTS "public"."enum_payment_methods_methods_key";`)
}
