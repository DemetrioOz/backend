import { Router } from "express";
import { CREATE, EDIT, GET, DELETE } from "../controllers/user";
import verifyLogin from "../middlewares/verifyLogin";

const userRouter = Router();

// userRouter.use(verifyLogin);
userRouter.get("/", GET);
userRouter.post("/", CREATE);
userRouter.put("/:id", EDIT);
userRouter.delete("/:id", DELETE);

export default userRouter;
