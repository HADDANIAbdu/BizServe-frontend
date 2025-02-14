import React, { useEffect, useState } from "react";
import { getAllRoles, Role } from "../../../api/RolesService";
import { createNewUser, CreateUser, User } from "../../../api/UsersService";
import Alert from "../../components/Alert";

interface Props {
  users: User[];
  onClose: () => void;
}

const AddUserForm: React.FC<Props> = ({ users, onClose }) => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<Role[]>([]);
  const [error, setError] = useState<any | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [formData, setFormData] = useState<CreateUser>({
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    roles: [],
  });

  useEffect(() => {
    const fetchRoles = async () => {
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
      } catch (err) {
        console.log("Error fetching roles", err);
        setError("An error occurred while fetching roles.");
        setShowAlert(true);
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(null); // Clear any errors when changing input
    setShowAlert(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    // Validate password match
    if (formData.password !== formData.passwordConfirmation) {
      setError({ passwordConfirmation: "Passwords do not match" });
      setShowAlert(true);

      return;
    }

    // Validate roles are selected
    if (selectedRoles.length === 0) {
      setError({ roles: "Please select at least one role." });
      setShowAlert(true);

      return;
    }

    // Add selected roles to formData
    const updatedFormData = {
      ...formData,
      roles: selectedRoles,
    };

    try {
      setLoading(true);
      console.log(updatedFormData);
      const response = await createNewUser(updatedFormData);

      if (response.status === "success") {
        setSuccess("User created successfully!");
        setShowAlert(true);
        const userCreated: User = response.data;
        users.push(userCreated);
        setFormData({
          username: "",
          email: "",
          password: "",
          passwordConfirmation: "",
          roles: [],
        });

        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        // close the form
        setTimeout(() => {
          onClose();
        }, 2000);
      }
    } catch (err: any) {
      setError("An error occurred while creating the profile.");
      console.log("Error creating profile");
      console.log(err);

      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRolesChange = (role: Role) => {
    setError(null);
    setShowAlert(false);

    if (selectedRoles.find((selectedRole) => selectedRole.id === role.id)) {
      setSelectedRoles(
        selectedRoles.filter((filteredRole) => filteredRole.id !== role.id)
      ); // Uncheck role
    } else {
      setSelectedRoles([...selectedRoles, role]); // Check role
    }
  };

  const handleCloseALert = () => {
    setShowAlert(false);
  };

  return (
    <div
      className="offcanvas offcanvas-end show"
      tabIndex={-1}
      id="offcanvasAddUser"
    >
      <div className="offcanvas-header border-bottom">
        <h5 id="offcanvasAddUserLabel" className="offcanvas-title">
          Add User
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
          id="addNewUserForm"
        >
          <div className="mb-6">
            <label className="form-label" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              className={`form-control ${error?.username ? "is-invalid" : ""}`}
              placeholder="John Doe"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            {error?.username && <p className="text-danger">{error.username}</p>}
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
            />
            {error?.email && <p className="text-danger">{error.email}</p>}
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
              required
            />
            {error?.password && <p className="text-danger">{error.password}</p>}
          </div>

          <div className="mb-6">
            <label className="form-label" htmlFor="passwordConfirmation">
              Password Confirmation
            </label>
            <input
              type="password"
              className={`form-control ${
                error?.passwordConfirmation ? "is-invalid" : ""
              }`}
              name="passwordConfirmation"
              value={formData.passwordConfirmation}
              onChange={handleChange}
              required
            />
            {error?.passwordConfirmation && (
              <p className="text-danger">{error.passwordConfirmation}</p>
            )}
          </div>

          <div className="mb-6">
            <label className="form-label" htmlFor="roles">
              User Roles
            </label>
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
                  onChange={() => {
                    handleRolesChange(role);
                  }}
                />
                <label htmlFor={`role-${role.id}`} className="form-check-label">
                  {role.name}
                </label>
              </div>
            ))}
            {error?.roles && <p className="text-danger">{error.roles}</p>}
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

export default AddUserForm;
