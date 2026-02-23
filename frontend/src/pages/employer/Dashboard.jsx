import { useEffect, useState } from "react";
import API from "../../api/api";

export default function EmployerDashboard() {
  const [employerPhone, setEmployerPhone] = useState("");
  const [workers, setWorkers] = useState([]);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [workerDetail, setWorkerDetail] = useState(null);

  // Fetch workers under employer
  const fetchWorkers = async () => {
    if (!employerPhone) return;

    const res = await API.get(`/employer/workers/${employerPhone}`);
    setWorkers(res.data);
  };

  // Fetch single worker detail
  const fetchWorkerDetail = async (workerPhone) => {
    const res = await API.get(
      `/employer/worker/${employerPhone}/${workerPhone}`
    );
    setSelectedWorker(workerPhone);
    setWorkerDetail(res.data);
  };

  // Approve today attendance
  const approveAttendance = async (attendanceId) => {
    await API.post("/employer/approve", {
      attendanceId,
      employerPhone,
    });

    alert("Attendance approved");
    fetchWorkerDetail(selectedWorker);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Employer Dashboard</h1>

      {/* Employer phone input */}
      <input
        placeholder="Your Phone Number"
        className="border p-2 mb-4"
        value={employerPhone}
        onChange={(e) => setEmployerPhone(e.target.value)}
        onBlur={fetchWorkers}
      />

      <div className="flex gap-6">
        {/* LEFT PANEL – Workers List */}
        <div className="w-1/3 border p-4 rounded">
          <h2 className="font-semibold mb-2">Your Worker Details</h2>

          {workers.map((worker) => (
            <div
              key={worker.workerPhone}
              onClick={() => fetchWorkerDetail(worker.workerPhone)}
              className={`p-2 mb-2 border cursor-pointer ${
                selectedWorker === worker.workerPhone
                  ? "bg-gray-200"
                  : ""
              }`}
            >
              Worker {worker.workerPhone}
            </div>
          ))}
        </div>

        {/* RIGHT PANEL – Worker Detail */}
        <div className="w-2/3 border p-4 rounded">
          {!workerDetail ? (
            <p>Select a worker to view details</p>
          ) : (
            <>
              <h2 className="font-semibold mb-2">
                Worker: {workerDetail.workerPhone}
              </h2>

              {/* Today attendance */}
              <div className="mb-4">
                <p>
                  <strong>Today Attendance:</strong>{" "}
                  {workerDetail.todayAttendance?.approved
                    ? "Approved"
                    : "Pending"}
                </p>

                {!workerDetail.todayAttendance?.approved && (
                  <button
                    onClick={() =>
                      approveAttendance(
                        workerDetail.todayAttendance._id
                      )
                    }
                    className="bg-green-600 text-white px-3 py-1 mt-2"
                  >
                    Approve
                  </button>
                )}
              </div>

              {/* Total wage */}
              <p>
                <strong>Total Wage:</strong> ₹
                {workerDetail.totalWage}
              </p>

              {/* Disputes */}
              <div className="mt-4">
                <strong>Disputes:</strong>
                {workerDetail.disputes.length === 0 ? (
                  <p>No disputes</p>
                ) : (
                  workerDetail.disputes.map((d) => (
                    <p key={d._id} className="text-red-600">
                      {d.reason}
                    </p>
                  ))
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
