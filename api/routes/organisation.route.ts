import { Router } from "express";
import {
  addUserOrganisation,
  createOrganisation,
  getOrganisationById,
  getUserOrganisation,
} from "../controllers/organisation.controller";
import { authMiddleWare } from "../middleware/auth.middleware";
const organisationRoute = Router();

organisationRoute.get(
  "/api/organisations",
  authMiddleWare,
  getUserOrganisation
);
organisationRoute.get(
  "/api/organisations/:orgId",
  authMiddleWare,
  getOrganisationById
);
organisationRoute.post(
  "/api/organisations",
  authMiddleWare,
  createOrganisation
);
organisationRoute.post("/api/organisations/:orgId/users", addUserOrganisation);

export default organisationRoute;
