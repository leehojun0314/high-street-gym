/*
  Warnings:

  - You are about to alter the column `class_date` on the `class` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `class` MODIFY `class_time` TIME NOT NULL,
    MODIFY `class_date` DATETIME NULL;
