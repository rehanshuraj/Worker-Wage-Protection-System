import { useEffect, useState } from "react";
import API from "../api/api";

export default function EmployerDashboard() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    API.get("/api/attendance")
      .then(res => setRecords(res.data));
  }, []);

  const approve = async (id) => {
    await API.patch(`/api/attendance/approve/${id}`);
    alert("Approved");
  };

  return (
    <div>
      <h2>Employer Dashboard</h2>

      {records.map(r => (
        <div key={r._id}>
          <p>Hours: {r.hoursWorked}</p>
          <p>Status: {r.approved ? "Approved" : "Pending"}</p>
          {!r.approved && (
            <button onClick={()=>approve(r._id)}>
              Approve
            </button>
          )}
        </div>
      ))}
    </div>
  );
}