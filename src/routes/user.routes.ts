import { Router } from "express";
import { CREATE, GET } from "../controllers/user";

const userRouter = Router();

userRouter.get("/", GET);
userRouter.post("/", CREATE);

export default userRouter;
