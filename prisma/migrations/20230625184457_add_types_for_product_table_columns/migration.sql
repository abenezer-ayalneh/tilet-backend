/*
  Warnings:

  - The `size` column on the `products` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `gender` on the `products` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ProductGender" AS ENUM ('MALE', 'FEMALE', 'BOTH');

-- CreateEnum
CREATE TYPE "ProductSize" AS ENUM ('SMALL', 'MEDIUM', 'LARGE', 'XL', 'XXL', 'XXXL', 'XXXXL', 'XXXXXL', 'FREE');

-- AlterTable
ALTER TABLE "products" DROP COLUMN "size",
ADD COLUMN     "size" "ProductSize"[],
DROP COLUMN "gender",
ADD COLUMN     "gender" "ProductGender" NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;
