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
exports.insertData = insertData;
const client_1 = __importDefault(require("@/prisma/client"));
function insertData(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = req.user;
            const { table } = req.params;
            const data = req.body;
            if ((user === null || user === void 0 ? void 0 : user.user_role) === 'TRAINER') {
                if (table !== 'class' && table !== 'activity') {
                    res.status(401).send("You don't have permission to modify this table.");
                    return;
                }
            }
            if (table in client_1.default) {
                yield client_1.default[table].create({
                    data: data,
                });
                res.status(200).send('Data created successfully');
            }
            else {
                res.status(400).send('Invalid table name');
            }
        }
        catch (error) {
            console.error('Error in upsertData:', error);
            res.status(500).send('An error occurred while processing your request');
        }
    });
}
