/*
  Warnings:

  - You are about to drop the column `createAt` on the `Issue` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Issue` DROP COLUMN `createAt`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
