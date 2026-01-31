import { useState } from "react";
import API from "../../api/api";

export default function WorkerDashboard() {
  const [hours, setHours] = useState(8);
  const [employerPhone, setEmployerPhone] = useState("");

  const markAttendance = async () => {
    try {
      await API.post("/employer/attendance", {
        phone: employerPhone, 
        hoursWorked: Number(hours)
      });

      alert("Attendance marked successfully");
      setEmployerPhone("");
      setHours(8);

    } catch (error) {
      alert(error.response?.data?.message || "Error marking attendance");
      console.error(error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Employer Dashboard</h1>

      {/* Employer Phone */}
      <input
        type="tel"
        placeholder="Employer Phone Number"
        className="border p-2 mb-2 block w-64"
        value={employerPhone}
        onChange={(e) => setEmployerPhone(e.target.value)}
      />

      {/* Hours Worked */}
      <input
        type="number"
        min="1"
        max="24"
        value={hours}
        className="border p-2 mb-2 w-20"
        onChange={(e) => setHours(e.target.value)}
      />

      <button
        onClick={markAttendance}
        className="bg-green-600 text-white px-4 py-2"
      >
        Mark Attendance
      </button>
    </div>
  );
}
