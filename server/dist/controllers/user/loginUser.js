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
exports.loginUser = loginUser;
const client_1 = __importDefault(require("@/prisma/client"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const JWT_SECRET = process.env.JWT_SECRET || '';
function loginUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        console.log('email: ', email);
        console.log('password: ', password);
        let isMatch = false;
        let user;
        try {
            user = yield client_1.default.user.findFirstOrThrow({
                where: {
                    user_email: email,
                },
            });
            isMatch = bcryptjs_1.default.compareSync(password, user.user_password);
        }
        catch (error) {
            console.log('fetch user error: ', error);
            res.status(401).send('Invalid credentials');
            return;
        }
        if (isMatch) {
            // JWT 토큰 생성
            const token = jsonwebtoken_1.default.sign({
                user_id: user.user_id,
                user_email: user.user_email,
                user_role: user.user_role,
            }, JWT_SECRET, { expiresIn: '1h' });
            res.status(200).send({ token, user });
        }
        else {
            res.status(401).send('Invalid credentials');
        }
    });
}
