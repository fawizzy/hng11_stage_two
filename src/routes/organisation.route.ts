import { Router } from "express";
import { getUserOrganisation } from "../controllers/organisation.controller";
const organisationRoute = Router();

organisationRoute.get("/api/organisation", getUserOrganisation);

export default organisationRoute;
