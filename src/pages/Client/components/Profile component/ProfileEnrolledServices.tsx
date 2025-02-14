import React, { useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import { Service } from "../../../../api/ServicesService";
import logo from "../../../../assets/img/icons/brands/slack.png";

interface Props {
  services: Service[];
  onManageServices: () => void;
}

const ProfileEnrolledServices: React.FC<Props> = ({
  services,
  onManageServices,
}) => {
  const [showAll, setShowAll] = useState<boolean>(false);

  // Show only the first 5 services initially unless 'showAll' is true
  const displayedServices = showAll ? services : services.slice(0, 5);

  return (
    <div className="col-lg-12 col-xl-6">
      <div className="card card-action mb-6">
        <div className="card-header align-items-center">
          <h5 className="card-action-title mb-0">Enrolled Services</h5>
          <div className="card-action-element">
            <div className="dropdown">
              <button
                type="button"
                className="btn btn-icon btn-text-secondary dropdown-toggle hide-arrow p-0"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <FaEllipsisV className="text-muted" />
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <button className="dropdown-item" onClick={onManageServices}>
                    Manage Enrolled Services
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="card-body">
          {services.length === 0 ? (
            <span className="text-start text-primary pt-5">
              No enrolled services available.
            </span>
          ) : (
            <>
              <ul className="list-unstyled mb-0">
                {displayedServices.map((service) => (
                  <li key={service.id} className="mb-4">
                    <div className="d-flex align-items-center">
                      <div className="d-flex align-items-center">
                        <div className="avatar me-2">
                          <img
                            src={logo}
                            alt="Avatar"
                            className="rounded-circle"
                          />
                        </div>
                        <div className="me-2">
                          <h6 className="mb-0">{service.name}</h6>
                          <small>{service.clients?.length} Members</small>
                        </div>
                      </div>
                      <div className="ms-auto">
                        <span className="badge bg-label-primary">
                          {service.category}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
                {services.length > 5 && !showAll && (
                  <li className="text-center">
                    <button
                      className="btn btn-link"
                      onClick={() => setShowAll(true)}
                    >
                      View more enrolled services
                    </button>
                  </li>
                )}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileEnrolledServices;
