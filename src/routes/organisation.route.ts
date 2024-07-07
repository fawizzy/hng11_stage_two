import { Router } from "express";
import {
  getOrganisationById,
  getUserOrganisation,
} from "../controllers/organisation.controller";
const organisationRoute = Router();

organisationRoute.get("/api/organisation", getUserOrganisation);
organisationRoute.get("/api/organisation/:orgId", getOrganisationById);

export default organisationRoute;
