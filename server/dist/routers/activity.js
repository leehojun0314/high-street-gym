"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activityRouter = void 0;
const getActivities_1 = __importDefault(require("@/controllers/activity/getActivities"));
const express_1 = require("express");
exports.activityRouter = (0, express_1.Router)();
exports.activityRouter.get('/', getActivities_1.default);
