/*
  Warnings:

  - Made the column `class_date` on table `class` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `class` MODIFY `class_date` DATETIME NOT NULL;
