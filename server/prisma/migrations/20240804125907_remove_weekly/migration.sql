/*
  Warnings:

  - You are about to drop the column `class_weekly` on the `class` table. All the data in the column will be lost.
  - You are about to drop the column `is_recurring` on the `class` table. All the data in the column will be lost.
  - You are about to alter the column `class_date` on the `class` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `class` DROP COLUMN `class_weekly`,
    DROP COLUMN `is_recurring`,
    MODIFY `class_date` DATETIME NULL;
