import { useState } from "react";
import API from "../api/api";

export default function Login() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("worker"); // ✅ default

  const handleLogin = async () => {
    try {
      if (!phone || !role) {
        alert("Phone and role are required");
        return;
      }

      console.log("SENDING:", { name, phone, role }); // 🔥 DEBUG

      const res = await API.post("/auth/login", {
        name,
        phone,
        role, // must be lowercase
      });

      localStorage.setItem("token", res.data.token);

      if (role === "worker") {
        window.location.href = "/worker";
      } else {
        window.location.href = "/employer";
      }
    } catch (err) {
      console.error("LOGIN ERROR:", err.response?.data);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="border p-6 w-80">
        <h1 className="text-xl font-bold mb-4">Login</h1>

        <input
          placeholder="Name"
          className="border p-2 w-full mb-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Phone"
          className="border p-2 w-full mb-2"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <select
          className="border p-2 w-full mb-4"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="worker">Worker</option>
          <option value="employer">Employer</option>
        </select>

        <button
          onClick={handleLogin}
          className="bg-black text-white w-full py-2"
        >
          Login
        </button>
      </div>
    </div>
  );
}
