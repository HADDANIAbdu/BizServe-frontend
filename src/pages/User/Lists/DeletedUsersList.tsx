import React, { useEffect, useState } from "react";
import {
  forceDeleteUser,
  getDeletedUsers,
  restoreUser,
  User,
} from "../../../api/UsersService";
import { Pagination } from "../../../api/base";
import Spinner from "../../components/Spinner";
import { BsRecycle, BsTrashFill } from "react-icons/bs";
import Alert from "../../components/Alert";

const DeletedUsersList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await getDeletedUsers(currentPage);
        if (!response.ok) {
          setError(response.errors);
          setShowAlert(true);
        }
        setUsers(response.data);
        setPagination(response.pagination);
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

  const handleRestore = async (id: number) => {
    try {
      await restoreUser(id);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id)); // Remove user from state
      setSuccess("User restored");
      setShowAlert(true);
    } catch (err: any) {
      console.error("Failed to delete user", err);
      setError(err.message || "Failed to delete user.");
      setShowAlert(true);
    }
  };

  // Handle user deletion
  const handleForceDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this user permantly?"))
      return;

    try {
      await forceDeleteUser(id);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id)); // Remove user from state
      setSuccess("User deleted permanently");
      setShowAlert(true);
    } catch (err) {
      console.error("Failed to delete user", err);
      setError("Failed to delete user.");
      setShowAlert(true);
    }
  };

  const handleCloseALert = () => {
    setShowAlert(false);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const generatePageNumbers = () => {
    if (!pagination) return [];

    const totalPages = pagination.last_page || 1;
    const currentPage = pagination.current_page || 1;
    const pageNumbers: number[] = [];

    // Define the range of pages to display
    const range = 2;
    for (
      let i = Math.max(1, currentPage - range);
      i <= Math.min(totalPages, currentPage + range);
      i++
    ) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  // Display loading indicator while fetching data
  if (loading) {
    return (
      <>
        <h5 className="text-center pt-5">Loading users...</h5>
        <Spinner />;
      </>
    );
  }

  if (error) {
    return (
      <Alert
        showAlert={showAlert}
        type="danger"
        heading={"Error:"}
        text={error}
        onClose={handleCloseALert}
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
          onClose={handleCloseALert}
        />
      )}
      <div className="card p-5">
        {users.length === 0 ? (
          <h5 className="text-center p-5">No users available.</h5>
        ) : (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <h6>No user found</h6>
              ) : (
                users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td className="d-flex justify-content-center align-items-center">
                      <button
                        className="btn btn-success me-2 d-flex justify-content-center align-items-center"
                        onClick={() => {
                          user.id && handleRestore(user.id);
                        }}
                      >
                        <BsRecycle />
                      </button>
                      <button
                        className="btn btn-danger me-2 d-flex justify-content-center align-items-center"
                        onClick={() => {
                          user.id && handleForceDelete(user.id);
                        }}
                      >
                        <BsTrashFill />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
        {/* Pagination Controls */}
        {pagination && pagination.total > 10 && (
          <nav className="d-flex justify-content-center">
            <ul className="pagination">
              <li className="page-item px-1">
                <button
                  className={
                    pagination.prev_page_url === null
                      ? " page-link disabled"
                      : " page-link"
                  }
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  Previous
                </button>
              </li>

              {generatePageNumbers().map((page) => (
                <li
                  key={page}
                  className={`page-item px-1 ${
                    page === currentPage ? "active" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                </li>
              ))}

              <li className="page-item px-1">
                <button
                  className={
                    pagination.next_page_url === null
                      ? " page-link disabled"
                      : " page-link"
                  }
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </>
  );
};

export default DeletedUsersList;
