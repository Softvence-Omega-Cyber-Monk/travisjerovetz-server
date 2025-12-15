import { IRole } from "../module/user/user.interface";
import { User } from "../module/user/user.model"
import { envVers } from "./env"

export const seedAdmin = async () => {
    const findAdmin = await User.findOne({ email: envVers.ADMIN.ADMIN_EMAIL });

    if (!findAdmin) {
        await User.create({
            fullName : "Admin Hasan",
            email: envVers.ADMIN.ADMIN_EMAIL,
            password: envVers.ADMIN.ADMIN_PASSWORD,
            role: IRole.ADMIN
        });
        console.log("Admin created successfully");
    };
    console.log("Admin already exist");
}