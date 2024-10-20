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
exports.registerUser = registerUser;
const functions_1 = require("@/utils/functions");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const client_1 = __importDefault(require("@/prisma/client"));
const library_1 = require("@prisma/client/runtime/library");
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
