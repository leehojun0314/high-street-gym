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
exports.default = getMyPosts;
const client_1 = __importDefault(require("@/prisma/client"));
function getMyPosts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = req.user;
            console.log('user: ', user);
            const posts = yield client_1.default.blog.findMany({
                where: {
                    blog_user_id: Number(user === null || user === void 0 ? void 0 : user.user_id),
                },
            });
            res.status(200).json(posts);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
}
