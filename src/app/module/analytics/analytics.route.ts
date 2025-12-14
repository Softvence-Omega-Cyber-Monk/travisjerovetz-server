import { Router } from "express";
import { checkAuths } from "../../middleware/protect";
import { analyticsController } from "./analytics.controller";

const analyticsRouter = Router();



analyticsRouter.get("/admin/analytics" , checkAuths() , analyticsController.adminAnalytics);
analyticsRouter.get("/user/analytics/:userId" , checkAuths() , analyticsController.userAnalyticsData);




export default analyticsRouter;