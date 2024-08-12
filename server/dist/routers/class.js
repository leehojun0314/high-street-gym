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
exports.classController = void 0;
const auth_1 = require("@/middleware/auth");
const client_1 = __importDefault(require("@/prisma/client"));
const functions_1 = require("@/utils/functions");
const express_1 = require("express");
exports.classController = (0, express_1.Router)();
exports.classController.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { location, week } = req.query;
    if (!location || !week) {
        res.status(400).send('location and week are required');
        return;
    }
    try {
        const classes = yield client_1.default.class.findMany({
            where: {
                class_location_id: Number(location),
            },
        });
        res.status(200).send(classes);
    }
    catch (error) {
        console.log('get class error: ', error);
        res.status(500).send((0, functions_1.getErrorMessage)(error));
    }
}));
exports.classController.post('/new', (0, auth_1.auth)(['ADMIN, TRAINER']), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('create class params: ', req.body);
    const newClass = yield client_1.default.class.create({
        data: req.body,
    });
    res.status(201).send(newClass);
    // const newClass = await prisma.class.create({
    // 	data: {
    // 		description,
    // 		price,
    // 		startDate,
    // 		endDate,
    // 		user: {
    // 			connect: {
    // 				user_id: req.user.user_id,
    // 			},
    // 		},
    // 	},
    // });
    // res.status(200).json(newClass);
}));
