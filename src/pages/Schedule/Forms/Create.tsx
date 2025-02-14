import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Client, createNewClient } from "../../../api/Clients";

const CreateClientForm: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<any | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<Client>({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    preference: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(null); // Clear any errors when changing input
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await createNewClient(formData);
      setLoading(false);

      if (response.status === "error") {
        setError(response.errors);
        return;
      }
      if (response.status === "success") {
        setSuccess("Client created successfully!");
        setFormData({
          firstname: "",
          lastname: "",
          email: "",
          phone: "",
          preference: "",
          password: "",
        });
        setTimeout(() => {
          navigate("/manage-clients");
        }, 2000);
      }
    } catch (err) {
      console.log("Failed to create client", err);
      setError("An error occurred while creating the client.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Create New Client</h2>
      {success && <p className="text-success">{success}</p>}
      {error && typeof error === "string" && (
        <p className="text-danger">{error}</p>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="firstname" className="form-label">
            Firstname
          </label>
          <input
            type="text"
            className={`form-control ${error?.firstname ? "is-invalid" : ""}`}
            id="firstname"
            name="firstname"
            onChange={handleChange}
            required
          />
          {error?.firstname && (
            <div className="invalid-feedback">{error.firstname}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="lastname" className="form-label">
            Lastname
          </label>
          <input
            type="text"
            className={`form-control ${error?.lastname ? "is-invalid" : ""}`}
            id="lastname"
            name="lastname"
            onChange={handleChange}
            required
          />
          {error?.lastname && (
            <div className="invalid-feedback">{error.lastname}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className={`form-control ${error?.email ? "is-invalid" : ""}`}
            id="email"
            name="email"
            onChange={handleChange}
            required
          />
          {error?.email && (
            <div className="invalid-feedback">{error.email}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className={`form-control ${error?.password ? "is-invalid" : ""}`}
            id="password"
            name="password"
            onChange={handleChange}
            required
          />
          {error?.password && (
            <div className="invalid-feedback">{error.password}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone
          </label>
          <input
            type="tel"
            className={`form-control ${error?.phone ? "is-invalid" : ""}`}
            id="phone"
            name="phone"
            onChange={handleChange}
            placeholder="Enter phone number"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          />
          {error?.phone && (
            <div className="invalid-feedback">{error.phone}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="preference" className="form-label">
            preference
          </label>
          <textarea
            className={`form-control ${error?.preference ? "is-invalid" : ""}`}
            id="preference"
            name="preference"
          />
          {error?.preference && (
            <div className="invalid-feedback">{error.preference}</div>
          )}
        </div>
        {loading ? (
          <button type="submit" className="btn btn-primary disabled">
            Creating User...
          </button>
        ) : (
          <button type="submit" className="btn btn-primary">
            Create User
          </button>
        )}
      </form>
    </div>
  );
};

export default CreateClientForm;
