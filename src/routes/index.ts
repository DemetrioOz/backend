import { Router } from "express";
import equipamentRouter from "./equipament.routes";
import ticketRouter from "./ticket.routes";

const router = Router();

router.use("/equipament", equipamentRouter);
router.use("/ticket", ticketRouter);

export default router;
