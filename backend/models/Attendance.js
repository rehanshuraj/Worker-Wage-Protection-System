import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
    worker:{
        type: mongoose.Schema.Types.objectId,
        ref: "User",
        required: true
    },
    employer: {
        type: mongoose.Schema.Types.objectId,
        ref: "User",
    },
    date: String,
    hoursWorked:Number,
    approved:{
        type: Boolean,
        default: false
    }
}, {timestamps: true});

export default mongoose.model("Attendance", attendanceSchema);
