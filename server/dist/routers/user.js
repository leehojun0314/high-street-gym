"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const getUser_1 = require("@/controllers/user/getUser");
const loginUser_1 = require("@/controllers/user/loginUser");
const registerUser_1 = require("@/controllers/user/registerUser");
exports.userRouter = express_1.default.Router();
exports.userRouter.get('/', getUser_1.getUser);
exports.userRouter.post('/login', loginUser_1.loginUser);
exports.userRouter.post('/register', registerUser_1.registerUser);
