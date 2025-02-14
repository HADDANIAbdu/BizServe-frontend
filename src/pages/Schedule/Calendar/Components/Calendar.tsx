import React, { useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styles from "./Calendar.module.css";

interface CalendarProps {
  currentDate: Date;
  setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
  schedules: any[];
  handleDateClick: (date: Date) => void;
}

const CalendarComponent: React.FC<CalendarProps> = ({
  currentDate,
  setCurrentDate,
  schedules,
  handleDateClick,
}) => {
  const tileClassName = ({ date }: { date: Date }) => {
    const formattedDate = date.toISOString().split("T")[0];

    const hasSchedule = schedules.some((schedule) => {
      const scheduleDate = new Date(schedule.scheduled_at + "")
        .toISOString()
        .split("T")[0];
      return scheduleDate === formattedDate;
    });

    // Return class based on condition (using module CSS)
    return hasSchedule ? styles["marked-date"] : "";
  };

  return (
    <div className="card card-action mb-6 p-5 d-flex justify-content-center align-items-center">
      <div className="calendar-section">
        <Calendar
          onChange={setCurrentDate}
          value={currentDate}
          tileClassName={tileClassName}
          onClickDay={handleDateClick}
        />
      </div>
    </div>
  );
};

export default CalendarComponent;
