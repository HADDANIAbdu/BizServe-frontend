import React from "react";
import { FaCalendarAlt, FaMoneyBillAlt } from "react-icons/fa";
import { FaBell, FaCheck } from "react-icons/fa6";

interface Props {
  enrolledServices: number;
  notifications: number;
  payments: number;
  schedules: number;
}
const ProfileOverview: React.FC<Props> = ({
  enrolledServices,
  notifications,
  payments,
  schedules,
}) => {
  return (
    <div className="card mb-6">
      <div className="card-body">
        <small className="card-text text-uppercase text-muted small">Overview</small>
        <ul className="list-unstyled mb-0 mt-3 pt-1">
          <li className="d-flex align-items-center mb-4">
            <FaBell className="me-2" /> 
            <span className="fw-medium mx-2">Notifications</span>
            <span>{notifications}</span>
          </li>
          <li className="d-flex align-items-center mb-4">
            <FaCheck className="me-2" />
            <span className="fw-medium mx-2">Enrolled Services:</span>
            <span>{enrolledServices}</span>
          </li>
          <li className="d-flex align-items-center mb-4">
            <FaMoneyBillAlt className="me-2" />
            <span className="fw-medium mx-2">Payments:</span>
            <span>{payments}</span>
          </li>
          <li className="d-flex align-items-center">
            <FaCalendarAlt className="me-2" /> 
            <span className="fw-medium mx-2">Schedules:</span>
            <span>{schedules}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileOverview;
