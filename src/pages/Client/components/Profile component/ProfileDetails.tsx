import React from "react";
import { FaUser, FaPhone, FaEnvelope } from "react-icons/fa";

interface Props {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
}
const ProfileDetailsCard: React.FC<Props> = ({
  firstname,
  lastname,
  email,
  phone,
}) => {
  return (
    <div className="card mb-6">
      <div className="card-body">
        {/* About Section */}
        <small className="card-text text-uppercase text-muted small">
          About
        </small>
        <ul className="list-unstyled my-3 py-1">
          <li className="d-flex align-items-center mb-4">
            <FaUser className="me-2" size={20} />
            <div className="d-flex flex-column mx-2">
              <div className="p-0 m-0">
                <span className="fw-medium ">First Name:</span>
                <span className="mx-4 ">{firstname}</span>
              </div>
              <div className="p-0 m-0">
                <span className="fw-medium ">Last Name:</span>
                <span className="mx-4">{lastname}</span>
              </div>
            </div>
          </li>
        </ul>

        {/* Contacts Section */}
        <small className="card-text text-uppercase text-muted small">
          Contacts
        </small>
        <ul className="list-unstyled my-3 py-1">
          <li className="d-flex align-items-center mb-4">
            <FaPhone className="me-2" />
            <span className="fw-medium mx-2">Phone:</span>
            <span>{phone}</span>
          </li>
          <li className="d-flex align-items-center mb-4 flex-wrap text-wrap">
            <FaEnvelope className="me-2" />
            <span className="fw-medium mx-2">Email:</span>
            <span>{email}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileDetailsCard;
