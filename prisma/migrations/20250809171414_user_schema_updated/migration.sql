-- AlterTable
ALTER TABLE "public"."users" ALTER COLUMN "needPasswordChange" SET DEFAULT true,
ALTER COLUMN "status" SET DEFAULT 'ACTIVE';
