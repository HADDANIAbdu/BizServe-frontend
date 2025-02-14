/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteUser, getAllUsers, User } from "../../../api/UsersService";
import { Pagination } from "../../../api/base";
import Alert from "../../components/Alert";
import Spinner from "../../components/Spinner";
import AddUserForm from "../Forms/AddUserForm";
import PaginationFooter from "../components/PaginationFooter";
import avatar from "../../../assets/img/avatars/user.png";
import { FaPlus } from "react-icons/fa";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { FaEye } from "react-icons/fa6";
import { useAuth } from "../../../hooks/AuthHook";
import { TiDelete } from "react-icons/ti";

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const { user: authUser } = useAuth();
  const navigate = useNavigate();

  // Fetch users when component mounts or when currentPage changes
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await getAllUsers(currentPage);

        if (response.status === "success") {
          setUsers(response.data);
          setPagination(response.pagination);
        }
      } catch (err: any) {
        setError(err.message || "Failed to fetch users.");

        setShowAlert(true);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [currentPage]);

  // Handle page changes for pagination
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(
      (checkbox) => ((checkbox as HTMLInputElement).checked = e.target.checked)
    );
  };

  const handleDeleteUser = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await deleteUser(id);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id)); // Remove user from state
      setSuccess("User deleted successfully");
      setShowAlert(true);
    } catch (err: any) {
      console.error("Failed to delete user", err);
      setError(err.message || "Failed to delete user.");
      setShowAlert(true);
    }
  };

  const handleSeeUser = (id: number) => {
    navigate(`/manage-users/profile/${id}`);
  };

  if (loading) {
    return (
      <>
        <h5 className="text-center pt-5">Loading users...</h5>
        <Spinner />
      </>
    );
  }
  // Display error if an error occurred
  if (error) {
    return (
      <Alert
        showAlert={showAlert}
        type="danger"
        heading={"Error:"}
        text={error}
        onClose={() => setShowAlert(false)}
      />
    );
  }

  return (
    <>
      {success && (
        <Alert
          showAlert={showAlert}
          type="success"
          heading={"Success:"}
          text={success}
          onClose={() => setShowAlert(false)}
        />
      )}
      <div className="card">
        <div className="card-datatable table-responsive">
          <div className="row">
            <div className="d-flex justify-content-between align-items-center py-4 px-5">
              <button
                className="btn add-new btn-primary"
                type="button"
                onClick={toggleAddForm}
              >
                <FaPlus className="me-2" />
                <span>Add New User</span>
              </button>
            </div>
          </div>
          <table className="datatables-users table border-top">
            <thead>
              <tr>
                <th className="sorting_disabled dt-checkboxes-cell">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    onChange={handleCheckboxChange}
                  />
                </th>
                <th className="sorting text-xl-center" style={{ width: "30%" }}>
                  User
                </th>
                <th className="sorting text-xl-center" style={{ width: "30%" }}>
                  Roles
                </th>
                <th className="sorting text-xl-center" style={{ width: "30%" , display:'none'}}>
                  Actions
                </th>
                <th
                  className="sorting_disabled dt-checkboxes-cell"
                  style={{ width: "0px" }}
                ></th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <h5 className="text-center pt-5">No users available.</h5>
              ) : (
                users.map((user) => (
                  <tr className="" key={user.id}>
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
                            <span className="fw-medium">{user.username}</span>
                          </h6>
                          <small>{user.email}</small>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex flex-wrap align-items-center">
                        {user.roles &&
                          user.roles.length > 0 &&
                          user.roles.map((role, index) => (
                            <span
                              key={role.id}
                              className={`badge ${
                                role.name === "admin"
                                  ? "bg-label-primary"
                                  : "bg-label-secondary"
                              } m-2`}
                            >
                              {role.name}
                              {user.roles &&
                                index < user.roles.length - 1 &&
                                ", "}
                            </span>
                          ))}
                        </div>
                    </td>
                    <td>
                      <div className=" d-flex mx-5  px-10 justify-content-around align-items-center">
                        <div className="bg-primary rounded  d-flex justify-content-around align-items-center me-2">
                          <button
                            className="btn m-0 p-2"
                            onClick={() => user.id && handleSeeUser(user.id)}
                          >
                            <FaEye className="text-white" size={15} />
                          </button>
                        </div>
                        {user.id !== authUser.id && (
                          <div className="bg-danger rounded   d-flex justify-content-around align-items-center">
                            <button
                              className="btn  m-0 p-2"
                              onClick={() =>
                                user.id && handleDeleteUser(user.id)
                              }
                            >
                              <TiDelete className="text-white" size={15} />
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* Pagination */}
      {pagination && pagination.total > 10 && (
        <PaginationFooter
          currentPage={currentPage}
          totalPages={pagination.last_page || 1}
          onPageChange={handlePageChange}
          PreviousIcon={BsChevronLeft}
          NextIcon={BsChevronRight}
        />
      )}
      {/* Add Form to add new user */}
      {showAddForm && <AddUserForm users={users} onClose={toggleAddForm} />}
    </>
  );
};

export default UserList;
