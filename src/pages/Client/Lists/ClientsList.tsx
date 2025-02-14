/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useEffect, useState } from "react";
import avatar from "../../../assets/img/avatars/user.png";
import { Pagination } from "../../../api/base";
import Spinner from "../../components/Spinner";
import PaginationFooter from "../components/PaginationFooter";
import { Link, useNavigate } from "react-router-dom";
import { Client, deleteClient, getAllClients } from "../../../api/Clients";
import AddClientForm from "../Forms/AddClient";
import { FaPlus } from "react-icons/fa";
import {
  BsChevronLeft,
  BsChevronRight,
} from "react-icons/bs";
import Alert from "../../components/Alert";
import { FaTrash, FaEye } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";

const ClientsList: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [showDeleteAllUsers, setShowDeleteAllUsers] = useState<boolean>(false);
  const [success, setSuccess] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Fetch clients when component mounts or when currentPage changes
  useEffect(() => {
    const fetchClients = async () => {
      setLoading(true);
      try {
        const response = await getAllClients(currentPage);

        if (response.status === "error") {
          setError(response.message);
          setShowAlert(true);
        }
        if (response.status === "success") {
          setClients(response.data);
          setPagination(response.pagination);
        }
      } catch (err) {
        setError("Failed to fetch Clients.");
        setShowAlert(true);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, [currentPage]);

  // Handle page changes for pagination
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowDeleteAllUsers(!showDeleteAllUsers);
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(
      (checkbox) => ((checkbox as HTMLInputElement).checked = e.target.checked)
    );
  };

  const handleCloseALert = () => {
    setShowAlert(false);
  };

  // Navigate to edit page
  const handleSeeClient = (id: number) => {
    navigate(`/manage-clients/profile/${id}`);
  };
  // Navigate to edit page
  const handleEditClient = (id: number) => {
    navigate(`/manage-clients/edit/${id}`);
  };

  // Handle client deletion
  const handleDeleteClient = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this client?")) return;
    try {
      await deleteClient(id);
      setClients((prevClients) =>
        prevClients.filter((client) => client.id !== id)
      ); // Remove client from state
      setSuccess("client deleted successfuly");
      setShowAlert(true);
      console.log(success);
    } catch (err) {
      console.error("Failed to delete client", err);
      setError("Failed to delete client.");
      setShowAlert(true);
    }
  };

  const handlesDeleteAll = async () => {
    console.log("Delete all clients");
    setShowDeleteAllUsers(false);
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
  // Display error if an error occured
  if (error) {
    return (
      <>
        <Alert
          showAlert={showAlert}
          type="danger"
          heading={"Error:"}
          text={error}
          onClose={handleCloseALert}
        />
      </>
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

      <div className="card">
        <div className="card-datatable table-responsive">
          <div className="row">
            <div className="d-flex justify-content-between align-items-center py-4 px-5 ">
              <button
                className="btn add-new btn-primary ms-3"
                type="button"
                onClick={toggleAddForm}
              >
                <FaPlus className="me-2" />
                <span>Add New Client</span>
              </button>
              <Link
                className="btn add-new btn-primary me-auto ms-3"
                type="button"
                to={"/manage-clients/check-duplicates"}
              >
                <FaPlus className="me-2" />
                <span>Check Duplicates</span>
              </Link>
              {showDeleteAllUsers && (
                <button
                  className="btn  add-new btn-danger me-3"
                  type="button"
                  onClick={handlesDeleteAll}
                >
                  <FaTrash className="me-2" />
                  <span>Delete Clients</span>
                </button>
              )}
            </div>
          </div>
          <table className="datatables-users table border-top">
            <thead>
              <tr>
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
                  Client
                </th>
                <th className="sorting" style={{ width: "97px" }}>
                  Phone
                </th>
                <th className="sorting" style={{ width: "97px" }}>
                  Preference
                </th>
                <th
                  className="sorting_disabled"
                  style={{ width: "0px", display: "none" }}
                >
                  Actions
                </th>
                <th
                  className="sorting_disabled dt-checkboxes-cell"
                  style={{ width: "0px" }}
                ></th>
              </tr>
            </thead>
            <tbody>
              {clients.length === 0 ? (
                <h5 className="text-center pt-5">No clients available.</h5>
              ) : (
                <>
                  {clients.map((client) => (
                    <tr className="" key={client.id}>
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
                              <Link
                                to={`/manage-clients/profile/${client.id}`}
                                className="fw-medium"
                              >
                                {client.lastname} {client.firstname}
                              </Link>
                            </h6>
                            <small>{client.email}</small>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="text-heading">{client.phone}</span>
                      </td>
                      <td>
                        <span className="text-heading">
                          {client.preference && client.preference.length > 25
                            ? client.preference.substring(0, 25) + "..."
                            : client.preference}
                        </span>
                      </td>
                      <td className="dtr-hidden">
                      <div className="d-flex align-items-center justify-content-around">
                      <button
                        onClick={() => {
                          client.id && handleSeeClient(client.id);
                        }}
                        className="btn btn-icon btn-primary "
                      >
                        <FaEye className="text-white" />
                      </button>
                      <button
                        onClick={() => {
                          client.id && handleEditClient(client.id);
                        }}
                        className="btn btn-icon btn-warning"
                      >
                        <FiEdit className="text-white" />
                      </button>
                      <button
                        onClick={() => {
                          client.id && handleDeleteClient(client.id);
                        }}
                        className="btn btn-icon btn-danger delete-record"
                      >
                        <FaTrash className="text-white" />
                      </button>
                    </div>
                      </td>
                    </tr>
                  ))}
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* Pagination */}
      {pagination && pagination.total > 6 && (
        <PaginationFooter
          currentPage={currentPage}
          totalPages={(pagination && pagination.last_page) || 1}
          onPageChange={handlePageChange}
          PreviousIcon={BsChevronLeft}
          NextIcon={BsChevronRight}
        />
      )}
      {/* AddForm to add new user */}
      {showAddForm && (
        <AddClientForm clients={clients} onClose={toggleAddForm} />
      )}
    </>
  );
};

export default ClientsList;
