import React, { useEffect, useState } from "react";
import { Pagination } from "../../../api/base";
import Spinner from "../../components/Spinner";
import Alert from "../../components/Alert";
import {
  deleteService,
  getAllServices,
  Service,
} from "../../../api/ServicesService";
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import ServiceCard from "../components/Card/ServiceCard";
import PaginationFooter from "../components/Pagination/PaginationFooter";
import AddServiceForm from "../Forms/AddService";

const ServiceList: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Fetch services when component mounts or when currentPage changes
  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        const response = await getAllServices(currentPage);

        if (response.status === "success") {
          setServices(response.data);
          setPagination(response.pagination);
        }
      } catch (err: any) {
        setError(err.message || "Failed to fetch services.");
        setShowAlert(true);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [currentPage]);

  // Handle page changes for pagination
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
  };

  const handleCloseALert = () => {
    setShowAlert(false);
  };

  const navigate = useNavigate();

  // Navigate to edit page
  const handleSeeService = (id: number) => {
    navigate(`/manage-services/edit/${id}`);
  };
  // Navigate to edit page
  const handleEditService = (id: number) => {
    navigate(`/manage-services/edit/${id}`);
  };

  // Handle service deletion
  const handleDeleteService = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this service?"))
      return;

    try {
      await deleteService(id);
      setServices((prevServices) =>
        prevServices.filter((service) => service.id !== id)
      ); // Remove service from state
      setSuccess("Service deleted successfuly");
      setShowAlert(true);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (err: any) {
      console.error("Failed to delete Service", err);
      setError(err.messgae || "Failed to delete Service.");
      setShowAlert(true);
    }
  };

  const handleSuccess = (text: string) => {
    setSuccess(text);
    setShowAlert(true);
  };

  // Display loading indicator while fetching data
  if (loading) {
    return (
      <>
        <h5 className="text-center pt-5">Loading Services...</h5>
        <Spinner />;
      </>
    );
  }
  // Display error if an error occured
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
      <div className="row">
        <div className="d-flex justify-content-end align-items-center py-4 gap-4">
          <button
            className="btn btn-secondary add-new btn-primary"
            type="button"
            onClick={toggleAddForm}
          >
            <FaPlus className="me-2" />
            <span>Add Service</span>
          </button>
        </div>
      </div>
      {services.length === 0 ? (
        <h5 className="text-center pt-5">No Services available.</h5>
      ) : (
        <div className="row g-6">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              service={service}
              onSeeService={handleSeeService}
              onEditService={handleEditService}
              onDeleteService={handleDeleteService}
            />
          ))}
        </div>
      )}
      {/* Pagination */}
      {pagination && pagination.total > 10 && (
        <PaginationFooter
          pagination={pagination}
          onPageChange={handlePageChange}
        />
      )}
      {/* AddForm to add new user */}
      {showAddForm && (
        <AddServiceForm
          services={services}
          onClose={toggleAddForm}
          onSuccess={handleSuccess}
        />
      )}
    </>
  );
};

export default ServiceList;
