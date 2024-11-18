import { Router } from "express";
import equipamentRouter from "./equipament.routes";

const router = Router();

router.use("/equipament", equipamentRouter);

export default router;
