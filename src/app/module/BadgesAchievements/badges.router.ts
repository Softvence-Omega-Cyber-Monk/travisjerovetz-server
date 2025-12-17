import { Router } from "express";
import { checkAuths } from "../../middleware/protect";
import { badgesController } from "./badges.controller";

const badgesRouter = Router();

badgesRouter.get("/getAllBadges" , checkAuths() , badgesController.getUserBadges);


export default badgesRouter;