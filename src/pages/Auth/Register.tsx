/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/AuthHook";
import Spinner from "../components/Spinner";
import Alert from "../components/Alert";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const {
    register: regitserAuth,
    isAuthenticated,
    loading: authLoading,
  } = useAuth();
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [ErrorFields, setErrorFields] = useState<any | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    if (
      !credentials.name ||
      !credentials.email ||
      !credentials.password ||
      !credentials.passwordConfirmation
    ) {
      setError("All fields are required.");
      setShowAlert(true);
      return;
    }
    setError(null);
    setLoading(true);

    try {
      const response = await regitserAuth(
        credentials.name,
        credentials.email,
        credentials.password,
        credentials.passwordConfirmation
      );
      if (response.data.status === "error") {
        setError("Registration Failed !")
        setErrorFields(response.data.message);
        setShowAlert(true);
        return;
      }

      if (response.status === "success") {
        setSuccess("Registration successful !");
        setShowAlert(true);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (err) {
      setError("Registration failed. Please try again.");
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  if (authLoading) {
    return <Spinner />;
  }

  return (
    <div className="container  my-5">
      <div style={{ width: '40%', margin: '0 auto' }}>
        {success && (
          <Alert
            showAlert={showAlert}
            type="success"
            heading={"Success"}
            text={success}
            onClose={handleCloseAlert}
          />
        )}
        {error && (
          <Alert
            showAlert={showAlert}
            type="danger"
            heading={""}
            text={error}
            onClose={handleCloseAlert}
          />
        )}
      </div>
      <div className="authentication-wrapper authentication-basic d-flex justify-content-center p-2">
        <div className="authentication-inner card-group">
          <div className="card px-sm-6 px-0">
            <div className="card-body">
              <h4 className="mb-1">Join BizServe! 🚀</h4>
              <p className="mb-6">
                Create your account and start your journey with us
              </p>

              <form
                id="formRegistration"
                className="mb-6"
                onSubmit={handleSubmit}
              >
                <div className="mb-6">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    value={credentials.name}
                    onChange={(event) =>
                      setCredentials({
                        ...credentials,
                        name: event.target.value,
                      })
                    }
                    className={`form-control ${
                      error?.username ? "is-invalid" : ""
                    }`}
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                    required
                  />
                  <span>
                    {ErrorFields?.username && (
                      <p className="mt-2 text-danger">{ErrorFields.username}</p>
                    )}
                  </span>
                </div>

                <div className="mb-6">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    value={credentials.email}
                    onChange={(event) =>
                      setCredentials({
                        ...credentials,
                        email: event.target.value,
                      })
                    }
                    className={`form-control ${
                      error?.email ? "is-invalid" : ""
                    }`}
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    required
                  />
                  <span>
                    {ErrorFields?.email && <p className="mt-2 text-danger">{ErrorFields?.email}</p>}
                  </span>
                </div>

                <div className="mb-6 form-password-toggle">
                  <label className="form-label" htmlFor="password">
                    Password
                  </label>
                  <input
                    type="password"
                    value={credentials.password}
                    onChange={(event) =>
                      setCredentials({
                        ...credentials,
                        password: event.target.value,
                      })
                    }
                    id="password"
                    className={`form-control ${
                      error?.password ? "is-invalid" : ""
                    }`}
                    name="password"
                    placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                    required
                  />
                  <span>
                    {ErrorFields?.password && (
                      <p className="mt-2 text-danger">{ErrorFields?.password.find((err: string | string[]) => err.includes("8"))}</p>
                    )}
                  </span>
                </div>

                <div className="mb-6 form-password-toggle">
                  <label className="form-label" htmlFor="passwordConfirmation">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    value={credentials.passwordConfirmation}
                    onChange={(event) =>
                      setCredentials({
                        ...credentials,
                        passwordConfirmation: event.target.value,
                      })
                    }
                    id="passwordConfirmation"
                    className="form-control"
                    name="passwordConfirmation"
                    placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                    required
                  />
                  <span>
                    {ErrorFields?.password && (
                      <p className="mt-2 text-danger">{ErrorFields?.password.find((err: string | string[]) => err.includes("confirmation"))}</p>
                    )}
                  </span>
                </div>

                <div className="mb-6">
                  <button
                    className="btn btn-primary d-grid w-100"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Registering..." : "Register"}
                  </button>
                </div>
              </form>

              <p className="text-center">
                <span>Already have an account?</span>
                <Link to="/login">
                  <span> Sign in instead</span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
