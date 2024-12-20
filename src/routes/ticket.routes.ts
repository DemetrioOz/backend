import { Router } from "express";
import { CREATE, GET } from "../controllers/ticket";
import verifyLogin from "../middlewares/verifyLogin";

const ticketRouter = Router();

// ticketRouter.use(verifyLogin);
ticketRouter.get("/", GET);
ticketRouter.post("/", CREATE);

export default ticketRouter;
