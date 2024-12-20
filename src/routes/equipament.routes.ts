import { Router } from "express";
import { CREATE, GET, EDIT, DELETE } from "../controllers/equipament";
import verifyLogin from "../middlewares/verifyLogin";

const equipamentRouter = Router();

// equipamentRouter.use(verifyLogin);
equipamentRouter.get("/", GET);
equipamentRouter.post("/", CREATE);
equipamentRouter.put("/:id", EDIT);
equipamentRouter.delete("/:id", DELETE);

export default equipamentRouter;
