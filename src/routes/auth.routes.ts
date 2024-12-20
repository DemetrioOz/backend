import { Router } from "express";
import { LOGIN, LOGOUT } from "../controllers/auth";
import verifyLogin from "../middlewares/verifyLogin";

const authRouter = Router();

authRouter.post("/", LOGIN);
authRouter.delete("/", verifyLogin, LOGOUT);

export default authRouter;
