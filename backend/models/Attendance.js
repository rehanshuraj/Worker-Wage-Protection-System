import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    worker: {
      phone: { type: String, required: true },
    },

    employer: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
    },

    date: {
      type: String,
      required: true,
    },

    totalHours: {
      type: Number,
      required: true,
    },

    ratePerHour: {
      type: Number,
      required: true,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    approved: {
      type: Boolean,
      default: false,
    },

    paid: {
      type: Boolean,
      default: false,
    },

    paymentDate: Date,
  },
  { timestamps: true }
);

export default mongoose.model("Attendance", attendanceSchema);
