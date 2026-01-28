import Attendance from "../models/Attendance.js";
import Dispute from "../models/Dispute.js";

export const markAttendance  = async(req,res)=>{
    const {employerId, date, hoursWorked} = req.body;

    const attendance  = await Attendance.create({
        worker
    })
}