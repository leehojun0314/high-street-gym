"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.xmlRouter = void 0;
const xmlController_1 = __importDefault(require("@/controllers/xml/xmlController"));
const express_1 = require("express");
exports.xmlRouter = (0, express_1.Router)();
exports.xmlRouter.post('/upload', xmlController_1.default);
