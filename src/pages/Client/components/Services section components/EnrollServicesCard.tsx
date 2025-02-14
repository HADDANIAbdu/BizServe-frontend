import React from "react";
import { Link } from "react-router-dom";
import { Service } from "../../../../api/ServicesService";
import logo from "../../../../assets/img/icons/brands/slack.png";
import { FaCheck, FaPlus } from "react-icons/fa6";

interface Props {
  service: Service;
  enrolled: boolean;
  onEnroll: (serviceId: number) => void;
}

const EnrollServiceCard: React.FC<Props> = ({
  service,
  enrolled,
  onEnroll,
}) => {
  return (
    <div className="col-xl-4 col-lg-6 col-md-6 mt-5">
      <div className="card">
        <div className="card-body">
          <div className="d-flex align-items-center mb-3 pb-1">
            <Link to="#" className="d-flex align-items-center">
              <div className="avatar me-2">
                <img src={logo} alt="Service logo" className="rounded-circle" />
              </div>
              <div className="me-2 text-heading h5 mb-0">{service.name}</div>
            </Link>
          </div>
          <div className="mb-3">
            <span className="badge bg-label-primary me-1">
              {service.category}
            </span>
          </div>
          <p className="mb-3 pb-1">{service.description}</p>

          <div className="d-flex align-items-center mt-5">
            <div className="d-flex align-items-center">
              <ul className="list-unstyled d-flex align-items-center justify-content-start avatar-group mb-0">
                {service.clients && service.clients.length > 0 && (
                  <>
                    <span className="text-heading">clients</span>
                    <li className="mx-1 avatar avatar-sm">
                      <span className="avatar-initial rounded-circle">
                        +{service.clients.length}
                      </span>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
        {enrolled ? (
          <div className="card-footer d-flex justify-content-center align-items-center">
            <button
              className="btn btn-secondary disabled"
              onClick={() => {
                if (service.id) onEnroll(service.id);
              }}
            >
              <FaCheck /> Enrolled
            </button>
          </div>
        ) : (
          <div className="card-footer d-flex justify-content-center align-items-center">
            <button
              className="btn btn-primary"
              onClick={() => service.id && onEnroll(service.id)}
            >
              <FaPlus /> Enroll Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnrollServiceCard;
