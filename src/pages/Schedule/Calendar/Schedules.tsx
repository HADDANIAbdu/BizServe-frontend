import { useEffect, useState } from "react";
import {
  getAllSchedules,
  Schedule,
  deleteSchedule,
  CreateSchedule,
  UpdateSchedule,
  createNewSchedule,
} from "../../../api/SchedulesService";
import Spinner from "../../components/Spinner";
import InteractionList from "./Components/InteractionsList";
import ScheduleModal from "./Components/Modals/CreateScheduleModal";
import CalendarComponent from "./Components/Calendar";

const ScheduleCalendar: React.FC = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedSchedules, setSelectedSchedules] = useState<Schedule[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchSchedules = async () => {
      setLoading(true);
      try {
        const response = await getAllSchedules();
        if (response.status === "success") {
          setSchedules(response.data);
        }
      } catch (err) {
        setError("Failed to fetch schedules.");
      } finally {
        setLoading(false);
      }
    };

    fetchSchedules();
  }, []);

  useEffect(() => {
    const formattedDate = currentDate.toISOString().split("T")[0];
    const filteredSchedules = schedules.filter((schedule) => {
      const scheduleDate = new Date(schedule.scheduled_at + "")
        .toISOString()
        .split("T")[0];
      return scheduleDate === formattedDate;
    });
    setSelectedSchedules(filteredSchedules);
  }, [currentDate, schedules]);

  const handleDateClick = (date: Date) => {
    setCurrentDate(date);
    // setIsModalOpen(true);
  };

  const handleAdd = () => {
    setIsModalOpen(true);
  };
  const handleModalClose = () => setIsModalOpen(false);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this schedule?"))
      return;
    try {
      await deleteSchedule(id);
      setSchedules((prevSchedules) =>
        prevSchedules.filter((schedule) => schedule.id !== id)
      );
    } catch (err) {
      setError("Failed to delete schedule.");
    }
  };

  const handleCreate = async (newSchedule: CreateSchedule) => {
    try {
      const response = await createNewSchedule(newSchedule);
      console.log(response);

      // setSchedules(schedules.push(response.data :Schedule));
    } catch (err) {
      setError("Failed to create schedule.");
      console.log(err);
      
    }
  };

  const handleEdit = async (id: number, updatedSchedule: UpdateSchedule) => {
    console.log("edit " + id);
    console.log(updatedSchedule);
  };

  if (loading) {
    return (
      <>
        <div className="container-xxl flex-grow-1 container-p-y">
          <span className="text-center pt-5">Loading schedules...</span>
          <Spinner />
        </div>
      </>
    );
  }

  if (error) {
    return <h5 className="text-danger text-center p-5">{error}</h5>;
  }

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="schedule-container row">
        <div className="col-lg-6">
          <CalendarComponent
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
            schedules={schedules}
            handleDateClick={handleDateClick}
          />
        </div>
        <div className="col-lg-6">
          <InteractionList
            selectedSchedules={selectedSchedules}
            onAdd={handleAdd}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        </div>
      </div>
      {isModalOpen && (
        <ScheduleModal
          currentDate={currentDate}
          isModalOpen={isModalOpen}
          handleModalClose={handleModalClose}
          handleCreateSchedule={handleCreate}
        />
      )}
    </div>
  );
};

export default ScheduleCalendar;
