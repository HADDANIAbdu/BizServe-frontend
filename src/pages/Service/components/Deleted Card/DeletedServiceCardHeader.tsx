import React from "react";
import avatar from "../../../../assets/img/icons/brands/slack.png";
import {  FaTrash } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link } from "react-router-dom";
import { FaRecycle } from "react-icons/fa6";

interface Props {
  serviceId: number | undefined;
  serviceName: string | undefined;
  category: string | undefined;
  onRestoreService: (id: number) => void;
  onForceDeleteService: (id: number) => void;
}

const DeletedServiceCardHeader: React.FC<Props> = ({
  serviceId,
  serviceName,
  category,
  onRestoreService,
  onForceDeleteService,
}) => {
  return (
    <div className="card-header pb-4">
      <div className="d-flex align-items-start">
        <div className="d-flex align-items-center">
          <div className="avatar me-4">
            <img src={avatar} alt="Avatar" className="rounded-circle" />
          </div>
          <div className="me-2">
            <h5 className="mb-0">
              <Link
                to={`/manage-services/service/${serviceId}`}
                className="stretched-link text-heading"
              >
                {serviceName}
              </Link>
            </h5>
            <div className="client-info text-body">
              <span className="fw-medium">Category: </span>
              <span>{category}</span>
            </div>
          </div>
        </div>
        <div className="ms-auto">
          <div className="dropdown z-2">
            <button
              type="button"
              className="btn btn-icon btn-text-secondary rounded-pill dropdown-toggle hide-arrow p-0"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <BsThreeDotsVertical size={20} />
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              <li className="d-inline-block m-3">
                <button
                  className="dropdown-item d-flex bg-success justify-content-around align-items-center  w-auto rounded-1"
                  onClick={() => {
                    serviceId && onRestoreService(serviceId);
                  }}
                >
                  <FaRecycle  className="text-white" />
                  {/* <span className="d-none">Restore </span> */}
                </button>
              </li>
              <li className="d-inline-block m-3">
                <button
                  className="dropdown-item d-flex bg-danger justify-content-around align-items-center  w-auto rounded-1"
                  onClick={() => {
                    serviceId && onForceDeleteService(serviceId);
                  }}
                >
                  <FaTrash className="text-white" />
                  {/* <span className="d-none">Delete permenatly</span> */}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeletedServiceCardHeader;
