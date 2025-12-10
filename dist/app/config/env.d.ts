interface IEnv {
    MONGO_URI: string;
    PORT: string;
    DEV_ENVIRONMENT: string;
    ACCESS_SECRATE: string;
    REFRESH_SECRATE: string;
    CLOUDINARY: {
        CLOUDINARY_API_SECRATE: string;
        CLOUDINARY_API_KEY: string;
        CLOUDINARY_CLOUD_NAME: string;
    };
}
export declare const envVers: IEnv;
export {};
//# sourceMappingURL=env.d.ts.map