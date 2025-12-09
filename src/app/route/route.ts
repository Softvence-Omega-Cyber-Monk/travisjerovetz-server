import { Router } from "express"

const userRouter = Router();


export const moduleRoute = [
    {
        path : "/user",
        routes : userRouter // Use for example
    }
];

