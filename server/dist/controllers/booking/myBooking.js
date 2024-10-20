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
exports.default = myBooking;
const client_1 = __importDefault(require("@/prisma/client"));
function myBooking(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { user } = req;
        if (!user) {
            return res.status(401).json({
                error: 'You must be logged in to view your bookings',
            });
        }
        const { location } = req.query;
        console.log('location in my booking: ', location);
        const bookings = yield client_1.default.booking.findMany({
            where: {
                booking_user_id: user.user_id,
                Class: {
                    Location: {
                        location_id: location && !isNaN(parseInt(location))
                            ? parseInt(location)
                            : undefined,
                    },
                },
            },
            include: {
                Class: {
                    include: {
                        User: true,
                        Location: true,
                    },
                },
            },
        });
        console.log('bookings: ', bookings);
        return res.status(200).send(bookings);
    });
}
