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
exports.getTableDatas = getTableDatas;
const client_1 = __importDefault(require("@/prisma/client"));
const types_1 = require("@/types");
const functions_1 = require("@/utils/functions");
function getTableDatas(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = req.user;
            const _a = req.query, { table } = _a, filtersQuery = __rest(_a, ["table"]);
            console.log('table: ', table);
            console.log('filtersQuery: ', filtersQuery);
            const filters = (0, functions_1.remapFilters)(filtersQuery);
            if (!table) {
                res.status(400).send('table is required');
                return;
            }
            console.log('table: ', table);
            if ((user === null || user === void 0 ? void 0 : user.user_role) === 'ADMIN') {
                switch (table) {
                    case 'activity': {
                        const activities = yield client_1.default.activity.findMany({
                            where: filters,
                        });
                        const fields = client_1.default.activity.fields;
                        const extendedFields = Object.assign(Object.assign({}, fields), { activity_id: Object.assign(Object.assign({}, fields['activity_id']), { isPrimaryKey: true }), activity_type: Object.assign(Object.assign({}, fields['activity_type']), { options: Object.values(types_1.EType).map((value) => ({
                                    value,
                                    label: types_1.activityTypes[value],
                                })) }), activity_description: Object.assign(Object.assign({}, fields['activity_description']), { typeName: 'LongString' }) });
                        res
                            .status(200)
                            .send({ tableDatas: activities, fields: extendedFields });
                        break;
                    }
                    case 'booking': {
                        const bookings = yield client_1.default.booking.findMany({
                            where: filters,
                        });
                        const fields = client_1.default.booking.fields;
                        const members = yield client_1.default.user.findMany({
                            where: {
                                user_role: 'MEMBER',
                            },
                        });
                        const classes = yield client_1.default.class.findMany();
                        const extendedFields = Object.assign(Object.assign({}, fields), { booking_id: Object.assign(Object.assign({}, fields['booking_id']), { isPrimaryKey: true }), booking_user_id: Object.assign(Object.assign({}, fields['booking_user_id']), { isForeignKey: true, label: 'booked_by', options: members.map((user) => ({
                                    value: user.user_id,
                                    label: user.user_firstname + ' ' + user.user_lastname,
                                })) }), booking_class_id: Object.assign(Object.assign({}, fields['booking_class_id']), { isForeignKey: true, label: 'class_name', options: classes.map((class_) => ({
                                    value: class_.class_id,
                                    label: class_.class_name,
                                })) }) });
                        res
                            .status(200)
                            .send({ tableDatas: bookings, fields: extendedFields });
                        break;
                    }
                    case 'class': {
                        const classes = yield client_1.default.class.findMany({
                            where: filters,
                        });
                        const locations = yield client_1.default.location.findMany();
                        const activities = yield client_1.default.activity.findMany();
                        const trainers = (yield client_1.default.user.findMany()).filter((user) => user.user_role === 'TRAINER' || user.user_role === 'ADMIN');
                        const fields = client_1.default.class.fields;
                        const extendedFields = Object.assign(Object.assign({}, fields), { class_id: Object.assign(Object.assign({}, fields['class_id']), { isPrimaryKey: true }), class_date: Object.assign(Object.assign({}, fields['class_date']), { typeName: 'Date' }), class_time: Object.assign(Object.assign({}, fields['class_time']), { typeName: 'Time' }), class_trainer_user_id: Object.assign(Object.assign({}, fields['class_trainer_user_id']), { isForeignKey: true, label: 'class_trainer', options: trainers.map((user) => ({
                                    value: user.user_id,
                                    label: user.user_firstname + ' ' + user.user_lastname,
                                })) }), class_location_id: Object.assign(Object.assign({}, fields['class_location_id']), { isForeignKey: true, label: 'class_location', options: locations.map((location) => ({
                                    value: location.location_id,
                                    label: location.location_name,
                                })) }), class_activity_id: Object.assign(Object.assign({}, fields['class_activity_id']), { isForeignKey: true, label: 'class_activity', options: activities.map((activity) => ({
                                    value: activity.activity_id,
                                    label: activity.activity_name,
                                })) }) });
                        res.status(200).send({ tableDatas: classes, fields: extendedFields });
                        break;
                    }
                    case 'blog': {
                        const blogs = yield client_1.default.blog.findMany({
                            where: filters,
                            include: {
                                User: {
                                    select: {
                                        user_firstname: true,
                                        user_lastname: true,
                                    },
                                },
                            },
                        });
                        // 사용자 이름을 포함한 새로운 데이터 구조를 생성
                        const updatedBlogs = blogs.map((blog) => (Object.assign(Object.assign({}, blog), { post_user_name: `${blog.User.user_firstname} ${blog.User.user_lastname}` })));
                        const fields = client_1.default.blog.fields;
                        const extendedFields = Object.assign(Object.assign({}, fields), { blog_id: Object.assign(Object.assign({}, fields['blog_id']), { isPrimaryKey: true }) });
                        res.status(200).send({
                            tableDatas: updatedBlogs,
                            fields: extendedFields,
                        });
                        break;
                    }
                    case 'user': {
                        const users = yield client_1.default.user.findMany({
                            where: filters,
                        });
                        const fields = client_1.default.user.fields;
                        const extendedFields = Object.assign(Object.assign({}, fields), { user_id: Object.assign(Object.assign({}, fields['user_id']), { isPrimaryKey: true }), user_role: Object.assign(Object.assign({}, fields['user_role']), { options: [
                                    { value: 'ADMIN', label: 'ADMIN' },
                                    { value: 'MEMBER', label: 'MEMBER' },
                                    { value: 'TRAINER', label: 'TRAINER' },
                                ] }), gender: Object.assign(Object.assign({}, fields['gender']), { options: [
                                    { value: 'MALE', label: 'Male' },
                                    { value: 'FEMALE', label: 'Female' },
                                    { value: 'NOT_SPECIFIED', label: 'Not Specified' },
                                ] }), dob: Object.assign(Object.assign({}, fields['dob']), { typeName: 'Date' }) });
                        res.status(200).send({
                            tableDatas: users,
                            fields: extendedFields,
                        });
                        break;
                    }
                    case 'location': {
                        const locations = yield client_1.default.location.findMany({
                            where: filters,
                        });
                        const fields = client_1.default.location.fields;
                        const extendedFields = Object.assign(Object.assign({}, fields), { location_id: Object.assign(Object.assign({}, fields['location_id']), { isPrimaryKey: true }) });
                        res
                            .status(200)
                            .send({ tableDatas: locations, fields: extendedFields });
                        break;
                    }
                    default: {
                        res.status(400).send('table is not valid');
                    }
                }
            }
            else if ((user === null || user === void 0 ? void 0 : user.user_role) === 'TRAINER') {
                switch (table) {
                    case 'activity': {
                        const activities = yield client_1.default.activity.findMany({
                            where: filters,
                        });
                        const fields = client_1.default.activity.fields;
                        const extendedFields = Object.assign(Object.assign({}, fields), { activity_id: Object.assign(Object.assign({}, fields['activity_id']), { isPrimaryKey: true }), activity_type: Object.assign(Object.assign({}, fields['activity_type']), { options: Object.values(types_1.EType).map((value) => ({
                                    value,
                                    label: types_1.activityTypes[value],
                                })) }), activity_description: Object.assign(Object.assign({}, fields['activity_description']), { typeName: 'LongString' }) });
                        res
                            .status(200)
                            .send({ tableDatas: activities, fields: extendedFields });
                        break;
                    }
                    case 'class': {
                        const classes = yield client_1.default.class.findMany({
                            where: filters,
                        });
                        const locations = yield client_1.default.location.findMany();
                        const activities = yield client_1.default.activity.findMany();
                        const trainers = yield client_1.default.user.findMany({
                            where: {
                                user_role: {
                                    in: ['TRAINER', 'ADMIN'],
                                },
                            },
                        });
                        const fields = client_1.default.class.fields;
                        const extendedFields = Object.assign(Object.assign({}, fields), { class_id: Object.assign(Object.assign({}, fields['class_id']), { isPrimaryKey: true }), class_date: Object.assign(Object.assign({}, fields['class_date']), { typeName: 'Date' }), class_time: Object.assign(Object.assign({}, fields['class_time']), { typeName: 'Time' }), class_trainer_user_id: Object.assign(Object.assign({}, fields['class_trainer_user_id']), { isForeignKey: true, label: 'class_trainer', options: trainers.map((user) => ({
                                    value: user.user_id,
                                    label: user.user_firstname + ' ' + user.user_lastname,
                                })) }), class_location_id: Object.assign(Object.assign({}, fields['class_location_id']), { isForeignKey: true, label: 'class_location', options: locations.map((location) => ({
                                    value: location.location_id,
                                    label: location.location_name,
                                })) }), class_activity_id: Object.assign(Object.assign({}, fields['class_activity_id']), { isForeignKey: true, label: 'class_activity', options: activities.map((activity) => ({
                                    value: activity.activity_id,
                                    label: activity.activity_name,
                                })) }) });
                        res.status(200).send({ tableDatas: classes, fields: extendedFields });
                        break;
                    }
                    default:
                        res.status(400).send('table is not valid');
                }
            }
            else {
                res.status(401).send('Unauthorized');
            }
        }
        catch (error) {
            console.log('get data error: ', error);
            res.status(500).send((0, functions_1.getErrorMessage)(error));
        }
    });
}
