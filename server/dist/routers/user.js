"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("@/controllers/user");
exports.userRouter = express_1.default.Router();
exports.userRouter.get('/', user_1.getUser);
exports.userRouter.post('/login', user_1.loginUser);
exports.userRouter.post('/register', user_1.registerUser);
