import express from "express";
import auth from "../middleware/auth.js";
import role from "../middleware/role.js";
import Dispute from "../models/Dispute.js";


const router = express.Router();

router.get("/disputes",auth, role(["admin"]), async(req,res)=>{
    const disputes = await Dispute.find().populate("worker employer");
    res.json(disputes);
});

export default router;