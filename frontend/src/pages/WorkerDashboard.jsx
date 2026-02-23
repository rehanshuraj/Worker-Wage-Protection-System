import { useState } from "react";
import API from "../api/api";

export default function WorkerDashboard() {
  const [employerPhone, setEmployerPhone] = useState("");
  const [hoursWorked, setHoursWorked] = useState(8);

  const markAttendance = async () => {
    await API.post("/api/attendance/mark", {
      employerPhone,
      hoursWorked
    });

    alert("Attendance Marked");
  };

  return (
    <div>
      <h2>Worker Dashboard</h2>
      <input
        placeholder="Employer Phone"
        onChange={(e)=>setEmployerPhone(e.target.value)}
      />
      <input
        type="number"
        value={hoursWorked}
        onChange={(e)=>setHoursWorked(e.target.value)}
      />
      <button onClick={markAttendance}>
        Mark Attendance
      </button>
    </div>
  );
}