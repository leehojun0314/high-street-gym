"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newBooking = newBooking;
const client_1 = __importDefault(require("@/prisma/client"));
function newBooking(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { class_id } = req.body;
        const user = req.user;
        if (!class_id) {
            return res.status(400).send('classId is required');
        }
        try {
            const booking = yield client_1.default.booking.create({
                data: {
                    booking_class_id: Number(class_id),
                    booking_user_id: user.user_id,
                },
            });
            console.log('booking created: ', booking);
            res.status(201).send('Booking created successfully');
        }
        catch (error) {
            console.error('Error creating booking:', error);
            res.status(500).send('Internal Server Error');
        }
    });
}
