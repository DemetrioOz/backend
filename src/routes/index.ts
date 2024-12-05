import { Router } from "express";
import equipamentRouter from "./equipament.routes";
import ticketRouter from "./ticket.routes";
import userRouter from "./user.routes";

const router = Router();

router.use("/equipament", equipamentRouter);
router.use("/ticket", ticketRouter);
router.use("/user", userRouter);

export default router;
