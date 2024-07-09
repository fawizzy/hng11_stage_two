"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var user_controller_1 = require("../controllers/user.controller");
var auth_middleware_1 = require("../middleware/auth.middleware");
var userRoute = (0, express_1.Router)();
userRoute.post("/auth/register", user_controller_1.registerUsers);
userRoute.post("/auth/login", user_controller_1.login);
userRoute.get("/api/users/:id", auth_middleware_1.authMiddleWare, user_controller_1.getUserById);
exports.default = userRoute;
//# sourceMappingURL=user.route.js.map