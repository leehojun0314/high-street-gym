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
exports.getTables = getTables;
const client_1 = __importDefault(require("@/prisma/client"));
const functions_1 = require("@/utils/functions");
function getTables(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = req.user;
            let { currentTable } = req.query;
            if (!currentTable) {
                currentTable = 'class';
            }
            if ((user === null || user === void 0 ? void 0 : user.user_role) === 'ADMIN') {
                const tables = ['activity', 'class', 'location', 'blog', 'user'];
                const fields = client_1.default[currentTable].fields;
                console.log('fields: ', fields);
                res.status(200).send({ tables, fields });
            }
            else if ((user === null || user === void 0 ? void 0 : user.user_role) === 'TRAINER') {
                const tables = ['class', 'activity'];
                res.status(200).send({ tables });
            }
            else {
                res.status(401).send('Unauthorized');
            }
        }
        catch (error) {
            console.log('get tables error: ', error);
            res.status(500).send((0, functions_1.getErrorMessage)(error));
        }
    });
}
