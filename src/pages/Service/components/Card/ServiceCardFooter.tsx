import React from "react";
import avatar from "../../../../assets/img/avatars/user.png";

interface ServiceCardFooterProps {
  clients: string[] | [] | undefined;
  clientCount: number | undefined;
}

const ServiceCardFooter: React.FC<ServiceCardFooterProps> = ({
  clients,
  clientCount,
}) => {
  return (
    <div className="card-body border-top">
      <div className="d-flex align-items-center">
        <div className="d-flex align-items-center">
          <ul className="list-unstyled d-flex align-items-center avatar-group mb-0 z-2">
            {clients &&
              clients.map((client, index) => (
                <li
                  key={index}
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  className="avatar avatar-sm pull-up"
                  aria-label={client}
                  title={client}
                >
                  <img
                    className="rounded-circle"
                    src={avatar}
                    alt="Avatar"
                  />
                </li>
              ))}
            <li>
              <small className="text-muted">{clientCount} clients</small>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ServiceCardFooter;
