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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchData = patchData;
const client_1 = __importDefault(require("@/prisma/client"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const functions_1 = require("@/utils/functions");
function patchData(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = req.user;
            const { table } = req.params;
            if ((user === null || user === void 0 ? void 0 : user.user_role) === 'TRAINER') {
                if (table !== 'class' && table !== 'activity') {
                    res.status(401).send("You don't have permission to modify this table.");
                    return;
                }
            }
            console.log('patch body: ', req.body);
            switch (table) {
                case 'class': {
                    const _a = req.body, { class_id } = _a, data = __rest(_a, ["class_id"]);
                    console.log('data: ', data);
                    yield client_1.default.class.update({
                        where: {
                            class_id,
                        },
                        data: data,
                    });
                    break;
                }
                case 'booking': {
                    const _b = req.body, { booking_id } = _b, data = __rest(_b, ["booking_id"]);
                    yield client_1.default.booking.update({
                        where: {
                            booking_id,
                        },
                        data: data,
                    });
                    break;
                }
                case 'location': {
                    const _c = req.body, { location_id } = _c, data = __rest(_c, ["location_id"]);
                    yield client_1.default.location.update({
                        where: { location_id },
                        data: data,
                    });
                    break;
                }
                case 'activity': {
                    const _d = req.body, { activity_id } = _d, data = __rest(_d, ["activity_id"]);
                    yield client_1.default.activity.update({
                        where: { activity_id },
                        data,
                    });
                    break;
                }
                case 'user': {
                    const _e = req.body, { user_id } = _e, data = __rest(_e, ["user_id"]);
                    let password;
                    if (data.user_password.startsWith('$2b$')) {
                        password = data.user_password;
                    }
                    else {
                        password = yield bcryptjs_1.default.hash(data.user_password, 10);
                    }
                    yield client_1.default.user.update({
                        where: { user_id },
                        data: Object.assign(Object.assign({}, data), { user_password: password }),
                    });
                    break;
                }
                case 'blog': {
                    const _f = req.body, { blog_id } = _f, data = __rest(_f, ["blog_id"]);
                    yield client_1.default.blog.update({
                        where: { blog_id },
                        data,
                    });
                    break;
                }
                default: {
                    res.status(400).send('Invalid table name given');
                    return;
                }
            }
            res.status(200).send('Data updated successfully.');
        }
        catch (error) {
            console.log('data update error: ', error);
            res.status(500).send((0, functions_1.getErrorMessage)(error));
        }
    });
}
