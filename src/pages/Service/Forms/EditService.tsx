import React, { useEffect, useState } from "react";
import { getServiceById, updateService } from "../../../api/ServicesService";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../../components/Spinner";
import Alert from "../../components/Alert";

const EditServiceForm: React.FC = () => {
  const { id: urlId } = useParams<{ id: string }>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState<boolean>(false);
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
  const navigate = useNavigate();

  useEffect(() => {
    const fetchService = async () => {
      setLoading(true);
      try {
        const response = await getServiceById(parseInt(urlId!));

        if (response.status === "error") {
          setError(response.errors);
          setShowAlert(true);
        }

        const service = response.data;
        setFormData({
          name: service.name,
          category: service.category,
          duration: service.duration,
          price: service.price,
          description: service.description,
        });
      } catch (err) {
        console.log("Error fetching role data", err);
        setError("An error occurred while fetching the role.");
        setShowAlert(true);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [urlId]);

  // Handle form input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError(null);
    setShowAlert(false);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    try {
      const response = await updateService(parseInt(urlId!), formData);

      if (response.status === "error") {
        setError(response.message);
        setShowAlert(true);
        return;
      }

      if (response.status === "success") {
        setSuccess("Role updated successfully!");
        setShowAlert(true);

        // Reset form after submission
        setFormData({
          name: "",
          category: "",
          duration: "",
          price: 0.0,
          description: "",
        });

        setTimeout(() => {
          setShowAlert(false);
          navigate("/manage-services");
        }, 2000);
      }
    } catch (err) {
      setLoading(false);
      console.error("Failed to create service", err);
      setError("An error occurred while creating the service.");
      setShowAlert(true);
    }
  };

  const handleCloseALert = () => {
    setShowAlert(false);
  };

  if (loading) {
    return (
      <>
        <h5 className="text-center p-5">Getting service info...</h5>
        <Spinner />
      </>
    );
  }

  return (
    <div className="container mt-4">
      {success && (
        <Alert
          showAlert={showAlert}
          type="success"
          heading={"Success :"}
          text={success}
          onClose={handleCloseALert}
        />
      )}
      {error && typeof error === "string" && (
        <Alert
          showAlert={showAlert}
          type="danger"
          heading={"Error :"}
          text={error}
          onClose={handleCloseALert}
        />
      )}
      <div className="card p-5">
        <form onSubmit={handleSubmit}>
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
            {error?.name && <p className="invalid-feedback">{error.name}</p>}
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
            {error?.category && (
              <p className="invalid-feedback">{error.category}</p>
            )}
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
            {error?.duration && (
              <p className="invalid-feedback">{error.duration}</p>
            )}
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
            {error?.price && <p className="invalid-feedback">{error.price}</p>}
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
              <p className="invalid-feedback">{error.description}</p>
            )}
          </div>

          <button type="submit" className="btn btn-primary">
            Update Service
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditServiceForm;
