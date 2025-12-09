import AppError from "../../utils/AppError";
import { generateJwt } from "../../utils/generateJwt";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import bcrypt from "bcrypt"

const signUp = async (data: Partial<IUser>) => {

    if (!data.email || !data.password || !data.fullName) {
        throw new AppError(400, "fullName, email & password are required");
    }

    const existUser = await User.findOne({ email: data.email });

    if (existUser) {
        throw new AppError(400, `${data.email} already exists`);
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newUser = await User.create({
        fullName: data.fullName,
        email: data.email,
        password: hashedPassword,
        phone: data.phone
    });

    // remove password
    const { password, ...rest } = newUser.toObject();
    return rest;
};


const signIn = async (data: { email: string; password: string }) => {
    const { email, password } = data;

    const user = await User.findOne({ email });
    if (!user) {
        throw new AppError(400, "Invalid email");
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        throw new AppError(400, "Invalid password");
    }


    const tokens = await generateJwt(user);


    user.lastLogin = new Date();
    await user.save();

    const { password: pass, ...rest } = user.toObject();

    return {
        tokens: tokens,
        user: rest
    }
};


export const UserServices = {
    signUp,
    signIn
}