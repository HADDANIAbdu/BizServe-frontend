/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useEffect, useState } from "react";
import {
  Client,
  forceDeleteClient,
  getDeletedClients,
  restoreClient,
} from "../../../api/Clients";
import { Pagination } from "../../../api/base";
import Spinner from "../../components/Spinner";
import { BsRecycle, BsTrashFill } from "react-icons/bs";
import Alert from "../../components/Alert";

const DeletedClientsList: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDeletedClients = async () => {
      setLoading(true);
      try {
        const response = await getDeletedClients(currentPage);
        if (response.status === "error") {
          setError(response.message);
          setShowAlert(true);
        }
        if (response.status === "success") {
          setClients(response.data);
          setPagination(response.pagination);
        }
      } catch (err) {
        setError("Failed to fetch client.");
        setShowAlert(true);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDeletedClients();
  }, [currentPage]);

  const handleRestore = async (id: number) => {
    try {
      await restoreClient(id);
      setClients((prevClients) =>
        prevClients.filter((client) => client.id !== id)
      ); // Remove client from state
      setSuccess("Client restored");
      setShowAlert(true);
    } catch (err) {
      console.error("Failed to delete client", err);
      setError("Failed to delete client.");
      setShowAlert(true);
    }
  };

  const handleForceDelete = async (id: number) => {
    if (
      !window.confirm("Are you sure you want to delete this client permantly?")
    )
      return;

    try {
      await forceDeleteClient(id);
      setClients((prevClients) =>
        prevClients.filter((client) => client.id !== id)
      ); // Remove client from state
      setSuccess("Client deleted permanently");
      setShowAlert(true);
    } catch (err) {
      console.error("Failed to delete client", err);
      setError("Failed to delete client.");
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
        <h5 className="text-center pt-5">Loading clients...</h5>
        <Spinner />;
      </>
    );
  }

  // Display error message if there was an error fetching or deleting clients
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
        {clients.length === 0 ? (
          <h5 className="text-center p-5">No clients available.</h5>
        ) : (
          <div className="card-datatable table-responsive">
          <table className="datatables-users table border-top">
            <thead>
              <tr>
                <th>Fullname</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Preferences</th>
                <th
                  className="sorting_disabled dt-checkboxes-cell"
                  style={{ width: "0px" }}
                ></th>
              </tr>
            </thead>
            <tbody>
              {clients.length === 0 ? (
                <h6>No clients found</h6>
              ) : (
                clients.map((client) => (
                  <tr key={client.id}>
                    <td>
                      {client.lastname} {client.firstname}
                    </td>
                    <td>{client.email}</td>
                    <td>{client.phone}</td>
                    <td>
                      {" "}
                      <span className="text-heading">
                        {client.preference && client.preference.length > 25
                          ? client.preference.substring(0, 25) + "..."
                          : client.preference}
                      </span>
                    </td>
                    <td className="dtr-hidden">
                    <div className="d-flex align-items-center justify-content-around">
                      <button
                        className="btn btn-success me-2 d-flex justify-content-center align-items-center"
                        onClick={() => {
                          client.id && handleRestore(client.id);
                        }}
                      >
                        <BsRecycle />
                      </button>
                      <button
                        className="btn btn-danger me-2 d-flex justify-content-center align-items-center"
                        onClick={() => {
                          client.id && handleForceDelete(client.id);
                        }}
                      >
                        <BsTrashFill />
                      </button>
                    </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
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

export default DeletedClientsList;
