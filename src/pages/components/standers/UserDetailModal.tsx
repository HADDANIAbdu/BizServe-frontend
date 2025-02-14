import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import avatar from "../../../../assets/img/avatars/1.png";

interface UserDetailModalProps {
  showModal: boolean;
  onClose: () => void;
  user: {
    name: string;
    email: string;
    role: string;
  } | null;
}

const UserDetailModal: React.FC<UserDetailModalProps> = ({
  showModal,
  onClose,
  user,
}) => {
  if (!showModal || !user) return null;

  return (
    <div
      className="modal show"
      role="dialog"
      style={{ display: "block" }}
      onClick={onClose}
    >
      <div
        className="modal-dialog"
        role="document"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Details of {user.name}</h4>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <table className="table">
              <tbody>
                <tr>
                  <td>User:</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="avatar-wrapper me-4">
                        <div className="avatar avatar-sm">
                          <img
                            src={avatar}
                            alt="Avatar"
                            className="rounded-circle"
                          />
                        </div>
                      </div>
                      <div>
                        <a
                          href="app-user-view-account.html"
                          className="text-heading text-truncate"
                        >
                          <span className="fw-medium">{user.name}</span>
                        </a>
                        <small>{user.email}</small>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>Role:</td>
                  <td>
                    <span className="text-heading">
                      <i className="bx bx-user text-success me-2"></i>
                      {user.role}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>Actions:</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <a href="#" className="btn btn-icon delete-record">
                        <i className="bx bx-trash bx-md"></i>
                      </a>
                      <a
                        href="app-user-view-account.html"
                        className="btn btn-icon"
                      >
                        <i className="bx bx-show bx-md"></i>
                      </a>
                      <a
                        href="#"
                        className="btn btn-icon dropdown-toggle hide-arrow"
                        data-bs-toggle="dropdown"
                      >
                        <BsThreeDotsVertical />
                      </a>
                      <div className="dropdown-menu dropdown-menu-end m-0">
                        <a href="#" className="dropdown-item">
                          Edit
                        </a>
                        <a href="#" className="dropdown-item">
                          Suspend
                        </a>
                      </div>
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

export default UserDetailModal;
