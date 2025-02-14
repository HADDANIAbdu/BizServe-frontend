import { Navigate, Route, Routes } from "react-router-dom";
import ScheduleCalendar from "./Calendar/Schedules";

const SchedulePage = () => {
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <Routes>
        <Route path="/" element={<ScheduleCalendar />} />
        {/* <Route path="/*" element={<Navigate to="/404" />} /> */}
      </Routes>
    </div>
  );
};
export default SchedulePage;
