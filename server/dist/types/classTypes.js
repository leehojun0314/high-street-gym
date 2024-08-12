"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activityTypes = exports.weekDayNames = exports.EType = exports.EWeek = void 0;
var EWeek;
(function (EWeek) {
    EWeek["SUNDAY"] = "SUN";
    EWeek["MONDAY"] = "MON";
    EWeek["TUESDAY"] = "TUE";
    EWeek["WEDNESDAY"] = "WED";
    EWeek["THURSDAY"] = "THU";
    EWeek["FRIDAY"] = "FRI";
    EWeek["SATURDAY"] = "SAT";
})(EWeek || (exports.EWeek = EWeek = {}));
var EType;
(function (EType) {
    EType["GROUP"] = "GROUP";
    EType["PRIVATE"] = "PRIVATE";
})(EType || (exports.EType = EType = {}));
exports.weekDayNames = {
    SUN: 'Sunday',
    MON: 'Monday',
    TUE: 'Tuesday',
    WED: 'Wednesday',
    THU: 'Thursday',
    FRI: 'Friday',
    SAT: 'Saturday',
};
exports.activityTypes = {
    GROUP: 'Group',
    PRIVATE: 'Private',
};
