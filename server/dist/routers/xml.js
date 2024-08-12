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
exports.xmlController = void 0;
const client_1 = __importDefault(require("@/prisma/client"));
const express_1 = require("express");
const xml2js_1 = __importDefault(require("xml2js"));
exports.xmlController = (0, express_1.Router)();
exports.xmlController.post('/classes', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const xmlData = (_a = req.file) === null || _a === void 0 ? void 0 : _a.buffer.toString();
    if (!xmlData) {
        return res.status(400).send('No XML file uploaded');
    }
    xml2js_1.default.parseString(xmlData, (err, result) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            return res.status(400).send('Invalid XML');
        }
        console.log('result: ', result);
        const classes = result.classes.class;
        if (!Array.isArray(classes)) {
            return res.status(400).send('Invalid XML format');
        }
        try {
            for (const classData of classes) {
                const classTime = new Date(`2024-01-01T${classData.class_time[0]}Z`).toISOString();
                yield client_1.default.class.create({
                    data: {
                        class_time: classTime,
                        class_location_id: parseInt(classData.class_location_id[0]),
                        class_activity_id: parseInt(classData.class_activity_id[0]),
                        class_trainer_user_id: parseInt(classData.class_trainer_user_id[0]),
                        class_name: classData.class_name[0],
                    },
                });
            }
            res.status(201).send('Classes created successfully');
        }
        catch (error) {
            console.error('Error creating classes:', error);
            res.status(500).send('Internal Server Error');
        }
    }));
}));
