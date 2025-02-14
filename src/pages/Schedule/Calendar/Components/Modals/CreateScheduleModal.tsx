import React, { useEffect, useState } from "react";
import { CreateSchedule } from "../../../../../api/SchedulesService";
import { getAllServices, Service } from "../../../../../api/ServicesService";
import { Client, getAllClients } from "../../../../../api/Clients";

interface Props {
  currentDate: Date;
  isModalOpen: boolean;
  handleModalClose: () => void;
  handleCreateSchedule: (newSchedule: CreateSchedule) => void;
}

const CreateScheduleModal: React.FC<Props> = ({
  currentDate,
  isModalOpen,
  handleModalClose,
  handleCreateSchedule,
}) => {
  const [formData, setFormData] = useState({
    clientId: undefined,
    serviceId: undefined,
    type: "",
    date: "",
    time: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      let allServices: Service[] = [];
      let currentpage = 0;
      try {
        do {
          const response = await getAllServices(currentpage);
          if (response.status === "success") {
            allServices = [...allServices, ...response.data];
            currentpage = response.pagination.next_page_url
              ? currentpage + 1
              : -1;
          } else {
            setError(response.message);
            break;
          }
        } while (currentpage !== -1);
        setServices(allServices);
      } catch (err) {
        console.error("Failed to fetch services", err);
        setError("An error occurred while fetching services.");
      }
    };

    const fetchClients = async () => {
      let allClients: Client[] = [];
      let currentpage = 0;
      try {
        do {
          const response = await getAllClients(currentpage);
          if (response.status === "success") {
            allClients = [...allClients, ...response.data];
            currentpage = response.pagination.next_page_url
              ? currentpage + 1
              : -1;
          } else {
            setError(response.message);
            break;
          }
        } while (currentpage !== -1);
        setClients(allClients);
      } catch (err) {
        console.error("Failed to fetch clients", err);
        setError("An error occurred while fetching clients.");
      }
    };

    fetchServices();
    fetchClients();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]:
        name === "clientId" || name === "serviceId" ? Number(value) : value,
    }));
  };

  const handleCreate = () => {
    const { clientId, serviceId, type, date, time } = formData;
    if (clientId && serviceId && type && date) {
      const scheduledAt = `${date} ${time || "00:00"}`;
      const newSchedule: CreateSchedule = {
        client_id: clientId,
        service_id: serviceId,
        type,
        scheduled_at: scheduledAt,
        client: {
          id: clientId,
          firstname: "",
          lastname: "",
        },
        service: {
          id: serviceId,
          name: "",
        },
      };

      handleCreateSchedule(newSchedule);
    } else setError("All fields are required");
  };

  if (!isModalOpen) return null;

  return (
    <div
      className="modal show fade"
      role="dialog"
      style={{ display: "block", zIndex: 1050 }}
      onClick={handleModalClose}
    >
      <div
        className="modal-dialog"
        role="document"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content">
          <div className="box px-10 py-5">
            <h4 className="text-center">
              Schedules for {currentDate.toDateString()}
            </h4>
            {error && <div className="alert alert-danger">{error}</div>}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleCreate();
              }}
              className="add-new-schedule"
              id="addNewScheduleForm"
            >
              {/* Client Select */}
              <div className="mb-3">
                <label className="form-label" htmlFor="clientId">
                  Client
                </label>
                <select
                  className="form-select"
                  name="clientId"
                  value={formData.clientId || ""}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Client</option>
                  {clients.map((client, index) => (
                    <option
                      key={`user-${client.id}-${index}`}
                      value={client.id}
                    >
                      {client.firstname} {client.lastname}
                    </option>
                  ))}
                </select>
              </div>

              {/* Service Select */}
              <div className="mb-3">
                <label className="form-label" htmlFor="serviceId">
                  Service
                </label>
                <select
                  className="form-select"
                  name="serviceId"
                  value={formData.serviceId || ""}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Service</option>
                  {services.map((service, index) => (
                    <option
                      key={`service-${service.id}-${index}`}
                      value={service.id}
                    >
                      {service.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Type Input */}
              <div className="mb-3">
                <label className="form-label" htmlFor="type">
                  Type
                </label>
                <select
                  className="form-select"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select type</option>
                  <option value="appointement">appointement</option>
                  <option value="course">course</option>
                  <option value="other">other</option>
                </select>
              </div>

              {/* Date and Time Inputs */}
              <div className="mb-3">
                <label className="form-label">Date & Time</label>
                <div className="input-group">
                  <input
                    type="date"
                    className="form-control"
                    name="date"
                    value={
                      formData.date !== ""
                        ? formData.date
                        : currentDate.toDateString()
                    }
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="time"
                    className="form-control"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="d-flex justify-content-around mt-5 mx-10">
                <button className="btn btn-primary" type="submit">
                  Add Interaction
                </button>{" "}
                <button
                  className="btn btn-secondary"
                  onClick={handleModalClose}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateScheduleModal;
