import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  try {
    const { phone, role, name } = req.body;

    if (!phone || !role) {
      return res.status(400).json({
        message: "Phone and role are required",
      });
    }

    let user = await User.findOne({ phone });

    if (!user) {
      user = await User.create({
        phone,
        role,
        name: name || "User", // ✅ fallback
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      token,
      user,
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({
      message: error.message,
    });
  }
};
