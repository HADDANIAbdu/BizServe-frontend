import React, { useEffect, useState } from "react";
import { FaLock, FaTimes } from "react-icons/fa";
import avatar from "../../assets/img/avatars/user.png";
import Alert from "../components/Alert";
import Spinner from "../components/Spinner";
import { me } from "../../api/AuthService";
import { updateUser, UpdateUser, User } from "../../api/UsersService";

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<User>();
  const [formData, setFormData] = useState<UpdateUser>({
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });
  const [showEditProfile, setShowEditProfile] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState(true);
  const [showChangePassword, setShowChangePassword] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any | null>(null);
  const [success, setSuccess] = useState<any | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await me();

        if (response.status === "success") {
          setUser(response.data);
          setFormData({
            username: response.data.username,
            email: response.data.email,
            password: "",
            passwordConfirmation: "",
          });
          setShowAlert(true);
          setShowChangePassword(true);
        }
      } catch (err) {
        console.log("Error fetching user data", err);
        setError("An error occurred while fetching the user.");
        setShowAlert(true);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleEditProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Prepare the data to send to the API
      const updateData: UpdateUser = {
        username: formData.username || undefined,
        email: formData.email || undefined,
        password: formData.password || undefined,
        passwordConfirmation: formData.passwordConfirmation || undefined,
      };

      // Check if user exists before making the API call
      if (user) {
        const response = await updateUser(user.id, updateData);
        if (response.status === "success") {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
          setUser(response.data);
          setSuccess(response.message);
          setError(null);
        }
      }
    } catch (err: any) {
      setError("An error occurred while updating the profile.");
      console.log("Error  updating profile");
      console.log(err.message);

      setError(err.message || "Error  updating profile");
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const handleShowChangePassword = () => {
    formData.password = "";
    formData.passwordConfirmation = "";
    setShowChangePassword(!showChangePassword);
  };

  const handleShowEditProfileForm = () => {
    setShowEditProfile(!showEditProfile);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  if (loading) {
    return (
      <>
        <h5 className="text-center pt-5">Loading user info...</h5>
        <Spinner />;
      </>
    );
  }
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="row">
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
        <div
          className={`${
            showChangePassword || showEditProfile ? "col-lg-6" : "col-lg-12"
          }`}
        >
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
                    <h5>{user?.username}</h5>
                    <span className="badge bg-label-secondary">
                      {user?.roles &&
                        user?.roles.map((role) => role.name).join(", ")}
                    </span>
                  </div>
                </div>
              </div>
              <h5 className="pb-4 border-bottom mb-4">Details</h5>
              <div className="info-container">
                <ul className="list-unstyled mb-6">
                  <li className="mb-2">
                    <span className="h6">Username:</span>{" "}
                    <span>{user?.username}</span>
                  </li>
                  <li className="mb-2">
                    <span className="h6">Email:</span>{" "}
                    <span>{user?.email}</span>
                  </li>
                  <li className="mb-2">
                    <span className="h6">Roles:</span>{" "}
                    <span>
                      {user?.roles &&
                        user?.roles.map((role) => role.name).join(", ")}
                    </span>
                  </li>
                </ul>
                <div className="d-flex justify-content-center">
                  <button
                    className={`btn btn-outline-primary me-4 ${
                      showEditProfile && "d-none"
                    }`}
                    onClick={handleShowEditProfileForm}
                  >
                    Edit
                  </button>
                  <button
                    className={`btn btn-outline-primary me-4 ${
                      showChangePassword && "d-none"
                    }`}
                    onClick={handleShowChangePassword}
                  >
                    Change Password
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          {/* Profile Change Section */}
          {showEditProfile && (
            <div className="card mb-3">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Edit Profile</h5>
                <button
                  className="btn btn-sm btn-secondary"
                  onClick={handleShowEditProfileForm}
                >
                  <FaTimes />
                </button>
              </div>
              <div className="card-body">
                <form onSubmit={handleEditProfile}>
                  <div className="row gx-6">
                    <div className="mb-4 col-12 ">
                      <label className="form-label" htmlFor="username">
                        Username
                      </label>
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
                      <label className="form-label" htmlFor="email">
                        Email
                      </label>
                      <input
                        type="email"
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

                    <div className="col-12">
                      <button type="submit" className="btn btn-success me-2">
                        Save Changes
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}
          {/* Password Change Section */}
          {showChangePassword && (
            <div className="card mb-3">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Change Password</h5>
                <button
                  className="btn btn-sm btn-secondary"
                  onClick={handleShowChangePassword}
                >
                  <FaTimes />
                </button>
              </div>
              <div className="card-body">
                <form id="formChangePassword" onSubmit={handleEditProfile}>
                  <Alert
                    showAlert={showAlert}
                    type="warning"
                    heading="Ensure that these requirements are met"
                    text="Minimum 8 characters long, uppercase & symbol"
                    onClose={handleCloseAlert}
                  />
                  {/* {error && (
                    <Alert
                      showAlert={showAlert}
                      type="danger"
                      heading="Error while changing Password "
                      text={error.password}
                      onClose={handleCloseAlert}
                    />
                  )} */}
                  <div className="row gx-6">
                    <div className="mb-4 col-12 col-sm-12 form-password-toggle">
                      <label className="form-label" htmlFor="password">
                        New Password
                      </label>
                      <div className="input-group input-group-merge has-validation">
                        <input
                          className={`form-control ${
                            error?.password ? "is-invalid" : ""
                          }`}
                          type="password"
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                        />

                        <span className="input-group-text cursor-pointer">
                          <FaLock />
                        </span>
                      </div>
                      {error?.password && error?.password[0] && (
                        <p className="text-danger">{error.password[0]}</p>
                      )}
                    </div>

                    <div className="mb-4 col-12 col-sm-12 form-password-toggle">
                      <label
                        className="form-label"
                        htmlFor="passwordConfirmation"
                      >
                        Confirm New Password
                      </label>
                      <div className="input-group input-group-merge has-validation">
                        <input
                          className={`form-control ${
                            error?.password ? "is-invalid" : ""
                          }`}
                          type="password"
                          id="passwordConfirmation"
                          name="passwordConfirmation"
                          value={formData.passwordConfirmation}
                          onChange={handleChange}
                        />

                        <span className="input-group-text cursor-pointer">
                          <FaLock />
                        </span>
                      </div>
                      {error?.password && error?.password[1] && (
                        <p className="text-danger">{error.password[1]}</p>
                      )}
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
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
