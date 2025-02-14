import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Client, getClientById, updateClient } from "../../../api/Clients";
import Spinner from "../../components/Spinner";
import Alert from "../../components/Alert";

const EditClientForm: React.FC = () => {
  const { id: urlId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [client, setClient] = useState<Client>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [formData, setFormData] = useState<Client>({
    firstname: "",
    lastname: "",
    email: "",
    phone: "+212600000000",
    preference: "",
    password: "",
  });

  useEffect(() => {
    const fetchClient = async () => {
      setLoading(true);
      try {
        const response = await getClientById(parseInt(urlId!));

        if (response.status === "error") {
          setError(response.errors);
          setShowAlert(true);
        }

        const client: Client = response.data.client;
        setClient(client);
        
        setFormData({
          firstname: client.firstname,
          lastname: client.lastname,
          email: client.email,
          phone: client.phone,
          preference: client.preference,
        });
      } catch (err) {
        console.log("Error fetching client data", err);
        setError("An error occurred while fetching the client.");
        setShowAlert(true);
      } finally {
        setLoading(false);
      }
    };

    fetchClient();
  }, [urlId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(null);
    setShowAlert(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    
    window.scrollTo({
      top: 0,
      behavior: "smooth", 
    });

    try {
      console.log(formData);

      const response = await updateClient(parseInt(urlId!), formData);
      if (response.status === "error") {
        setError(response.message);
        setShowAlert(true);
        return;
      }

      

      setSuccess("Client updated successfully!");
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        navigate("/manage-clients");
      }, 2000);
    } catch (err) {
      console.log("Failed to update client", err);
      setError("An error occurred while updating the client.");
      setShowAlert(true);
    }
  };

  const handleCloseALert = () => {
    setShowAlert(false);
  };

  if (loading) {
    return (
      <>
        <h5 className="text-center p-5">Getting client info...</h5>
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
            value={formData.firstname}
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
            value={formData.lastname}
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
            value={formData.email}
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
            value={formData.phone}
            pattern="^\+[1-9]\d{1,14}$"
          />
          {error?.phone && (
            <div className="invalid-feedback">{error.phone}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="preference" className="form-label">
            Preference
          </label>
          <textarea
            className={`form-control ${error?.preference ? "is-invalid" : ""}`}
            id="preference"
            name="preference"
            onChange={handleChange}
            defaultValue={formData.preference}
          />
          {error?.preference && (
            <div className="invalid-feedback">{error.preference}</div>
          )}
        </div>
        {loading ? (
          <button type="submit" className="btn btn-primary disabled">
            Updating Client...
          </button>
        ) : (
          <button type="submit" className="btn btn-primary">
            Update Client
          </button>
        )}
      </form>
    </div>
  );
};

export default EditClientForm;
