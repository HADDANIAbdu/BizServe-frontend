import React, { useState } from "react";
import { Schedule, UpdateSchedule } from "../../../../api/SchedulesService";
import { FaEdit, FaTrash } from "react-icons/fa";
import EditScheduleModal from "./Modals/EditScheduleModal";

interface Props {
  selectedSchedules: Schedule[];
  onAdd: () => void;
  onEdit: (id: number, updatedSchedule: UpdateSchedule) => void; // Update the type to match
  onDelete: (id: number) => void;
}

const InteractionList: React.FC<Props> = ({
  selectedSchedules,
  onAdd,
  onEdit,
  onDelete,
}) => {
  const [openScheduleId, setOpenScheduleId] = useState<number | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [scheduleToEdit, setScheduleToEdit] = useState<Schedule | null>(null);

  const toggleCollapse = (id: number) => {
    setOpenScheduleId(openScheduleId === id ? null : id);
  };

  const handleEdit = (id: number) => {
    const schedule = selectedSchedules.find((s) => s.id === id);
    if (schedule) {
      setScheduleToEdit(schedule);
      setModalOpen(true);
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setScheduleToEdit(null);
  };

  const handleUpdateSchedule = (
    id: number,
    updatedSchedule: UpdateSchedule
  ) => {
    onEdit(id, updatedSchedule);
    handleModalClose();
  };

  return (
    <div className="card card-action mb-6">
      <div className="card-header align-items-center py-6">
        <h5 className="card-action-title mb-0">Event</h5>
        <div className="card-action-element">
          <button
            className="btn btn-sm btn-primary"
            type="button"
            onClick={onAdd}
          >
            Add new event
          </button>
        </div>
      </div>
      <div className="card-body">
        <div className="accordion accordion-flush" id="accordionSchedule">
          {selectedSchedules.length === 0 ? (
            <p>No interactions for today</p>
          ) : (
            selectedSchedules.map((schedule) => (
              <div key={schedule.id} className="accordion-item border-bottom">
                <div
                  className="accordion-header d-flex justify-content-between align-items-center flex-wrap flex-sm-nowrap"
                  id={`schedule-${schedule.id}`}
                >
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    onClick={() => toggleCollapse(schedule.id)}
                  >
                    <span>
                      <span className="d-flex gap-2 align-items-baseline">
                        <span className="h6 mb-1">
                          {schedule.client.lastname} {schedule.client.firstname}
                        </span>
                        <span className="badge bg-label-primary">
                          {schedule.type}
                        </span>
                      </span>
                    </span>
                  </button>
                  <div className="d-flex">
                    <button
                      className="btn p-2"
                      onClick={() => handleEdit(schedule.id)} // Use handleEdit
                    >
                      <FaEdit className="text-primary" size={18} />
                    </button>
                    <button
                      className="btn p-2"
                      onClick={() => onDelete(schedule.id)}
                    >
                      <FaTrash className="text-danger" size={18} />
                    </button>
                  </div>
                </div>
                <div
                  className={`accordion-collapse collapse ${
                    openScheduleId === schedule.id ? "show" : ""
                  }`}
                >
                  <div className="accordion-body ps-8 ms-1_5">
                    <h6 className="mb-1">
                      Client : {schedule.client.lastname}{" "}
                      {schedule.client.firstname}
                    </h6>
                    <p className="mb-1">Service : {schedule.service.name}</p>
                    <p className="mb-1">Type : {schedule.type}</p>
                    <p className="mb-1">
                      Due Date :{" "}
                      {new Date(schedule.scheduled_at).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      {/* Edit Schedule Modal */}
      <EditScheduleModal
        currentDate={new Date()} // Pass the current date or desired date
        isModalOpen={isModalOpen}
        handleModalClose={handleModalClose}
        handleUpdateSchedule={handleUpdateSchedule}
        scheduleToEdit={scheduleToEdit}
        idSchedule={scheduleToEdit?.id!}
      />
    </div>
  );
};

export default InteractionList;
