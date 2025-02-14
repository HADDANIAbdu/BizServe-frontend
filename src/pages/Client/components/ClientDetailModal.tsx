/* eslint-disable @typescript-eslint/no-unused-expressions */
import React from "react";
import { FaEye, FaRegUser, FaTrash } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { Client } from "../../../api/Clients";

interface Props {
  client: Client;
  showModal: boolean;
  onClose: () => void;
  onDeleteClient: (id: number) => void;
  onSeeClient: (id: number) => void;
  onEditClient: (id: number) => void;
}

const ClientDetailModal: React.FC<Props> = ({
  client,
  showModal,
  onClose,
  onDeleteClient,
  onEditClient,
  onSeeClient,
}) => {
  if (!showModal || !client) return null;

  return (
    <div
      className="modal show"
      role="dialog"
      style={{ display: "block" }}
      onClick={onClose}
    >
      <div
        className="modal-dialog "
        role="document"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="btn btn-danger " onClick={onClose}>
              X
            </button>
          </div>
          <div className="modal-body">
            <table className="table">
              <tbody>
                <tr>
                  <td>Client:</td>
                  <td>
                    <div className="d-flex align-items-center">
                      {/* <div className="avatar-wrapper me-4">
                        <div className="avatar avatar-sm">
                          <img
                            src={avatar}
                            alt="Avatar"
                            className="rounded-circle"
                          />
                        </div>
                      </div> */}
                      <div className="d-flex flex-column align-items-start">
                        <button
                          onClick={() => {
                            client.id && onSeeClient(client.id);
                          }}
                          className="btn btn-link p-0 "
                        >
                          <span className="fw-medium">
                            {client.lastname} {client.firstname}
                          </span>
                        </button>
                        <small>{client.email}</small>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>Phone:</td>
                  <td>
                    <span className="text-heading">
                      <FaRegUser className="me-2" />
                      {client.phone}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>Preferences:</td>
                  <td>
                    <span className="text-heading">{client.preference}</span>
                  </td>
                </tr>
                <tr>
                  <td>Actions:</td>
                  <td>
                    <div className="d-flex align-items-center justify-content-around">
                      <button
                        onClick={() => {
                          client.id && onSeeClient(client.id);
                        }}
                        className="btn btn-icon btn-primary "
                      >
                        <FaEye className="text-white" />
                      </button>
                      <button
                        onClick={() => {
                          client.id && onEditClient(client.id);
                        }}
                        className="btn btn-icon btn-warning"
                      >
                        <FiEdit className="text-white" />
                      </button>
                      <button
                        onClick={() => {
                          client.id && onDeleteClient(client.id);
                        }}
                        className="btn btn-icon btn-danger delete-record"
                      >
                        <FaTrash className="text-white" />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDetailModal;
