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
exports.default = deleteBooking;
const client_1 = __importDefault(require("@/prisma/client"));
const functions_1 = require("@/utils/functions");
function deleteBooking(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        console.log('delete booking id:', id);
        try {
            yield client_1.default.booking.delete({
                where: {
                    booking_id: !isNaN(parseInt(id)) ? parseInt(id) : undefined,
                },
            });
            res.send('delete booking id: ' + id);
        }
        catch (error) {
            console.log('err:', error);
            res.status(500).send((0, functions_1.getErrorMessage)(error));
        }
    });
}
