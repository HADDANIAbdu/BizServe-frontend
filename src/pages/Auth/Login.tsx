/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/AuthHook";
import Spinner from "../components/Spinner";
import Alert from "../components/Alert";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated, loading: authLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [error, setError] = useState<any | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false); // Type the password visibility as boolean

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handlePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    try {
      if (!email || !password) {
        setError("Both fields are required.");
        return;
      }
      setError(null);
      setLoading(true);
      
      const response = await login(email, password);

      if (response.status === "error") {
        setError(response.message);
        setShowAlert(true);
        return;
      }

      if (response.status === "success") {
        setSuccess("Login successfully!");
        setShowAlert(true);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      setError("Invalid email or password");
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
        {error && typeof error === "string" && (
          <Alert
            showAlert={showAlert}
            type="danger"
            heading={""}
            text={error}
            onClose={handleCloseAlert}
          />
        )}
      </div>
      <div className="authentication-wrapper authentication-basic d-flex justify-content-center  p-2">
        <div className="authentication-inner card-group ">
          <div className="card px-sm-6 px-0">
            <div className="card-body">
              <h4 className="mb-1">Welcome to BizServe! 👋</h4>
              <p className="mb-6">
                Please sign in to your account and start the adventure
              </p>

              <form
                id="formAuthentication"
                className="mb-6"
                onSubmit={handleSubmit}
              >
                <div className="mb-6">
                  <label htmlFor="email" className="form-label">
                    Email or Username
                  </label>
                  <input
                    type="text"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="Enter your email or username"
                    required
                    autoFocus
                  />
                </div>
                <div className="mb-6 form-password-toggle">
                  <label className="form-label" htmlFor="password">
                    Password
                  </label>
                  <div className="input-group input-group-merge">
                    <input
                      type={passwordVisible ? "text" : "password"}
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      id="password"
                      className="form-control"
                      name="password"
                      placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                      aria-describedby="password"
                      required
                    />
                    <span
                      className="input-group-text cursor-pointer"
                      onClick={handlePasswordVisibility}
                    >
                      <i
                        className={`bx ${
                          passwordVisible ? "bx-show" : "bx-hide"
                        }`}
                      ></i>
                    </span>
                  </div>
                </div>
                <div className="mb-8">
                  <div className="d-flex justify-content-between mt-8">
                    <div className="form-check mb-0 ms-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="remember-me"
                      />
                      <label className="form-check-label" htmlFor="remember-me">
                        Remember Me
                      </label>
                    </div>
                  </div>
                </div>
                <div className="mb-6">
                  <button
                    className="btn btn-primary d-grid w-100"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Logging in..." : "Login"}
                  </button>
                </div>
              </form>

              <p className="text-center">
                <span>New on our platform?</span>
                <Link to="/register">
                  <span> Create an account</span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
