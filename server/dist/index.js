"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routers_1 = __importDefault(require("./routers"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use((0, cors_1.default)({
    origin: true,
}));
app.use(express_1.default.json());
app.use('/', routers_1.default);
app.get('/', (req, res) => {
    res.send('Hello World');
});
app.use((req, res, next) => {
    console.log('req.url: ', req.url);
    res.status(404).send('Not found');
});
app.use((err, req, res, next) => {
    console.log('err: ', err);
    res.status(500).send(err.message);
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
