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
exports.locationRouter = void 0;
const client_1 = __importDefault(require("@/prisma/client"));
const functions_1 = require("@/utils/functions");
const express_1 = require("express");
exports.locationRouter = (0, express_1.Router)();
exports.locationRouter.get('/all', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const locations = yield client_1.default.location.findMany();
        res.status(200).send(locations);
    }
    catch (error) {
        res.status(500).send((0, functions_1.getErrorMessage)(error));
    }
}));
