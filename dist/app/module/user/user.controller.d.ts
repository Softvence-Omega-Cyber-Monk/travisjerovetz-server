import { NextFunction, Request, Response } from "express";
export declare const UserController: {
    SignUp: (req: Request, res: Response, next: NextFunction) => void;
    SingIn: (req: Request, res: Response, next: NextFunction) => void;
    updateUserProfile: (req: Request, res: Response, next: NextFunction) => void;
    getAccessTokenUseRefreshToken: (req: Request, res: Response, next: NextFunction) => void;
};
//# sourceMappingURL=user.controller.d.ts.map