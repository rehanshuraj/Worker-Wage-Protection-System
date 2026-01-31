import express from "express";
import auth from "../middleware/auth.js";
import role from "../middleware/role.js";
import { approveAttendance, payWage } from "../controllers/employer.controller.js";

const router = express.Router();

router.post("/attendance", auth, role(["employer"]), approveAttendance);
router.post("/pay/:id", auth, role(["employer"]), payWage);

export default router;
