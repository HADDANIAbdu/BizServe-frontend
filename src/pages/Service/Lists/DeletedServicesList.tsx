import React, { useEffect, useState } from "react";
import { Pagination } from "../../../api/base";
import Spinner from "../../components/Spinner";
import Alert from "../../components/Alert";
import {
  forceDeleteService,
  getDeletedServices,
  restoreService,
  Service,
} from "../../../api/ServicesService";
import DeletedServiceCard from "../components/Deleted Card/DeletedServiceCard";
import PaginationFooter from "../components/Pagination/PaginationFooter";

const DeletedServicesList: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Fetch all deleted services when component mounts or when currentPage changes
  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        const response = await getDeletedServices(currentPage);

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

  const handleCloseALert = () => {
    setShowAlert(false);
  };

  // Handle service deletion
  const handleFordeDeleteService = async (id: number) => {
    if (
      !window.confirm("Are you sure you want to permnatly delete this service?")
    )
      return;

    try {
      await forceDeleteService(id);
      setServices((prevServices) =>
        prevServices.filter((service) => service.id !== id)
      ); // Remove service from state
      setSuccess("Service deleted successfuly");
      setShowAlert(true);
    } catch (err) {
      console.error("Failed to delete Service", err);
      setError("Failed to delete Service.");
      setShowAlert(true);
    }
  };

  // Handle service deletion
  const handleRestoreService = async (id: number) => {
    try {
      await restoreService(id);
      setServices((prevServices) =>
        prevServices.filter((service) => service.id !== id)
      ); // Remove service from state
      setSuccess("Service resored successfuly");
      setShowAlert(true);
    } catch (err) {
      console.error("Failed to restore Service", err);
      setError("Failed to restore Service." + err);
      setShowAlert(true);
    }
  };

  // Display loading indicator while fetching data
  if (loading) {
    return (
      <>
        <h5 className="text-center pt-5">Loading deleted Services...</h5>
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
      )}{" "}
      {error && (
        <Alert
          showAlert={showAlert}
          type="danger"
          heading={"Error:"}
          text={error}
          onClose={handleCloseALert}
        />
      )}
      {services.length === 0 ? (
        <h5 className="text-center pt-5">No Services available.</h5>
      ) : (
        <div className="row g-6">
          {services.map((service, index) => (
            <DeletedServiceCard
              key={index}
              service={service}
              onRestoreService={handleRestoreService}
              onForceDeleteService={handleFordeDeleteService}
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
    </>
  );
};

export default DeletedServicesList;
