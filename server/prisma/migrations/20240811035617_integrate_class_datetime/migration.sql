/*
  Warnings:

  - You are about to drop the column `class_date` on the `class` table. All the data in the column will be lost.
  - You are about to drop the column `class_time` on the `class` table. All the data in the column will be lost.
  - Added the required column `class_datetime` to the `class` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `class` DROP COLUMN `class_date`,
    DROP COLUMN `class_time`,
    ADD COLUMN `class_datetime` DATETIME NOT NULL;
