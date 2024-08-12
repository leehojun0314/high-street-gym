"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("./user");
const class_1 = require("./class");
const location_1 = require("./location");
const auth_1 = require("@/middleware/auth");
const management_1 = require("./management");
const xml_1 = require("./xml");
const multer_1 = __importDefault(require("multer"));
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)();
router.use('/user', user_1.userRouter);
router.use('/class', class_1.classController);
router.use('/location', location_1.locationController);
router.use('/management', (0, auth_1.auth)(['ADMIN', 'TRAINER']), management_1.managementRouter);
router.use('/xml', (0, auth_1.auth)(['ADMIN', 'TRAINER']), upload.single('file'), xml_1.xmlController);
exports.default = router;
