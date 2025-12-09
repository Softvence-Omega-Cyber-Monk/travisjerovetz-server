import dotEnv from "dotenv";

dotEnv.config();

interface IEnv {
    MONGO_URI: string,
    PORT: string,
    DEV_ENVIRONMENT : string
}

const envChecker = (): IEnv => {
    const requiredEnv: string[] = ["MONGO_URI", "PORT" , "DEV_ENVIRONMENT"];

    requiredEnv.forEach((key) => {
        if (!process.env[key]) {
            throw new Error(`Required env messing : ${key}`);
        }
    })

    return {
        MONGO_URI: process.env.MONGO_URI as string,
        PORT: process.env.PORT as string,
        DEV_ENVIRONMENT: process.env.DEV_ENVIRONMENT as string,
    }
};

export const envVers = envChecker();
