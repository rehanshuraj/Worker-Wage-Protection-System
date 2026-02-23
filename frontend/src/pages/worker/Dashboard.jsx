import { useEffect, useState } from "react";
import API from "../../api/api";

export default function WorkerDashboard() {
  // Attendance form
  const [workerPhone, setWorkerPhone] = useState("");
  const [employerName, setEmployerName] = useState("");
  const [employerPhone, setEmployerPhone] = useState("");
  const [hoursWorked, setHoursWorked] = useState(8);
  const [ratePerHour, setRatePerHour] = useState(500);

  // Data panels
  const [summary, setSummary] = useState(null);
  const [disputes, setDisputes] = useState([]);

  // Submit attendance
  const markAttendance = async () => {
    try {
      await API.post("/worker/attendance", {
        workerPhone,
        employerName,
        employerPhone,
        totalHours: hoursWorked,
        ratePerHour,
      });

      alert("Attendance sent to employer");
      fetchSummary();
      fetchDisputes();
    } catch (err) {
      alert(err.response?.data?.message || "Error submitting attendance");
    }
  };

  // Fetch worker summary
  const fetchSummary = async () => {
    if (!workerPhone) return;
    const res = await API.get(`/worker/summary/${workerPhone}`);
    setSummary(res.data);
  };

  // Fetch disputes
  const fetchDisputes = async () => {
    if (!workerPhone) return;
    const res = await API.get(`/worker/disputes/${workerPhone}`);
    setDisputes(res.data);
  };

  useEffect(() => {
    fetchSummary();
    fetchDisputes();
  }, [workerPhone]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Worker Dashboard</h1>

      <div className="flex gap-6">
        {/* LEFT PANEL – MARK ATTENDANCE */}
        <div className="w-1/3 border p-4 rounded">
          <h2 className="font-semibold mb-3">Mark Attendance</h2>

          <input
            placeholder="Your Phone Number"
            className="border p-2 w-full mb-2"
            value={workerPhone}
            onChange={(e) => setWorkerPhone(e.target.value)}
          />

          <input
            placeholder="Employer Name"
            className="border p-2 w-full mb-2"
            value={employerName}
            onChange={(e) => setEmployerName(e.target.value)}
          />

          <input
            placeholder="Employer Phone Number"
            className="border p-2 w-full mb-2"
            value={employerPhone}
            onChange={(e) => setEmployerPhone(e.target.value)}
          />

          <input
            type="number"
            placeholder="Hours Worked"
            className="border p-2 w-full mb-2"
            value={hoursWorked}
            onChange={(e) => setHoursWorked(e.target.value)}
          />

          <input
            type="number"
            placeholder="Rate per Hour"
            className="border p-2 w-full mb-4"
            value={ratePerHour}
            onChange={(e) => setRatePerHour(e.target.value)}
          />

          <button
            onClick={markAttendance}
            className="bg-green-600 text-white w-full py-2"
          >
            Mark Attendance
          </button>
        </div>

        {/* MIDDLE PANEL – DISPUTES */}
        <div className="w-1/3 border p-4 rounded">
          <h2 className="font-semibold mb-3">Your Disputes</h2>

          {disputes.length === 0 ? (
            <p>No disputes raised</p>
          ) : (
            disputes.map((d) => (
              <div key={d._id} className="border p-2 mb-2">
                <p>Date: {d.date}</p>
                <p>Status: {d.status}</p>
                <p className="text-red-600">{d.reason}</p>
              </div>
            ))
          )}
        </div>

        {/* RIGHT PANEL – SUMMARY */}
        <div className="w-1/3 border p-4 rounded">
          <h2 className="font-semibold mb-3">Your Summary</h2>

          {!summary ? (
            <p>Enter phone number to see summary</p>
          ) : (
            <>
              <p>
                <strong>Total Money:</strong> ₹{summary.totalMoney}
              </p>
              <p>
                <strong>Wage Left:</strong> ₹{summary.unpaidMoney}
              </p>
              <p>
                <strong>Total Hours Worked:</strong> {summary.totalHours}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
