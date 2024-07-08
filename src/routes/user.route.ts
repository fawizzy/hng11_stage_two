import { Router } from "express";
import {
  getUserById,
  login,
  registerUsers,
} from "../controllers/user.controller";
import { authMiddleWare } from "../middleware/auth.middleware";
const userRoute = Router();

userRoute.post("/auth/register", registerUsers);
userRoute.post("/auth/login", login);
userRoute.get("/api/users/:id", authMiddleWare, getUserById);

export default userRoute;
