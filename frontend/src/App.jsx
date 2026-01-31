import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import WorkerDashboard from "./pages/worker/Dashboard";
import EmployerDashboard from "./pages/employer/Dashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/worker" element={<WorkerDashboard />} />
        <Route path="/employer" element={<EmployerDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
