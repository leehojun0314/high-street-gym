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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const userData = [];
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('start seeding...');
        for (const u of userData) {
            const user = yield prisma.user.create({
                data: u,
            });
            console.log(`Created user with id: ${user.user_id}`);
        }
        console.log(`Seeding finished.`);
    });
}
main()
    .then(() => {
    console.log('seed complete');
    return prisma.$disconnect();
})
    .then(() => {
    console.log('prisma disconnected');
})
    .catch((error) => {
    console.log('error occured: ', error);
});
