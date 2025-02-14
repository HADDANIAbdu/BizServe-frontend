import React from "react";
import avatar from "../../../assets/img/avatars/user.png";
import { User } from "../../../api/UsersService";
import { useAuth } from "../../../hooks/AuthHook";
import { FaEye, FaRegUser, FaTrash } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";

interface Props {
  user: User;
  showModal: boolean;
  onClose: () => void;
  onDeleteUser: (id: number) => void;
  onSeeUser: (id: number) => void;
  onEditUser: (id: number) => void;
}

const UserDetailModal: React.FC<Props> = ({
  user,
  showModal,
  onClose,
  onDeleteUser,
  onEditUser,
  onSeeUser,
}) => {
  const { user: authUser } = useAuth();
  if (!showModal || !user) return null;

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
            <h4 className="modal-title">
              <span className="text-light">Details of:</span> {user.username}
            </h4>
            <button
              type="button"
              className="btn-close btn bg-danger"
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
                      <div className="d-flex flex-column align-items-start">
                        <button
                          onClick={() => {
                            user.id && onSeeUser(user.id);
                          }}
                          className="btn btn-link p-0 "
                        >
                          <span className="fw-medium">{user.username}</span>
                        </button>
                        <small>{user.email}</small>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>Role:</td>
                  <td>
                    <span className="text-heading">
                      <FaRegUser className="me-2" />
                      {user.roles &&
                        user.roles.length > 0 &&
                        user.roles?.map((role, index) => (
                          <span key={role.id}>
                            {role.name}
                            {user.roles &&
                              index < user.roles.length - 1 &&
                              ", "}
                          </span>
                        ))}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>Actions:</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <button
                        onClick={() => {
                          user.id && onSeeUser(user.id);
                        }}
                        className="btn btn-icon"
                      >
                        <FaEye className="text-primary" size={20} />
                      </button>
                      <button
                        onClick={() => {
                          user.id && onEditUser(user.id);
                        }}
                        className="btn btn-icon"
                      >
                        <FiEdit className="text-warning" size={20} />
                      </button>
                      {user.id !== authUser.id && (
                        <button
                          onClick={() => {
                            user.id && onDeleteUser(user.id);
                          }}
                          className="btn btn-icon delete-record"
                        >
                          <FaTrash className="text-danger" size={20} />
                        </button>
                      )}
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
