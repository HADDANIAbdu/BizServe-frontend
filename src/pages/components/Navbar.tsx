import { FaPowerOff, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import avatar from "../../assets/img/avatars/user.png";
import { BiSearch } from "react-icons/bi";
import { User } from "../../api/UsersService";
import { useState } from "react";

interface Props {
  user: User;
  isSidebarOpen: boolean;
  onToggle: () => void;
  onLogout: () => void;
}

const Navbar = ({ user, isSidebarOpen, onLogout, onToggle }: Props) => {
  const [searchQuery, setSearchQuery] = useState(""); // Track search input

  return (
    <nav
      className="layout-navbar navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
      id="layout-navbar"
    >
      <div
        className={`navbar-nav align-items-xl-center me-4 me-xl-0 ${
          isSidebarOpen ? "d-none" : ""
        }`}
      >
        <button
          className="nav-item nav-link px-0 me-xl-6"
          onClick={onToggle}
          aria-label="Toggle Sidebar"
        >
          <i className="bx bx-menu bx-md"></i>
        </button>
      </div>

      {/* Search Bar */}
      <div
        className="navbar-nav-right d-flex align-items-center"
        id="navbar-collapse"
      >
        <div className="navbar-nav align-items-center">
          <div className="nav-item navbar-search-wrapper mb-0">
            <div
              className="nav-item nav-link d-flex align-content-center px-0"
              style={{ position: "relative" }} // Set relative position for the wrapper
            >
              <BiSearch
                style={{ fontSize: "2rem", alignSelf: "center" }}
                aria-label="Search"
              />
              <input
                type="text"
                className="form-control search-input border-0 tt-input ms-4"
                placeholder="Search..."
                autoComplete="off"
                spellCheck="false"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} // Update state
              />
              {/* Conditionally show the "Still working on it" popup */}
              {searchQuery && (
                <div
                  className="search-popup"
                  style={{
                    position: "absolute",
                    top: "100%", // Position it below the input
                    left: "0",
                    zIndex: 999,
                    background: "#fff",
                    border: "1px solid #ccc",
                    padding: "10px",
                    borderRadius: "5px",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                    width: "100%", // Match width to the input
                  }}
                >
                  Still working on it...
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right side: User Profile Dropdown */}
        <ul className="navbar-nav flex-row align-items-center ms-auto">
          <li className="nav-item navbar-dropdown dropdown-user dropdown">
            <a
              className="nav-link dropdown-toggle hide-arrow p-0"
              href="#"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <div className="avatar avatar-online">
                <img
                  src={avatar}
                  alt="User Avatar"
                  className="w-px-40 h-auto rounded-circle"
                />
              </div>
            </a>
            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <a className="dropdown-item" href="#">
                  <div className="d-flex">
                    <div className="flex-shrink-0 me-3">
                      <div className="avatar avatar-online">
                        <img
                          src={avatar}
                          alt="User Avatar"
                          className="w-px-40 h-auto rounded-circle"
                        />
                      </div>
                    </div>
                    <div className="flex-grow-1">
                      <h6 className="mb-0">
                        {user?.username || "Unknown User"}
                      </h6>
                      <small className="text-muted">
                        {user?.roles?.map((role) => role.name).join(", ") ||
                          "No Roles"}
                      </small>
                    </div>
                  </div>
                </a>
              </li>
              <li>
                <div className="dropdown-divider my-1"></div>
              </li>
              <li>
                <Link
                  className="dropdown-item d-flex align-items-center text-primary"
                  to="/profile"
                >
                  <FaUser className="me-3" />
                  <span>My Profile</span>
                </Link>
              </li>
              <li>
                <div className="dropdown-divider my-1"></div>
              </li>
              <li>
                <button
                  className="dropdown-item d-flex align-items-center text-danger"
                  onClick={onLogout}
                  aria-label="Log Out"
                >
                  <FaPowerOff className="me-3" />
                  <span>Log Out</span>
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
