/*
  Warnings:

  - The values [SMALL,MEDIUM,LARGE] on the enum `ProductSize` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `status` on the `products` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ProductSize_new" AS ENUM ('S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'XXXXL', 'XXXXXL', 'FREE');
ALTER TABLE "products" ALTER COLUMN "size" TYPE "ProductSize_new"[] USING ("size"::text::"ProductSize_new"[]);
ALTER TYPE "ProductSize" RENAME TO "ProductSize_old";
ALTER TYPE "ProductSize_new" RENAME TO "ProductSize";
DROP TYPE "ProductSize_old";
COMMIT;

-- AlterTable
ALTER TABLE "products" DROP COLUMN "status",
ALTER COLUMN "size" SET DEFAULT ARRAY['FREE']::"ProductSize"[],
ALTER COLUMN "gender" SET DEFAULT 'BOTH';

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "picture" DROP NOT NULL,
ALTER COLUMN "picture" DROP DEFAULT;
