import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

// Adds the VeracuePay card option to orders: a new payment-method enum value and the column that
// holds the PaymentIntent id. Both statements are idempotent, because a database that has been
// through the dev server's schema push may already have them.
//
// This must be applied BEFORE the code that reads the column is deployed — Payload selects every
// column of `orders`, so a missing one fails every order query, not just VeracuePay ones.
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_orders_payment_method" ADD VALUE IF NOT EXISTS 'veracuepay';
   ALTER TABLE "orders" ADD COLUMN IF NOT EXISTS "veracuepay_payment_intent_id" varchar;`)
}

// Postgres cannot drop a single value from an enum, so the 'veracuepay' value stays; only the
// column is removed. Orders already placed with that method keep reading as a valid enum value.
export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "orders" DROP COLUMN IF EXISTS "veracuepay_payment_intent_id";`)
}
