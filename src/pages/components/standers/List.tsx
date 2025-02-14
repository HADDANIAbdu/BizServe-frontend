import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { BsSearch, BsThreeDotsVertical } from "react-icons/bs";
import AddUserForm from "../Forms/Add"; // Import the form component
import UserDetailModal from "./UserDetailModal"; // Import the modal component
import avatar from "../../../../assets/img/avatars/1.png";

const UserManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRole(e.target.value);
  };

  const toggleOffcanvas = () => {
    setShowOffcanvas(!showOffcanvas);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(
      (checkbox) => ((checkbox as HTMLInputElement).checked = e.target.checked)
    );
  };

  const openModal = (user: any) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="card">
        <div className="card-header border-bottom">
          <h5 className="card-title mb-0">Search Filters</h5>
          <div className="d-flex justify-content-between align-items-center row pt-4 gap-4 gap-md-0 g-6">
            <div className="col-md-4">
              <select
                id="UserRole"
                className="form-select text-capitalize"
                value={selectedRole}
                onChange={handleRoleChange}
              >
                <option value="">Select Role</option>
                <option value="Admin">Admin</option>
                <option value="Author">Author</option>
              </select>
            </div>
          </div>
        </div>
        <div className="card-datatable table-responsive">
          <div className="row">
            <div className="d-flex justify-content-between align-items-center py-4 gap-4">
              <div className="dataTables_filter d-flex align-items-center">
                <input
                  type="search"
                  className="form-control"
                  placeholder="Search User"
                  aria-controls="DataTables_Table_0"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <BsSearch
                  className="search-icon mx-2"
                  style={{ fontSize: "1.5rem", alignSelf: "center" }}
                />
              </div>
              <button
                className="btn btn-secondary add-new btn-primary"
                type="button"
                onClick={toggleOffcanvas}
              >
                <FaPlus className="me-2" />
                <span>Add New User</span>
              </button>
            </div>
          </div>
          <table className="datatables-users table border-top">
            <thead>
              <tr>
                <th
                  className="sorting_disabled dt-checkboxes-cell"
                  style={{ width: "0px" }}
                ></th>
                <th
                  className="sorting_disabled dt-checkboxes-cell"
                  style={{ width: "18px" }}
                >
                  <input
                    type="checkbox"
                    className="form-check-input"
                    onChange={handleCheckboxChange}
                  />
                </th>
                <th className="sorting" style={{ width: "232px" }}>
                  User
                </th>
                <th className="sorting" style={{ width: "97px" }}>
                  Role
                </th>
                <th
                  className="sorting_disabled"
                  style={{ width: "0px", display: "none" }}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Example Row */}
              <tr className="odd">
                <td className="dtr-hidden">
                  <div className="d-flex align-items-center">
                    <a
                      href="#"
                      className="btn btn-icon"
                      onClick={() =>
                        openModal({
                          name: "Zsazsa McCleverty",
                          email: "zmcclevertye@soundcloud.com",
                          role: "Admin",
                        })
                      }
                    >
                      <BsThreeDotsVertical />
                    </a>
                  </div>
                </td>
                <td className="dt-checkboxes-cell">
                  <input
                    type="checkbox"
                    className="dt-checkboxes form-check-input"
                  />
                </td>
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
                      <h6 className="text-heading text-truncate mb-0">
                        <span className="fw-medium">Zsazsa McCleverty</span>
                      </h6>
                      <small>zmcclevertye@soundcloud.com</small>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="text-heading">
                    <i className="bx bx-user text-success me-2"></i>Admin
                  </span>
                </td>
              </tr>
              <tr className="even">
                <td className="dtr-hidden">
                  <div className="d-flex align-items-center">
                    <a
                      href="#"
                      className="btn btn-icon"
                      onClick={() =>
                        openModal({
                          name: "Zsazsa McCleverty",
                          email: "zmcclevertye@soundcloud.com",
                          role: "Admin",
                        })
                      }
                    >
                      <BsThreeDotsVertical />
                    </a>
                  </div>
                </td>
                <td className="dt-checkboxes-cell">
                  <input
                    type="checkbox"
                    className="dt-checkboxes form-check-input"
                  />
                </td>
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
                      <h6 className="text-heading text-truncate mb-0">
                        <span className="fw-medium">Zsazsa McCleverty</span>
                      </h6>
                      <small>zmcclevertye@soundcloud.com</small>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="text-heading">
                    <i className="bx bx-user text-success me-2"></i>Admin
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Offcanvas to add new user */}
      {showOffcanvas && <AddUserForm onClose={toggleOffcanvas} />}

      {/* User Detail Modal */}
      <UserDetailModal
        showModal={showModal}
        onClose={closeModal}
        user={selectedUser}
      />
    </div>
  );
};

export default UserManagement;
