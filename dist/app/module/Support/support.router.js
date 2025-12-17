"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const support_controller_1 = require("./support.controller");
const supportRouter = (0, express_1.Router)();
supportRouter.post("/create", support_controller_1.supportController.createSupport);
exports.default = supportRouter;
//# sourceMappingURL=support.router.js.map