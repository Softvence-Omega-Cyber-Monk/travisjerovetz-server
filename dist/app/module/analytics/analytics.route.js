"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const protect_1 = require("../../middleware/protect");
const analytics_controller_1 = require("./analytics.controller");
const analyticsRouter = (0, express_1.Router)();
analyticsRouter.get("/admin/analytics", (0, protect_1.checkAuths)(), analytics_controller_1.analyticsController.adminAnalytics);
analyticsRouter.get("/user/analytics/:userId", (0, protect_1.checkAuths)(), analytics_controller_1.analyticsController.userAnalyticsData);
exports.default = analyticsRouter;
//# sourceMappingURL=analytics.route.js.map