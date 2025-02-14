import React from "react";
import {
  FaUser,
  FaBell,
  FaThLarge,
  FaCalendarAlt,
  FaMoneyCheckAlt,
} from "react-icons/fa";
import { MdContactSupport } from "react-icons/md";

interface Props {
  showSection:
    | "profile"
    | "notifications"
    | "services"
    | "interactions"
    | "schedules"
    | "payments";
  onSectionClick: (
    text:
      | "profile"
      | "notifications"
      | "services"
      | "interactions"
      | "schedules"
      | "payments"
  ) => void;
}
const ProfileNav: React.FC<Props> = ({
  showSection,
  onSectionClick,
}) => {
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="nav-align-top">
          <ul className="nav nav-pills  flex-sm-row mb-6">
            <li className="nav-item">
              <button
                className={`nav-link ${showSection === "profile" && "active"}`}
                onClick={() => onSectionClick("profile")}
                // onClick={onProfileClick}
              >
                <FaUser className="me-2" /> Profile
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${
                  showSection === "notifications" && "active"
                }`}
                onClick={() => onSectionClick("notifications")}
              >
                <FaBell className="me-2" /> Notification
              </button>
            </li>

            <li className="nav-item">
              <button
                className={`nav-link ${
                  showSection === "interactions" && "active"
                }`}
                onClick={() => onSectionClick("interactions")}
              >
                <MdContactSupport className="me-2" /> Interaction
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${showSection === "services" && "active"}`}
                onClick={() => onSectionClick("services")}
              >
                <FaThLarge className="me-2" /> Services
              </button>
            </li>
            {/* <li className="nav-item">
              <button
                className={`nav-link ${
                  showSection === "schedules" && "active"
                }`}
                onClick={onSchedulesClick}
              >
                <FaCalendarAlt className="me-2" /> Schedules
              </button>
            </li> */}
            <li className="nav-item">
              <button
                className={`nav-link ${showSection === "payments" && "active"}`}
                onClick={() => onSectionClick("payments")}
              >
                <FaMoneyCheckAlt className="me-2" /> Payments
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfileNav;
