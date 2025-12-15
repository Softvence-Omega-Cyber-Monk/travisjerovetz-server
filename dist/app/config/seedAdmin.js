"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedAdmin = void 0;
const user_interface_1 = require("../module/user/user.interface");
const user_model_1 = require("../module/user/user.model");
const env_1 = require("./env");
const seedAdmin = async () => {
    const findAdmin = await user_model_1.User.findOne({ email: env_1.envVers.ADMIN.ADMIN_EMAIL });
    if (!findAdmin) {
        await user_model_1.User.create({
            fullName: "Admin Hasan",
            email: env_1.envVers.ADMIN.ADMIN_EMAIL,
            password: env_1.envVers.ADMIN.ADMIN_PASSWORD,
            role: user_interface_1.IRole.ADMIN
        });
        console.log("Admin created successfully");
    }
    ;
    console.log("Admin already exist");
};
exports.seedAdmin = seedAdmin;
//# sourceMappingURL=seedAdmin.js.map