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
exports.loginUser = loginUser;
exports.registerUser = registerUser;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const JWT_SECRET = process.env.JWT_SECRET || '';
const client_1 = __importDefault(require("@/prisma/client"));
const library_1 = require("@prisma/client/runtime/library");
const functions_1 = require("@/utils/functions");
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
function registerUser(req, res) {
    const { firstname, lastname, email, password, mobile, gender, dob } = req.body;
    console.log('dob: ', dob);
    const validationRes = (0, functions_1.validateRegister)(req.body);
    if (!validationRes.status) {
        console.log('validation error: ', validationRes.error);
        res.status(404).send({ error: validationRes.error });
        return;
    }
    bcryptjs_1.default.hash(password, 10, (err, hash) => __awaiter(this, void 0, void 0, function* () {
        if (err) {
            console.log('error hashing password: ', err);
            res.status(500).send('Error hashing password');
            return;
        }
        try {
            const user = yield client_1.default.user.create({
                data: {
                    user_firstname: firstname,
                    user_lastname: lastname,
                    user_email: email,
                    user_password: hash,
                    user_phone: mobile,
                    gender: gender,
                    dob: dob ? new Date(dob) : null,
                    user_role: 'MEMBER',
                },
            });
            console.log('created user: ', user);
            res.status(201).send({
                message: 'User created successfully',
            });
        }
        catch (error) {
            console.log('create user error: ', error);
            if (error instanceof library_1.PrismaClientKnownRequestError) {
                console.log('message: ', error.message);
                console.log('code: ', error.code);
                console.log('meta: ', error.meta);
                console.log('stack: ', error.stack);
                if (error.code === 'P2002') {
                    res.status(409).send('Email already exists');
                    return;
                }
            }
            res.status(500).send('Error creating user');
        }
    }));
}
