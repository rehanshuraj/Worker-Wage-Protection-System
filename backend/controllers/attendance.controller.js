import Attendance from "../models/Attendance.js";
import User from "../models/User.js";

export const markAttendance = async (req, res) => {
  const { employerPhone, hoursWorked } = req.body;

  const employer = await User.findOne({ phone: employerPhone });
  if (!employer) return res.status(404).json({ message: "Employer not found" });

  const attendance = await Attendance.create({
    worker: req.user._id,
    employer: employer._id,
    hoursWorked
  });

  res.json(attendance);
};

export const approveAttendance = async (req, res) => {
  const attendance = await Attendance.findById(req.params.id);

  if (!attendance) return res.status(404).json({ message: "Not found" });

  attendance.approved = true;
  await attendance.save();

  res.json(attendance);
};

export const getEmployerAttendance = async (req, res) => {
  try {
    const records = await Attendance.find({
      employer: req.user._id
    }).populate("worker", "name phone");

    res.json(records);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};