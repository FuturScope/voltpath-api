import { Router } from "express";
import { registerUser, loginUser, getProfile } from "../controllers/users.js";
import { isAuthenticated } from "../middlewares/auth.js";

// Create a router
const userRouter = Router();

// Define routes
userRouter.post("/users/register", registerUser);

userRouter.post("/users/login", loginUser);

userRouter.get("/users/me", isAuthenticated, getProfile);

// Export Router
export default userRouter;