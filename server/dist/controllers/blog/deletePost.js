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
exports.default = deletePost;
const client_1 = __importDefault(require("@/prisma/client"));
function deletePost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const { id } = req.body;
        try {
            const post = yield client_1.default.blog.delete({
                where: {
                    blog_id: id,
                    blog_user_id: (_a = req.user) === null || _a === void 0 ? void 0 : _a.user_id,
                },
            });
            res.status(200).json(post);
        }
        catch (err) {
            res.status(500).json({ message: 'Internal server error' });
        }
    });
}
