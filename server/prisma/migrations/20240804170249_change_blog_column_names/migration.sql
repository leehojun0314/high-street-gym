/*
  Warnings:

  - The primary key for the `blog` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `post_content` on the `blog` table. All the data in the column will be lost.
  - You are about to drop the column `post_datetime` on the `blog` table. All the data in the column will be lost.
  - You are about to drop the column `post_id` on the `blog` table. All the data in the column will be lost.
  - You are about to drop the column `post_title` on the `blog` table. All the data in the column will be lost.
  - You are about to drop the column `post_user_id` on the `blog` table. All the data in the column will be lost.
  - You are about to alter the column `class_date` on the `class` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Added the required column `blog_content` to the `blog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `blog_datetime` to the `blog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `blog_id` to the `blog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `blog_title` to the `blog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `blog_user_id` to the `blog` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `blog` DROP FOREIGN KEY `blog_post_user_id_fkey`;

-- AlterTable
ALTER TABLE `blog` DROP PRIMARY KEY,
    DROP COLUMN `post_content`,
    DROP COLUMN `post_datetime`,
    DROP COLUMN `post_id`,
    DROP COLUMN `post_title`,
    DROP COLUMN `post_user_id`,
    ADD COLUMN `blog_content` VARCHAR(191) NOT NULL,
    ADD COLUMN `blog_datetime` DATETIME(3) NOT NULL,
    ADD COLUMN `blog_id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `blog_title` VARCHAR(191) NOT NULL,
    ADD COLUMN `blog_user_id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`blog_id`);

-- AlterTable
ALTER TABLE `class` MODIFY `class_date` DATETIME NULL;

-- CreateIndex
CREATE INDEX `blog_blog_user_id_idx` ON `blog`(`blog_user_id`);

-- AddForeignKey
ALTER TABLE `blog` ADD CONSTRAINT `blog_blog_user_id_fkey` FOREIGN KEY (`blog_user_id`) REFERENCES `user`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
