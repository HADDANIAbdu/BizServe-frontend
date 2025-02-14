import React, { useState } from "react";
import Alert from "../../../components/Alert";
import {
  createNewNotification,
  Notification,
} from "../../../../api/NotificationsService";

interface Props {
  client_id: number;
  notifications: Notification[];
  onClose: () => void;
}

const AddNotificationForm: React.FC<Props> = ({
  client_id,
  notifications,
  onClose,
}) => {
  const [error, setError] = useState<any | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [formData, setFormData] = useState<Notification>({
    client_id: client_id,
    sent_at: new Date(),
    data: "",
    type: "normal",
  });

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
      const response = await createNewNotification(formData);
      setLoading(false);

      if (response.status === "error") {
        setError(response.message);
        setShowAlert(true);
        return;
      }

      if (response.status === "success") {
        setSuccess("Notification created successfully!");
        const newNotification: Notification = {
          ...formData,
          id: response.data.id,
        };
        notifications.push(newNotification);
        setShowAlert(true);
        // Reset form data
        setFormData({
          client_id: 0,
          sent_at: new Date(),
          data: "",
          type: "normal",
        });
        setTimeout(() => {
          onClose(); // Close the form
        }, 2000);
      }
    } catch (err) {
      console.log("Failed to create notification", err);
      setError("An error occurred while creating the notification.");
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
          Add Notification
        </h5>
        <button type="button" className="btn-close" onClick={onClose}></button>
      </div>
      <div className="offcanvas-body p-6">
        {success && (
          <Alert
            showAlert={showAlert}
            type="success"
            heading={"Success"}
            text={success}
            onClose={handleCloseAlert}
          />
        )}
        {error && typeof error === "string" && (
          <Alert
            showAlert={showAlert}
            type="danger"
            heading={"Notification Creation"}
            text={error}
            onClose={handleCloseAlert}
          />
        )}
        <form onSubmit={handleSubmit} className="add-new-notification">
          <div className="mb-3">
            <label className="form-label" htmlFor="type">
              Client Id
            </label>
            <input
              className={`form-control ${error?.client_id ? "is-invalid" : ""}`}
              name="type"
              value={formData.client_id}
              disabled
            />
            {error?.type && <p className="text-danger">{error.type}</p>}
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="data">
              Data
            </label>
            <textarea
              className={`form-control ${error?.data ? "is-invalid" : ""}`}
              name="data"
              value={formData.data}
              onChange={handleChange}
              required
            />
            {error?.data && <p className="text-danger">{error.data}</p>}
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
              <option value="normal">Normal</option>
              <option value="urgent">Urgent</option>
            </select>
            {error?.type && <p className="text-danger">{error.type}</p>}
          </div>

          <button
            type="submit"
            className={`btn btn-primary me-3 ${loading ? "disabled" : ""}`}
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

export default AddNotificationForm;
