import { Router } from "express";
import { CREATE, GET } from "../controllers/ticket";

const ticketRouter = Router();

ticketRouter.get("/", GET);
ticketRouter.post("/", CREATE);

export default ticketRouter;
