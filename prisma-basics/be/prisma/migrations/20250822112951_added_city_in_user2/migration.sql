/*
  Warnings:

  - Added the required column `city` to the `User2` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."User2" ADD COLUMN     "city" TEXT NOT NULL;
