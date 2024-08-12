-- CreateTable
CREATE TABLE `location` (
    `location_id` INTEGER NOT NULL AUTO_INCREMENT,
    `location_name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`location_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `activity` (
    `activity_id` INTEGER NOT NULL AUTO_INCREMENT,
    `activity_name` VARCHAR(191) NOT NULL,
    `activity_description` VARCHAR(191) NOT NULL,
    `activity_duration` INTEGER NOT NULL,
    `activity_type` ENUM('GROUP', 'PRIVATE') NOT NULL DEFAULT 'GROUP',

    PRIMARY KEY (`activity_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `blog` (
    `post_id` INTEGER NOT NULL AUTO_INCREMENT,
    `post_datetime` DATETIME(3) NOT NULL,
    `post_user_id` INTEGER NOT NULL,
    `post_title` VARCHAR(191) NOT NULL,
    `post_content` VARCHAR(191) NOT NULL,

    INDEX `blog_post_user_id_idx`(`post_user_id`),
    PRIMARY KEY (`post_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `class` (
    `class_id` INTEGER NOT NULL AUTO_INCREMENT,
    `class_time` DATETIME(3) NOT NULL,
    `class_location_id` INTEGER NOT NULL,
    `class_activity_id` INTEGER NOT NULL,
    `class_trainer_user_id` INTEGER NOT NULL,
    `class_weekly` ENUM('MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN') NULL,
    `class_date` DATETIME(3) NULL,
    `is_recurring` BOOLEAN NOT NULL DEFAULT false,
    `class_name` VARCHAR(191) NOT NULL,

    INDEX `class_class_location_id_idx`(`class_location_id`),
    INDEX `class_class_activity_id_idx`(`class_activity_id`),
    INDEX `class_class_trainer_user_id_idx`(`class_trainer_user_id`),
    PRIMARY KEY (`class_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `booking` (
    `booking_id` INTEGER NOT NULL AUTO_INCREMENT,
    `booking_user_id` INTEGER NOT NULL,
    `booking_class_id` INTEGER NOT NULL,
    `booking_created_datetime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `booking_booking_user_id_idx`(`booking_user_id`),
    INDEX `booking_booking_class_id_idx`(`booking_class_id`),
    PRIMARY KEY (`booking_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_email` VARCHAR(191) NOT NULL,
    `user_password` VARCHAR(191) NOT NULL,
    `user_role` ENUM('ADMIN', 'MEMBER', 'TRAINER') NOT NULL,
    `user_phone` VARCHAR(191) NOT NULL,
    `user_firstname` VARCHAR(191) NOT NULL,
    `user_lastname` VARCHAR(191) NOT NULL,
    `gender` ENUM('MALE', 'FEMALE', 'NOT_SPECIFIED') NOT NULL,
    `dob` DATETIME(3) NOT NULL,

    UNIQUE INDEX `user_user_email_key`(`user_email`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `blog` ADD CONSTRAINT `blog_post_user_id_fkey` FOREIGN KEY (`post_user_id`) REFERENCES `user`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `class` ADD CONSTRAINT `class_class_location_id_fkey` FOREIGN KEY (`class_location_id`) REFERENCES `location`(`location_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `class` ADD CONSTRAINT `class_class_activity_id_fkey` FOREIGN KEY (`class_activity_id`) REFERENCES `activity`(`activity_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `class` ADD CONSTRAINT `class_class_trainer_user_id_fkey` FOREIGN KEY (`class_trainer_user_id`) REFERENCES `user`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `booking` ADD CONSTRAINT `booking_booking_user_id_fkey` FOREIGN KEY (`booking_user_id`) REFERENCES `user`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `booking` ADD CONSTRAINT `booking_booking_class_id_fkey` FOREIGN KEY (`booking_class_id`) REFERENCES `class`(`class_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
