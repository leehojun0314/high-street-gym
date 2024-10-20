"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingRouter = void 0;
const deleteBooking_1 = __importDefault(require("@/controllers/booking/deleteBooking"));
const myBooking_1 = __importDefault(require("@/controllers/booking/myBooking"));
const newBooking_1 = require("@/controllers/booking/newBooking");
const express_1 = require("express");
exports.bookingRouter = (0, express_1.Router)();
exports.bookingRouter.post('/new', newBooking_1.newBooking);
exports.bookingRouter.get('/my', myBooking_1.default);
exports.bookingRouter.delete('/:id', deleteBooking_1.default);
