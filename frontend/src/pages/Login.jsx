import { useState } from "react";
import API from "../api/api";

export default function Login() {
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [name, setName] = useState("");

  const handleLogin = async () => {
    const res = await API.post("/auth/login", { phone, role, name });
    localStorage.setItem("token", res.data.token);

    if (role === "worker") window.location.href = "/worker";
    else window.location.href = "/employer";
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded w-80 shadow">
        <h2 className="text-xl font-bold mb-4">Login</h2>

        <input
          placeholder="Name"
          className="border p-2 w-full mb-2"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Phone"
          className="border p-2 w-full mb-2"
          onChange={(e) => setPhone(e.target.value)}
        />

        <select
          className="border p-2 w-full mb-4"
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
