import { useState } from "react";
import API from "../api/api";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await API.post("/api/auth/register", form);
      alert("Registered Successfully!");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-500 to-teal-600">
      
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-96">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create Account 🚀
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            type="text"
            placeholder="Phone Number"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <select
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="">Select Role</option>
            <option value="worker">Worker</option>
            <option value="employer">Employer</option>
          </select>

          <button
            onClick={handleSubmit}
            className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg font-semibold transition duration-300"
          >
            Register
          </button>
        </div>

        <p className="text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <Link to="/" className="text-green-600 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>

    </div>
  );
}