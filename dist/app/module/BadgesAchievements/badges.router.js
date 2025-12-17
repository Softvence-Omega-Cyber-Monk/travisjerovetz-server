"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const protect_1 = require("../../middleware/protect");
const badges_controller_1 = require("./badges.controller");
const badgesRouter = (0, express_1.Router)();
badgesRouter.get("/getAllBadges", (0, protect_1.checkAuths)(), badges_controller_1.badgesController.getUserBadges);
exports.default = badgesRouter;
//# sourceMappingURL=badges.router.js.map