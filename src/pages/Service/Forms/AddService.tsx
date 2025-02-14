import React, { useState } from "react";
import { createNewService, Service } from "../../../api/ServicesService";

interface Props {
  services: Service[];
  onClose: () => void;
  onSuccess: (text: string) => void;
}

const AddServiceForm: React.FC<Props> = ({ services, onClose, onSuccess }) => {
  const [error, setError] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Form data for creating a new service
  const [formData, setFormData] = useState<{
    name: string;
    category: string;
    duration: string;
    price: number;
    description: string;
  }>({
    name: "",
    category: "",
    duration: "",
    price: 0.0,
    description: "",
  });

  // Handle form input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError(null); // Clear any errors when changing input
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await createNewService(formData);
      setLoading(false);

      if (response.status === "error") {
        setError(response.message);
        return;
      }

      if (response.status === "success") {
        onSuccess("Service created successfully!");
        services.push(response.data); // Add the new service to the services array

        // Reset form after submission
        setFormData({
          name: "",
          category: "",
          duration: "",
          price: 0.0,
          description: "",
        });

        // Close the form after a short delay
        setTimeout(onClose, 2000);
      }
    } catch (err) {
      setLoading(false);
      console.error("Failed to create service", err);
      setError("An error occurred while creating the service.");
    }
  };

  return (
    <div
      className="offcanvas offcanvas-end show"
      tabIndex={-1}
      id="offcanvasAddService"
    >
      <div className="offcanvas-header border-bottom">
        <h5 id="offcanvasAddServiceLabel" className="offcanvas-title">
          Add Service
        </h5>
        <button type="button" className="btn-close" onClick={onClose}></button>
      </div>
      <div className="offcanvas-body p-6">
        <form
          onSubmit={handleSubmit}
          className="add-new-service"
          id="addNewServiceForm"
        >
          <div className="mb-6">
            <label className="form-label" htmlFor="name">
              Service Name
            </label>
            <input
              type="text"
              className={`form-control ${error?.name ? "is-invalid" : ""}`}
              placeholder="Service Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            {error?.name && <p className="text-danger">{error.name}</p>}
          </div>

          <div className="mb-6">
            <label className="form-label" htmlFor="category">
              Category
            </label>
            <input
              type="text"
              className={`form-control ${error?.category ? "is-invalid" : ""}`}
              placeholder="Service Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            />
            {error?.category && <p className="text-danger">{error.category}</p>}
          </div>

          <div className="mb-6">
            <label className="form-label" htmlFor="duration">
              Duration (e.g., 1h 30m)
            </label>
            <input
              type="text"
              className={`form-control ${error?.duration ? "is-invalid" : ""}`}
              placeholder="Service Duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              required
            />
            {error?.duration && <p className="text-danger">{error.duration}</p>}
          </div>

          <div className="mb-6">
            <label className="form-label" htmlFor="price">
              Price (in USD)
            </label>
            <input
              type="number"
              className={`form-control ${error?.price ? "is-invalid" : ""}`}
              placeholder="Service Price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              step="0.01"
            />
            {error?.price && <p className="text-danger">{error.price}</p>}
          </div>

          <div className="mb-6">
            <label className="form-label" htmlFor="description">
              Description
            </label>
            <textarea
              className={`form-control ${
                error?.description ? "is-invalid" : ""
              }`}
              placeholder="Describe the service"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
            {error?.description && (
              <p className="text-danger">{error.description}</p>
            )}
          </div>

          <button
            type="submit"
            className={`btn btn-primary me-3 ${loading ? "disabled" : ""}`}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
          <button
            type="reset"
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

export default AddServiceForm;
