import { Router } from "express";
import { CREATE, EDIT, GET, UNIQUE, DELETE } from "../controllers/ticket";
import verifyLogin from "../middlewares/verifyLogin";

const ticketRouter = Router();

ticketRouter.use(verifyLogin);
ticketRouter.get("/", GET);
ticketRouter.get("/:id", UNIQUE);
ticketRouter.post("/", CREATE);
ticketRouter.put("/:id", EDIT);
ticketRouter.delete("/:id", DELETE);

export default ticketRouter;
