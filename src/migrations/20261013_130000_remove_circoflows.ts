import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

// Removes the CircoFlows payment option from the database, to match the code that no longer has it:
//   - the unused orders.circoflows_transaction_id column
//   - the 'circoflows' value of the orders payment-method enum
//
// It refuses to run (the whole migration rolls back) if any order still uses the method or holds a
// CircoFlows id, so no order data can be lost by it. Postgres cannot drop one value from an enum, so
// the enum is rebuilt without it: the column is cast over to the new type in the same transaction.
// Every step is guarded, so running it twice, or after the dev server's schema push has already
// made the change, does nothing.
//
// This database's payload_migrations table only records the dev push, so `payload migrate` must not
// be used against it: it would replay every earlier migration, including the cents-to-dollars one,
// over live data. Apply this file on its own.
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DO $$
   DECLARE used integer;
   BEGIN
    IF EXISTS (SELECT 1 FROM pg_enum e JOIN pg_type t ON t.oid = e.enumtypid
               WHERE t.typname = 'enum_orders_payment_method' AND e.enumlabel = 'circoflows') THEN
     SELECT count(*) INTO used FROM "orders" WHERE "payment_method"::text = 'circoflows';
     IF used > 0 THEN
      RAISE EXCEPTION 'Refusing to remove circoflows: % order(s) still use it', used;
     END IF;
    END IF;

    IF EXISTS (SELECT 1 FROM information_schema.columns
               WHERE table_schema = 'public' AND table_name = 'orders' AND column_name = 'circoflows_transaction_id') THEN
     EXECUTE 'SELECT count(*) FROM "orders" WHERE "circoflows_transaction_id" IS NOT NULL' INTO used;
     IF used > 0 THEN
      RAISE EXCEPTION 'Refusing to drop orders.circoflows_transaction_id: % order(s) hold a value', used;
     END IF;
     ALTER TABLE "orders" DROP COLUMN "circoflows_transaction_id";
    END IF;
   END $$;

   DO $$
   DECLARE others integer;
   BEGIN
    IF EXISTS (SELECT 1 FROM pg_enum e JOIN pg_type t ON t.oid = e.enumtypid
               WHERE t.typname = 'enum_orders_payment_method' AND e.enumlabel = 'circoflows') THEN
     SELECT count(*) INTO others FROM information_schema.columns
      WHERE udt_name = 'enum_orders_payment_method' AND NOT (table_name = 'orders' AND column_name = 'payment_method');
     IF others > 0 THEN
      RAISE EXCEPTION 'enum_orders_payment_method is used by % other column(s); refusing to rebuild it', others;
     END IF;

     ALTER TYPE "public"."enum_orders_payment_method" RENAME TO "enum_orders_payment_method_old";
     CREATE TYPE "public"."enum_orders_payment_method" AS ENUM('stripe', 'zelle', 'amex', 'stripe_link', 'veracuepay');
     ALTER TABLE "orders" ALTER COLUMN "payment_method" DROP DEFAULT;
     ALTER TABLE "orders" ALTER COLUMN "payment_method" SET DATA TYPE "public"."enum_orders_payment_method"
      USING "payment_method"::text::"public"."enum_orders_payment_method";
     ALTER TABLE "orders" ALTER COLUMN "payment_method" SET DEFAULT 'stripe';
     DROP TYPE "public"."enum_orders_payment_method_old";
    END IF;
   END $$;`)
}

// Puts the empty column and the enum value back. No order data is involved, because the migration
// above only runs when no order uses either.
export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "orders" ADD COLUMN IF NOT EXISTS "circoflows_transaction_id" varchar;
   ALTER TYPE "public"."enum_orders_payment_method" ADD VALUE IF NOT EXISTS 'circoflows' BEFORE 'stripe_link';`)
}
