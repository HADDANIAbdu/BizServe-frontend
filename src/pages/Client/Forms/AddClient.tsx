import React, { useState } from "react";
import { Client, createNewClient } from "../../../api/Clients";
import Alert from "../../components/Alert";

interface Props {
  clients: Client[];
  onClose: () => void;
}

const AddClientForm: React.FC<Props> = ({ clients, onClose }) => {
  const [error, setError] = useState<any | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [formData, setFormData] = useState<any>({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    preference: "",
    password: "",
    passwordConfiramation: "",
  });

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      console.log(formData);
      const response = await createNewClient(formData);
      setLoading(false);

      if (response.status === "error") {
        setError(response.message);
        setShowAlert(true);
        return;
      }
      if (response.status === "success") {
        setSuccess("Client created successfully!");
        clients.push(formData);
        setShowAlert(true);
        setFormData({
          firstname: "",
          lastname: "",
          email: "",
          phone: "",
          preference: "",
          password: "",
          passwordConfiramation: "",
        });
        setTimeout(() => {
          // close the form
          onClose();
        }, 2000);
      }
    } catch (err) {
      console.log("Failed to create client", err);
      setError("An error occurred while creating the client.");
      setShowAlert(true);
    }
  };

  const handleCloseALert = () => {
    setShowAlert(false);
  };

  if (error) {
    console.log(error);
  }

  return (
    <div
      className="offcanvas offcanvas-end show"
      tabIndex={-1}
      id="offcanvasAddUser"
    >
      <div className="offcanvas-header border-bottom">
        <h5 id="offcanvasAddUserLabel" className="offcanvas-title">
          Add Client
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
            onClose={handleCloseALert}
          />
        )}
        {error && typeof error === "string" && (
          <Alert
            showAlert={showAlert}
            type="danger"
            heading={"Client Creation"}
            text={error}
            onClose={handleCloseALert}
          />
        )}
        <form
          onSubmit={handleSubmit}
          className="add-new-user"
          id="addNewClientForm"
        >
          <div className="mb-3">
            <label className="form-label" htmlFor="firstname">
              Firstname
            </label>
            <input
              type="text"
              className={`form-control ${error?.firstname ? "is-invalid" : ""}`}
              placeholder="John"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              required
            />
            {error?.firstname && (
              <p className="text-danger">{error.firstname}</p>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="lastname">
              Lastname
            </label>
            <input
              type="text"
              className={`form-control ${error?.lastname ? "is-invalid" : ""}`}
              placeholder="Doe"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              required
            />
            {error?.lastname && <p className="text-danger">{error.lastname}</p>}
          </div>

          <div className="mb-6">
            <label className="form-label" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              className={`form-control ${error?.email ? "is-invalid" : ""}`}
              placeholder="john.doe@example.com"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />{" "}
            {error?.email && <p className="text-danger">{error.email}</p>}
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="phone">
              Phone
            </label>
            <input
              type="text"
              className={`form-control ${error?.phone ? "is-invalid" : ""}`}
              placeholder="+212..."
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
            {error?.phone && <p className="text-danger">{error.phone}</p>}
          </div>

          <div className="mb-6">
            <label htmlFor="preference" className="form-label">
              preference
            </label>
            <textarea
              className={`form-control ${
                error?.preference ? "is-invalid" : ""
              }`}
              name="preference"
              value={formData.preference}
              onChange={handleChange}
            />
            {error?.preference && (
              <div className="invalid-feedback">{error.preference}</div>
            )}
          </div>
          <div className="mb-6">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              className={`form-control ${error?.password ? "is-invalid" : ""}`}
              name="password"
              value={formData.password}
              onChange={handleChange}
            />{" "}
            {error?.password && <p className="text-danger">{error.password}</p>}
          </div>
          <div className="mb-6">
            <label className="form-label" htmlFor="passwordConfirmation">
              Password Confirmation
            </label>
            <input
              type="password"
              className={`form-control ${
                error?.password_confirmation ? "is-invalid" : ""
              }`}
              name="passwordConfiramation"
              value={formData.passwordConfirmation}
              onChange={handleChange}
            />
            {error?.password_confirmation && (
              <p className="text-danger">{error.password_confirmation}</p>
            )}
          </div>
          <button
            type="submit"
            className={`btn btn-primary me-3 ${loading ? "disabled" : ""}`}
          >
            Submit
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

export default AddClientForm;
