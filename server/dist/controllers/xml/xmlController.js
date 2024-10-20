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
exports.default = xmlController;
const client_1 = __importDefault(require("@/prisma/client"));
const xml2js_1 = __importDefault(require("xml2js"));
function xmlController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const xmlData = (_a = req.file) === null || _a === void 0 ? void 0 : _a.buffer.toString();
        console.log('xml upload called');
        if (!xmlData) {
            return res.status(400).send('No XML file uploaded');
        }
        console.log('xml data: ', xmlData);
        xml2js_1.default.parseString(xmlData, (err, result) => __awaiter(this, void 0, void 0, function* () {
            if (err) {
                console.log('err: ', err);
                return res.status(400).send('Invalid XML');
            }
            console.log('result: ', result);
            if (!result) {
                res.status(400).send('Invalid XML format');
                return;
            }
            try {
                if (result.locations_upload &&
                    result.locations_upload['$'].operation === 'insert') {
                    const locations = result.locations_upload.locations[0].location;
                    console.log('locations: ', locations);
                    if (!locations.length) {
                        return res.status(400).send('No locations found');
                    }
                    for (const location of locations) {
                        console.log('location: ', location);
                        yield client_1.default.location.create({
                            data: {
                                location_name: location.name[0],
                            },
                        });
                    }
                }
                else if (result.activities_upload) {
                    const activities = result.activities_upload.activities[0].activity;
                    console.log('activities: ', activities);
                    for (const activity of activities) {
                        console.log('activity: ', activity);
                        yield client_1.default.activity.create({
                            data: {
                                activity_name: activity.activity_name[0],
                                activity_description: activity.activity_description[0],
                                activity_duration: Number(activity.activity_duration[0]),
                                activity_type: activity.activity_type[0],
                            },
                        });
                    }
                }
                res.status(200).send('XML data uploaded successfully');
            }
            catch (error) {
                console.log('error: ', error);
                res.status(500).send('Error uploading XML data');
            }
        }));
    });
}
