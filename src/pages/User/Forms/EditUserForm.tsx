import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserById, UpdateUser, updateUser } from "../../../api/UsersService";
import { Role, getAllRoles } from "../../../api/RolesService";
import Spinner from "../../components/Spinner";
import Alert from "../../components/Alert";

const EditUserForm: React.FC = () => {
  const { id: urlId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [roles, setRoles] = useState<Role[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [formData, setFormData] = useState<UpdateUser>({
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    roles: [],
  });

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const roleResponse = await getAllRoles();

        if (roleResponse.status === "error") {
          setError(roleResponse.message);
          setShowAlert(true);
        }
        if (roleResponse.status === "success") {
          setRoles(roleResponse.data);
        }

        const response = await getUserById(parseInt(urlId!));

        if (response.status === "error") {
          setError(response.errors);
          setShowAlert(true);
        }

        const user = response.data;
        setSelectedRoles(user.roles);
        setFormData({
          username: user.username,
          email: user.email,
          password: "",
          passwordConfirmation: "",
          roles: [...user.roles],
        });
      } catch (err) {
        console.log("Error fetching user data", err);
        setError("An error occurred while fetching the user.");
        setShowAlert(true);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [urlId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(null);
    setShowAlert(false);
  };

  const handleRolesChange = (role: Role) => {
    // role already selected and need to be removed
    setError(null);
    setShowAlert(false);

    if (
      selectedRoles.find(
        (selectedRole) =>
          selectedRole.id === role.id && selectedRole.name === role.name
      ) !== undefined
    ) {
      setSelectedRoles(
        selectedRoles.filter((filtredRole) => filtredRole.id !== role.id)
      ); // Uncheck role
    } else {
      setSelectedRoles([...selectedRoles, role]); // Check role
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    if (formData.password !== formData.passwordConfirmation) {
      setError({ passwordConfirmation: "Passwords do not match" });
      setShowAlert(true);
      return;
    }

    try {
      const updatedData = {
        ...formData,
        roles: selectedRoles,
      };

      console.log(updatedData);

      const response = await updateUser(parseInt(urlId!), updatedData);
      if (response.status === "error") {
        setError(response.message);
        setShowAlert(true);
        return;
      }

      setSuccess("User updated successfully!");
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        navigate("/manage-users");
      }, 2000);
    } catch (err) {
      console.log("Failed to update user", err);
      setError("An error occurred while updating the user.");
      setShowAlert(true);
    }
  };

  const handleCloseALert = () => {
    setShowAlert(false);
  };

  if (loading) {
    return (
      <>
        <h5 className="text-center p-5">Getting user info...</h5>
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
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Name
            </label>
            <input
              type="text"
              className={`form-control ${error?.username ? "is-invalid" : ""}`}
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            {error?.username && (
              <div className="invalid-feedback">{error.username}</div>
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
              value={formData.password}
              onChange={handleChange}
            />
            {error?.password && (
              <div className="invalid-feedback">{error.password}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="passwordConfirmation" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className={`form-control ${
                error?.passwordConfirmation ? "is-invalid" : ""
              }`}
              id="passwordConfirmation"
              name="passwordConfirmation"
              value={formData.passwordConfirmation}
              onChange={handleChange}
            />
            {error?.passwordConfirmation && (
              <div className="invalid-feedback">
                {error.passwordConfirmation}
              </div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">Roles</label>
            {roles.map((role: Role) => (
              <div key={role.id} className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id={`role-${role.id}`}
                  value={role.name}
                  checked={
                    selectedRoles.find(
                      (selectedRole) =>
                        selectedRole.id === role.id &&
                        selectedRole.name === role.name
                    ) !== undefined
                  }
                  onChange={() => handleRolesChange(role)}
                />
                <label htmlFor={`role-${role.id}`} className="form-check-label">
                  {role.name}
                </label>
              </div>
            ))}
            {error?.roles && <div className="text-danger">{error.roles}</div>}
          </div>
          <button type="submit" className="btn btn-success me-auto ms-auto">
            Update User
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditUserForm;
