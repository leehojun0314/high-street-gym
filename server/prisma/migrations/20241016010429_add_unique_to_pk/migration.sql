/*
  Warnings:

  - A unique constraint covering the columns `[activity_id]` on the table `activity` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[blog_id]` on the table `blog` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[booking_id]` on the table `booking` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[class_id]` on the table `class` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[location_id]` on the table `location` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `activity_activity_id_key` ON `activity`(`activity_id`);

-- CreateIndex
CREATE UNIQUE INDEX `blog_blog_id_key` ON `blog`(`blog_id`);

-- CreateIndex
CREATE UNIQUE INDEX `booking_booking_id_key` ON `booking`(`booking_id`);

-- CreateIndex
CREATE UNIQUE INDEX `class_class_id_key` ON `class`(`class_id`);

-- CreateIndex
CREATE UNIQUE INDEX `location_location_id_key` ON `location`(`location_id`);

-- CreateIndex
CREATE UNIQUE INDEX `user_user_id_key` ON `user`(`user_id`);
