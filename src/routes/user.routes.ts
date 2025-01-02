import { Router } from "express";
import { CREATE, UNIQUE, EDIT, GET, DELETE } from "../controllers/user";
import verifyLogin from "../middlewares/verifyLogin";

const userRouter = Router();

userRouter.use(verifyLogin);
userRouter.get("/", GET);
userRouter.get("/:id", UNIQUE);
userRouter.post("/", CREATE);
userRouter.put("/:id", EDIT);
userRouter.delete("/:id", DELETE);

export default userRouter;
