import { Router } from "express";
import { supportController } from "./support.controller";

const supportRouter = Router();

supportRouter.post("/create" , supportController.createSupport);

export default supportRouter;