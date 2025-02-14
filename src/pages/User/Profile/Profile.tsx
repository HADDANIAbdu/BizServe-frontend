import React, { useEffect, useState } from "react";
import { FaLock, FaTimes } from "react-icons/fa";
import avatar from "../../../assets/img/avatars/user.png";
import {
  getUserById,
  UpdateUser,
  updateUser,
  User,
} from "../../../api/UsersService";
import { useParams } from "react-router-dom";
import { Role, getAllRoles } from "../../../api/RolesService";
import Alert from "../../components/Alert";
import Spinner from "../../components/Spinner";

const UserProfile: React.FC = () => {
  const { id: urlId } = useParams<{ id: string }>();
  const [showAlert, setShowAlert] = useState(true);
  const [showSecurity, setShowSecurity] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);
  const [success, setSuccess] = useState<any>(null);
  const [user, setUser] = useState<User | null>(null);
  const [roles, setRoles] = useState<Role[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<Role[]>([]);

  const [formData, setFormData] = useState<UpdateUser>({
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    roles: [],
  });

  useEffect(() => {
    const fetchUserAndRoles = async () => {
      setLoading(true);
      try {
        const response = await getUserById(parseInt(urlId!));
        const roleResponse = await getAllRoles();

        if (response.status === "error") {
          setError(response.errors);
        } else {
          const userData = response.data;
          setUser(userData);
          setFormData({
            username: userData.username,
            email: userData.email,
            password: "",
            passwordConfirmation: "",
            roles: [...userData.roles],
          });
          setSelectedRoles([...userData.roles]);
        }

        if (roleResponse.status === "success") {
          setRoles(roleResponse.data);
        }
      } catch (err: any) {
        console.log("Error fetching user data", err);
        setError(err.message || "An error occurred while fetching the user.");
        setShowAlert(true);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndRoles();
  }, [urlId]);

  const handleEditUser = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.passwordConfirmation) {
      setError({ passwordConfirmation: "Passwords do not match" });
      setShowAlert(true);
      return;
    }

    try {
      formData.password = formData.password || undefined;
      formData.passwordConfirmation =
        formData.passwordConfirmation || undefined;

      const updatedData = { ...formData, roles: selectedRoles };

      const response = await updateUser(parseInt(urlId!), updatedData);

      if (response.status === "success") {
        // Update user state with new data
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        setUser(response.data);
        setSuccess("User updated successfully!");
        setShowAlert(true);
        setSuccess(response.message);
      }
    } catch (err: any) {
      setError("An error occurred while updating the profile.");
      console.log("Error  updating profile");
      console.log(err.message);

      setError(err.message);
    }
  };

  const handleRolesChange = (role: Role) => {
    if (selectedRoles.find((r) => r.id === role.id)) {
      setSelectedRoles(selectedRoles.filter((r) => r.id !== role.id));
    } else {
      setSelectedRoles([...selectedRoles, role]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(null);
    setShowAlert(false);
  };

  const handlePasswordChange = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const newPassword = (
      form.elements.namedItem("newPassword") as HTMLInputElement
    ).value;
    const confirmPassword = (
      form.elements.namedItem("confirmPassword") as HTMLInputElement
    ).value;

    if (newPassword === confirmPassword) {
      console.log("Password change successful.");
      // Implement the logic to update the user's password in your API
    } else {
      console.log("Passwords do not match.");
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const handleShowSecurity = () => {
    setShowSecurity(!showSecurity);
  };

  if (loading) {
    return (
      <>
        <h5 className="text-center pt-5">Loading user info...</h5>
        <Spinner />;
      </>
    );
  }

  // Display error if an error occurred
  if (error) {
    return (
      <Alert
        showAlert={showAlert}
        type="danger"
        heading={"Error:"}
        text={error}
        onClose={() => setShowAlert(false)}
      />
    );
  }

  return (
    <div
      className={
        "row    " +
        `${showSecurity ? "" : "d-flex align-items-center flex-column"}`
      }
    >
      {success && (
        <Alert
          showAlert={showAlert}
          type="success"
          heading="Success"
          text={success || "Updated successfuly"}
          onClose={handleCloseAlert}
        />
      )}
      {/* User Profile Section */}
      <div className={"col-lg-6"}>
        <div className="card mb-3">
          <div className="card-body pt-12">
            <div className="user-avatar-section">
              <div className="d-flex align-items-center flex-column">
                <img
                  className="img-fluid rounded mb-4"
                  src={avatar}
                  height="120"
                  width="120"
                  alt="User avatar"
                />
                <div className="user-info text-center">
                  <div className="mb-4 col-12 ">
                    <input
                      type="text"
                      className={`form-control ${
                        error?.username ? "is-invalid" : ""
                      }`}
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                    />
                    {error?.username && (
                      <p className="text-danger">{error.username}</p>
                    )}
                  </div>

                  <div className="mb-4 col-12 ">
                    <input
                      type="text"
                      className={`form-control ${
                        error?.email ? "is-invalid" : ""
                      }`}
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    {error?.email && (
                      <p className="text-danger">{error.email}</p>
                    )}
                  </div>
                  {!showSecurity && (
                    <button
                      className="btn btn-sm btn-secondary"
                      onClick={handleShowSecurity}
                    >
                      Change password
                    </button>
                  )}
                </div>
              </div>
            </div>
            <h5 className="pb-4 border-bottom mb-4">Roles</h5>
            <div className="info-container">
              {roles.map((role) => (
                <div key={role.id} className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`role-${role.id}`}
                    checked={selectedRoles.some((r) => r.id === role.id)}
                    onChange={() => handleRolesChange(role)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`role-${role.id}`}
                  >
                    {role.name}
                  </label>
                </div>
              ))}
              <div className="d-flex align-items-center flex-column">
                <button
                  className="btn btn-primary mt-4"
                  onClick={handleEditUser}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Password Change Section */}
      {showSecurity && (
        <div className="col-lg-6">
          <div className="card mb-3">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Change Password</h5>
              <button
                className="btn btn-sm btn-secondary"
                onClick={handleShowSecurity}
              >
                <FaTimes />
              </button>
            </div>
            <div className="card-body">
              <form id="formChangePassword" onSubmit={handlePasswordChange}>
                <Alert
                  showAlert={showAlert}
                  type="warning"
                  heading="Ensure that these requirements are met"
                  text="Minimum 8 characters long, uppercase & symbol"
                  onClose={handleCloseAlert}
                />
                <div className="row gx-6">
                  <div className="mb-4 col-12 col-sm-6 form-password-toggle">
                    <label className="form-label" htmlFor="newPassword">
                      New Password
                    </label>
                    <div className="input-group input-group-merge has-validation">
                      <input
                        className="form-control"
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        placeholder="············"
                      />
                      <span className="input-group-text cursor-pointer">
                        <FaLock />
                      </span>
                    </div>
                  </div>

                  <div className="mb-4 col-12 col-sm-6 form-password-toggle">
                    <label className="form-label" htmlFor="confirmPassword">
                      Confirm New Password
                    </label>
                    <div className="input-group input-group-merge has-validation">
                      <input
                        className="form-control"
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="············"
                      />
                      <span className="input-group-text cursor-pointer">
                        <FaLock />
                      </span>
                    </div>
                  </div>
                  <div className="col-12">
                    <button type="submit" className="btn btn-success me-2">
                      Change Password
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
