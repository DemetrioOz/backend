import { Router } from "express";
import { CREATE, GET, EDIT, DELETE } from "../controllers/equipament";

const equipamentRouter = Router();

equipamentRouter.get("/", GET);
equipamentRouter.post("/", CREATE);
equipamentRouter.put("/:id", EDIT);
equipamentRouter.delete("/:id", DELETE);

export default equipamentRouter;
