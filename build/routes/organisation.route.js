"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var organisation_controller_1 = require("../controllers/organisation.controller");
var auth_middleware_1 = require("../middleware/auth.middleware");
var organisationRoute = express_1.Router();
organisationRoute.get("/api/organisations", auth_middleware_1.authMiddleWare, organisation_controller_1.getUserOrganisation);
organisationRoute.get("/api/organisations/:orgId", auth_middleware_1.authMiddleWare, organisation_controller_1.getOrganisationById);
organisationRoute.post("/api/organisations", auth_middleware_1.authMiddleWare, organisation_controller_1.createOrganisation);
organisationRoute.post("/api/organisations/:orgId/users", organisation_controller_1.addUserOrganisation);
exports.default = organisationRoute;
//# sourceMappingURL=organisation.route.js.map