/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useEffect, useState } from 'react';
import { Client, deleteClient, getDuplicates } from '../../../api/Clients';
import Spinner from "../../components/Spinner";
import avatar from "../../../assets/img/avatars/user.png";
import { Link, useNavigate } from 'react-router-dom';
import Alert from "../../components/Alert";
import { FaTrash, FaEye } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import { FaEnvelope, FaPhone } from "react-icons/fa";

const Duplicates: React.FC = () => {
    const [emailDuplicates, setEmailDuplicates] = useState<Client[]>([]);
    const [phoneDuplicates, setPhoneDuplicates] = useState<Client[]>([]);
    const [showDeleteAllemailDup, setShowDeleteAllemailDup] = useState<boolean>(false);
    const [showDeleteAllphoneDup, setShowDeleteAllphoneDup] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [success, setSuccess] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDuplicates = async () => {
            setLoading(true);
            try{
                const response = await getDuplicates();
                if(response.status === "success"){
                    setEmailDuplicates(response.data.email);
                    setPhoneDuplicates(response.data.phone);
                }
            }catch(error){
                if(error instanceof Error) console.log("error 2 :", error.message);
            }finally{
                setLoading(false);
            }
        };
        fetchDuplicates();
    },[])

    const handleCloseALert = () => {
        setShowAlert(false);
    };
    if (loading) {
        return (
          <>
            <h5 className="text-center pt-5">Loading Duplicates...</h5>
            <Spinner />;
          </>
        );
    }
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
    const handleCheckboxChangeEmailDup = (e: React.ChangeEvent<HTMLInputElement>) => {
        setShowDeleteAllemailDup(!showDeleteAllemailDup);
        const checkboxes = document.querySelectorAll('input[type="checkbox"][id="checkbox-email"]');
        checkboxes.forEach(
          (checkbox) => ((checkbox as HTMLInputElement).checked = e.target.checked)
        );
    };
    const handleCheckboxChangePhoneDup = (e: React.ChangeEvent<HTMLInputElement>) => {
      setShowDeleteAllphoneDup(!showDeleteAllphoneDup);
      const checkboxes = document.querySelectorAll('input[type="checkbox"][id="checkbox-phone"]');
      checkboxes.forEach(
        (checkbox) => ((checkbox as HTMLInputElement).checked = e.target.checked)
      );
  };
    // Navigate to edit page
    const handleSeeClient = (id: number) => {
        navigate(`/manage-clients/profile/${id}`);
    };
    // Navigate to edit page
    const handleEditClient = (id: number) => {
        navigate(`/manage-clients/edit/${id}`);
    };
    const handleDeleteClient = async (id: number) => {
        if (!window.confirm("Are you sure you want to delete this client?")) return;
        try {
          await deleteClient(id);
          setEmailDuplicates((prevClients) =>
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
      const handlesDeleteAllemailDup = async () => {
        console.log("Delete all clients");
        setShowDeleteAllemailDup(false);
      };
      const handlesDeleteAllphoneDup = async () => {
        console.log("Delete all clients");
        setShowDeleteAllphoneDup(false);
      };
    return(
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
                    <div className="btn add-new ms-3">
                      <FaEnvelope className='me-3' />
                      <span className='me-auto'>Duplicates by Email</span>
                    </div>
                    {showDeleteAllemailDup && (
                      <button
                        className="btn  add-new btn-danger me-3"
                        type="button"
                        onClick={handlesDeleteAllemailDup}
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
                          id="checkbox-email"
                          onChange={handleCheckboxChangeEmailDup}
                        />
                      </th>
                      <th className="sorting" style={{ width: "232px", fontWeight:'bold' }}>
                        Client
                      </th>
                      <th className="sorting" style={{ width: "97px", fontWeight:'bold' }}>
                        Phone
                      </th>
                      <th className="sorting" style={{ width: "97px", fontWeight:'bold' }}>
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
                    {emailDuplicates.length === 0 ? (
                      <h5 className="text-center pt-5">No Duplicates available.</h5>
                    ) : (
                      <>
                        {emailDuplicates.map((client) => (
                          <tr className="" key={client.id}>
                            <td className="dt-checkboxes-cell">
                              <input
                                type="checkbox"
                                className="dt-checkboxes form-check-input"
                                id="checkbox-email"
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
          <div className="card mt-5">
            <div className="card-datatable table-responsive">
              <div className="row">
                <div className="d-flex justify-content-between align-items-center py-4 px-5 ">
                    <div className="btn add-new ms-3">
                      <FaPhone className='me-3' />
                      <span className='me-auto'>Duplicates by Phone</span>
                    </div>
                    {showDeleteAllphoneDup && (
                      <button
                        className="btn  add-new btn-danger me-3"
                        type="button"
                        onClick={handlesDeleteAllphoneDup}
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
                          id="checkbox-phone"
                          onChange={handleCheckboxChangePhoneDup}
                        />
                      </th>
                      <th className="sorting" style={{ width: "232px", fontWeight:'bold' }}>
                        Client
                      </th>
                      <th className="sorting" style={{ width: "97px", fontWeight:'bold' }}>
                        Phone
                      </th>
                      <th className="sorting" style={{ width: "97px", fontWeight:'bold' }}>
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
                    {phoneDuplicates.length === 0 ? (
                      <h5 className="text-center pt-5">No Duplicates available.</h5>
                    ) : (
                      <>
                        {phoneDuplicates.map((client) => (
                          <tr className="" key={client.id}>
                            <td className="dt-checkboxes-cell">
                              <input
                                type="checkbox"
                                className="dt-checkboxes form-check-input"
                                id="checkbox-phone"
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
        </>
    )
};

export default Duplicates;
