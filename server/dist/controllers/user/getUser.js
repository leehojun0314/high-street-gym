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
exports.getUser = getUser;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const JWT_SECRET = process.env.JWT_SECRET || '';
const client_1 = __importDefault(require("@/prisma/client"));
function getUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token) {
            res.status(401).send('No token provided');
            return;
        }
        jsonwebtoken_1.default.verify(token, JWT_SECRET, (err, decoded) => __awaiter(this, void 0, void 0, function* () {
            if (err) {
                res.status(401).send('Invalid token');
                return;
            }
            const decodedToken = decoded;
            console.log('decoded token: ', decodedToken);
            const user = yield client_1.default.user
                .findFirstOrThrow({
                where: {
                    user_id: decodedToken.user_id,
                },
            })
                .catch((err) => {
                console.log('erro: ', err);
                res.status(401).send('Invalid token');
            });
            if (!user) {
                res.status(401).send('Invalid token');
                return;
            }
            res.status(200).json(user);
        }));
    });
}
