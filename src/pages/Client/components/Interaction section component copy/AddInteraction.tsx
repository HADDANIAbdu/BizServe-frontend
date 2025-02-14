import React, { useEffect, useState } from "react";
import Alert from "../../../components/Alert";
import {
  createNewInteraction,
  Interaction,
} from "../../../../api/Interactions";
import { getAllServices, Service } from "../../../../api/ServicesService";

interface Props {
  client_id: number;
  interactions: Interaction[];
  onClose: () => void;
}

const AddInteractionForm: React.FC<Props> = ({
  client_id,
  interactions,
  onClose,
}) => {
  const [error, setError] = useState<any | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [formData, setFormData] = useState<Interaction>({
    client_id: client_id,
    service_id: 0,
    type: "other", // Default type
    date_interaction: new Date(),
    outcome: "",
    details: "",
  });
  const [services, setServices] = useState<Service[]>([]); // State for users

  useEffect(() => {
    const getServices = async () => {
      let allServices: Service[] = [];
      let currentpage = 0;
      try {
        do {
          const response = await getAllServices(currentpage);
          if (response.status === "success") {
            allServices = [...allServices, ...response.data];
            response.pagination.next_page_url !== null
              ? currentpage++
              : (currentpage = -1);
          } else {
            setError(response.message);
            break;
          }
        } while (currentpage !== -1);

        setServices(allServices);
      } catch (err) {
        console.error("Failed to fetch users", err);
        setError("An error occurred while fetching users.");
      }
    };

    getServices();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(null);
    setShowAlert(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await createNewInteraction(formData); // Assume this function exists
      setLoading(false);

      if (response.status === "error") {
        setError(response.message);
        setShowAlert(true);
        return;
      }

      if (response.status === "success") {
        setSuccess("Interaction created successfully!");
        const newInteraction: Interaction = {
          ...formData,
          id: response.data.id,
          service: response.data.service,
        };
        interactions.push(newInteraction);
        console.log(newInteraction);

        setShowAlert(true);
        // Reset form data
        setFormData({
          client_id: client_id,
          type: "other",
          date_interaction: new Date(),
          outcome: "",
          details: "",
        });

        setTimeout(() => {
          onClose(); // Close the form after 2 seconds
        }, 2000);
      }
    } catch (err) {
      console.error("Failed to create interaction", err);
      setError("An error occurred while creating the interaction.");
      setShowAlert(true);
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <div
      className="offcanvas offcanvas-end show"
      tabIndex={-1}
      id="offcanvasAddNotification"
    >
      <div className="offcanvas-header border-bottom">
        <h5 id="offcanvasAddNotificationLabel" className="offcanvas-title">
          Add Interaction
        </h5>
        <button type="button" className="btn-close" onClick={onClose}></button>
      </div>
      <div className="offcanvas-body p-6">
        {success && (
          <Alert
            showAlert={showAlert}
            type="success"
            heading="Success"
            text={success}
            onClose={handleCloseAlert}
          />
        )}
        {error && typeof error === "string" && (
          <Alert
            showAlert={showAlert}
            type="danger"
            heading="Interaction Creation"
            text={error}
            onClose={handleCloseAlert}
          />
        )}
        <form onSubmit={handleSubmit} className="add-new-interaction">
          <div className="mb-3">
            <label className="form-label" htmlFor="client_id">
              Client Id
            </label>
            <input
              className={`form-control ${error?.client_id ? "is-invalid" : ""}`}
              name="client_id"
              value={formData.client_id}
              disabled
            />
            {error?.client_id && (
              <p className="text-danger">{error.client_id}</p>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="service_id">
              Servicse
            </label>
            <select
              className={`form-control ${
                error?.service_id ? "is-invalid" : ""
              }`}
              name="service_id"
              value={formData.service_id}
              onChange={handleChange}
              required
            >
              <option key={0} value="" disabled>
                Select a service
              </option>
              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.name}
                </option>
              ))}
            </select>
            {error?.service_id && (
              <p className="text-danger">{error.service_id}</p>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="outcome">
              Outcome
            </label>
            <input
              className={`form-control ${error?.outcome ? "is-invalid" : ""}`}
              name="outcome"
              value={formData.outcome}
              onChange={handleChange}
              required
            />
            {error?.outcome && <p className="text-danger">{error.outcome}</p>}
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="type">
              Type
            </label>
            <select
              className={`form-control ${error?.type ? "is-invalid" : ""}`}
              name="type"
              value={formData.type}
              onChange={handleChange}
            >
              <option value="other">Other</option>
              <option value="email">Email</option>
              <option value="call">Call</option>
              <option value="meet">Meet</option>
            </select>
            {error?.type && <p className="text-danger">{error.type}</p>}
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="date_interaction">
              Interaction Date
            </label>
            <input
              type="date"
              className={`form-control ${
                error?.date_interaction ? "is-invalid" : ""
              }`}
              name="date_interaction"
              value={
                formData.date_interaction
                  ? formData.date_interaction.toISOString().split("T")[0]
                  : ""
              }
              onChange={handleChange}
              required
            />
            {error?.date_interaction && (
              <p className="text-danger">{error.date_interaction}</p>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="details">
              Details
            </label>
            <textarea
              className={`form-control ${error?.details ? "is-invalid" : ""}`}
              name="details"
              value={formData.details}
              onChange={handleChange}
              required
            />
            {error?.details && <p className="text-danger">{error.details}</p>}
          </div>
          <button
            type="submit"
            className={`btn btn-primary me-3 ${loading ? "disabled" : ""}`}
            disabled={loading}
          >
            Submit
          </button>
          <button
            type="button"
            className="btn btn-label-danger"
            onClick={onClose}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddInteractionForm;
