import { Router } from "express";
import { login, registerUsers } from "../controllers/user.controller";
const userRoute = Router();

userRoute.post("/register", registerUsers);
userRoute.post("/login", login);

export default userRoute;
