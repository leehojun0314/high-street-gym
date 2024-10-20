/*
  Warnings:

  - You are about to alter the column `class_datetime` on the `class` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `class` ADD COLUMN `is_recurring` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `class_datetime` DATETIME NOT NULL;
