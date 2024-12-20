import { Router } from "express";
import equipamentRouter from "./equipament.routes";
import ticketRouter from "./ticket.routes";
import userRouter from "./user.routes";
import authRouter from "./auth.routes";
import { logRequestDetails } from "../middlewares/logRequestDetalis";

const router = Router();

router.use(logRequestDetails);
router.use("/login", authRouter);
router.use("/equipament", equipamentRouter);
router.use("/ticket", ticketRouter);
router.use("/user", userRouter);

export default router;
