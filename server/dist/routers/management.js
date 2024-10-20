"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.managementRouter = void 0;
const management_1 = require("@/controllers/management");
const management_2 = require("@/controllers/management");
const express_1 = require("express");
exports.managementRouter = (0, express_1.Router)();
exports.managementRouter.get('/', management_1.getTableDatas);
exports.managementRouter.get('/tables', management_2.getTables);
exports.managementRouter.post('/new/:table', management_2.insertData);
exports.managementRouter.patch('/:table', management_2.patchData);
exports.managementRouter.delete('/:table/:id', management_1.deleteData);
