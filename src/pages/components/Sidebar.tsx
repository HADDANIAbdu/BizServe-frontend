import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/img/icons/unicons/chart.png";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaCalendarAlt, FaThLarge } from "react-icons/fa";
import { BsPeople } from "react-icons/bs";
import { IoIosArrowDropleft } from "react-icons/io";
import "./Sidebar.module.css";

// Accept isOpen prop to manage sidebar visibility
interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void; // Optional for a toggle button inside Sidebar
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const location = useLocation();
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    dashboards: false,
    users: false,
    roles: false,
    clients: false,
    services: false,
    schedules: false,
  });

  const toggleSection = (section: string) => {
    setOpenSections((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  const isActiveLink = (path: string) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <aside
      id="layout-menu"
      style={{ cursor: 'pointer' }}
      className={` menu-vertical menu  bg-primary ${
        isOpen ? "open" : "d-none"
      }`}
    >
      <div className="app-brand demo ">
        <Link to="/" className="app-brand-link">
          <img
            src={logo}
            alt="Logo"
            className="w-px-40 h-auto rounded-circle"
          />
          <span className="app-brand-text demo menu-text fw-bold ms-2">
            BizServe
          </span>
        </Link>
        <button
          className="nav-item nav-link px-0 me-xl-6 d-flex p-lg-5"
          onClick={onToggle}
        >
          <IoIosArrowDropleft size={30} className="text-white" />
        </button>
      </div>
      <div className="menu-inner-shadow"></div>
      <ul className="menu-inner py-1">
        {/* Dashboards */}
        <li
          className={`menu-item ${
            openSections.dashboards ? "active open " : ""
          }`}
        >
          <div
            className="menu-link menu-toggle  rounded"
            onClick={() => toggleSection("dashboards")}
          >
            <i className="menu-icon tf-icons bx bx-home-smile"></i>
            <div className="text-truncate">Dashboards</div>
          </div>
          <ul className={`menu-sub ${openSections.dashboards ? "show" : ""}`}>
            <li className={`menu-item ${isActiveLink("/")}`}>
              <Link to="/" className="menu-link">
                <div className="text-truncate">Home</div>
              </Link>
            </li>
            <li className={`menu-item ${isActiveLink("/analytics")}`}>
              {/* <Link to="/analytics" className="menu-link">
                <div className="text-truncate">Analytics</div>
              </Link> */}
            </li>
          </ul>
        </li>

        {/* Users */}
        <li className={`menu-item ${openSections.users ? "active open" : ""}`}>
          <div
            className="menu-link menu-toggle"
            onClick={() => toggleSection("users")}
          >
            <i className="menu-icon tf-icons bx bx-user"></i>
            <div className="text-truncate">Users</div>
          </div>
          <ul className={`menu-sub ${openSections.users ? "show" : ""}`}>
            <li className={`menu-item ${isActiveLink("/manage-users")}`}>
              <Link to="/manage-users" className="menu-link">
                <div className="text-truncate">User List</div>
              </Link>
            </li>
            <li
              className={`menu-item ${isActiveLink("/manage-users/deleted")}`}
            >
              <Link to="/manage-users/deleted" className="menu-link">
                <div className="text-truncate">Deleted Users</div>
              </Link>
            </li>

            {/* Roles */}
            <li
              className={`menu-item no-bullet unstyled ${
                openSections.roles ? "active open" : ""
              }`}
            >
              <div
                className="menu-link menu-toggle"
                onClick={() => toggleSection("roles")}
              >
                <FaPeopleGroup className="m-lg-2" />
                <div className="text-truncate">Roles</div>
              </div>
              <ul className={`menu-sub ${openSections.roles ? "show" : ""}`}>
                <li className={`menu-item ${isActiveLink("/manage-roles")}`}>
                  <Link to="/manage-roles" className="menu-link">
                    <div className="text-truncate">Role List</div>
                  </Link>
                </li>
                <li
                  className={`menu-item ${isActiveLink(
                    "/manage-roles/deleted"
                  )}`}
                >
                  <Link to="/manage-roles/deleted" className="menu-link">
                    <div className="text-truncate">Deleted Roles</div>
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </li>

        {/* Clients */}
        <li
          className={`menu-item ${openSections.clients ? "active open" : ""}`}
        >
          <div
            className="menu-link menu-toggle"
            onClick={() => toggleSection("clients")}
          >
            <BsPeople className="menu-icon tf-icons" />
            <div className="text-truncate">Clients</div>
          </div>
          <ul className={`menu-sub ${openSections.clients ? "show" : ""}`}>
            <li className={`menu-item ${isActiveLink("/manage-clients")}`}>
              <Link to="/manage-clients" className="menu-link">
                <div className="text-truncate">Client List</div>
              </Link>
            </li>
            <li
              className={`menu-item ${isActiveLink("/manage-clients/deleted")}`}
            >
              <Link to="/manage-clients/deleted" className="menu-link">
                <div className="text-truncate">Deleted Clients</div>
              </Link>
            </li>
          </ul>
        </li>

        {/* Services */}
        <li
          className={`menu-item ${openSections.services ? "active open" : ""}`}
        >
          <div
            className="menu-link menu-toggle"
            onClick={() => toggleSection("services")}
          >
            <FaThLarge className="menu-icon tf-icons" />
            <div className="text-truncate">Services</div>
          </div>
          <ul className={`menu-sub ${openSections.services ? "show" : ""}`}>
            <li className={`menu-item ${isActiveLink("/manage-services")}`}>
              <Link to="/manage-services" className="menu-link">
                <div className="text-truncate">Service List</div>
              </Link>
            </li>
            <li
              className={`menu-item ${isActiveLink(
                "/manage-services/deleted"
              )}`}
            >
              <Link to="/manage-services/deleted" className="menu-link">
                <div className="text-truncate">Deleted Services</div>
              </Link>
            </li>
          </ul>
        </li>

        {/* Schedules */}
        <li
          className={`menu-item ${openSections.schedules ? "active open" : ""}`}
        >
          <div
            className="menu-link menu-toggle"
            onClick={() => toggleSection("schedules")}
          >
            <FaCalendarAlt className="menu-icon tf-icons" />
            <div className="text-truncate">Schedules</div>
          </div>
          <ul className={`menu-sub ${openSections.schedules ? "show" : ""}`}>
            <li className={`menu-item ${isActiveLink("/manage-schedules")}`}>
              <Link to="/manage-schedules" className="menu-link">
                <div className="text-truncate">Schedule Calendar</div>
              </Link>
            </li>
            <li
              className={`menu-item ${isActiveLink(
                "/manage-payment-schedules"
              )}`}
            >
              {/* <Link to="/manage-payment-schedules" className="menu-link">
                <div className="text-truncate">Payment Schedules</div>
              </Link> */}
            </li>
          </ul>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
