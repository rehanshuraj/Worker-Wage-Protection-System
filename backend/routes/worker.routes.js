import express from "express";
import auth from "../middleware/auth.js";
import role from "../middleware/role.js";
import { approveAttendance, raiseDispute } from "../controllers/worker.controller.js";

const router = express.Router();

router.post("/attendance", auth, role(["worker"]), approveAttendance);
router.post("/dispute", auth, role(["worker"]), raiseDispute);

export default router;
