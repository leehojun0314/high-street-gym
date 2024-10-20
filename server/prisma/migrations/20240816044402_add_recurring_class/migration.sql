/*
  Warnings:

  - You are about to drop the column `class_datetime` on the `class` table. All the data in the column will be lost.
  - Added the required column `class_date` to the `class` table without a default value. This is not possible if the table is not empty.
  - Added the required column `class_time` to the `class` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `class` DROP COLUMN `class_datetime`,
    ADD COLUMN `class_date` DATE NOT NULL,
    ADD COLUMN `class_time` TIME NOT NULL;
