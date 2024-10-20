"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogRouter = void 0;
const createPost_1 = __importDefault(require("@/controllers/blog/createPost"));
const deletePost_1 = __importDefault(require("@/controllers/blog/deletePost"));
const getMyPosts_1 = __importDefault(require("@/controllers/blog/getMyPosts"));
const getPost_1 = __importDefault(require("@/controllers/blog/getPost"));
const getPosts_1 = __importDefault(require("@/controllers/blog/getPosts"));
const auth_1 = require("@/middleware/auth");
const express_1 = require("express");
exports.blogRouter = (0, express_1.Router)();
exports.blogRouter.get('/posts', getPosts_1.default);
exports.blogRouter.get('/my', (0, auth_1.auth)(['ADMIN', 'TRAINER', 'MEMBER']), getMyPosts_1.default);
exports.blogRouter.get('/view/:id', getPost_1.default);
exports.blogRouter.post('/', (0, auth_1.auth)(['ADMIN', 'TRAINER', 'MEMBER']), createPost_1.default);
exports.blogRouter.delete('/', (0, auth_1.auth)(['ADMIN', 'TRAINER', 'MEMBER']), deletePost_1.default);
