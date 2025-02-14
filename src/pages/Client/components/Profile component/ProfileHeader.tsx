import React from "react";
import { FaPhone, FaUserCheck } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa6";
import { Link } from "react-router-dom";

interface Props {
  clientId: number;
  name: string;
  email: string;
  phone: string;
  preference: string;
}

const ProfileHeader: React.FC<Props> = ({
  clientId,
  name,
  email,
  phone,
  preference,
}) => {
  return (
    <div className="row">
      <div className="col-12">
        <div className="card mb-6">
          <div className="user-profile-header d-flex flex-column flex-lg-row text-sm-start text-center mb-8">
            <div className="flex-grow-1">
              <div className="d-flex align-items-md-end align-items-sm-start align-items-center justify-content-md-between justify-content-start mx-5 flex-md-row flex-column gap-4">
                <div className="user-profile-info">
                  <h4 className="mb-2 mt-lg-7">{name}</h4>
                  <ul className="list-inline mb-0 d-flex align-items-center flex-wrap justify-content-sm-start justify-content-center gap-4 mt-4">
                    <li className="list-inline-item  d-flex align-items-center">
                      <FaEnvelope className="me-2 align-top" />
                      <span className="fw-medium">{email}</span>
                    </li>
                    <li className="list-inline-item  d-flex align-items-center">
                      <FaPhone className="me-2 align-top" />
                      <span className="fw-medium">{phone}</span>
                    </li>
                  </ul>

                  {preference ? (<p className="mt-5">Preference : {preference}</p>) : 'no prefrence'}
                </div>
                <Link
                  to={`/manage-clients/edit/${clientId}`}
                  className="btn btn-primary mb-1"
                >
                  <FaUserCheck className="me-2" />
                  edit
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
