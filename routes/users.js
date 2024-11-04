import { Router } from "express";
import { registerUser, loginUser, getProfile, deleteUser } from "../controllers/users.js";
import { isAuthenticated } from "../middlewares/auth.js";

// Create a router
const userRouter = Router();

// Define routes
userRouter.post("/users/register", registerUser);

userRouter.post("/users/login", loginUser);

userRouter.get("/users/me", isAuthenticated, getProfile);

userRouter.delete("/users/me", isAuthenticated, deleteUser);

// Export the router
export default userRouter;