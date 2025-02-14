import React, { useEffect, useState } from "react";
import { getAllServices, Service } from "../../../api/ServicesService";
import Spinner from "../../components/Spinner";
import Alert from "../../components/Alert";
import EnrollServiceCard from "../components/Services section components/EnrollServicesCard";
import {
  Client,
  enrollService,
  getEnrolledServices,
} from "../../../api/Clients";

interface Props {
  client: Client;
}

const ServicesSection: React.FC<Props> = ({ client }) => {
  const [services, setServices] = useState<Service[]>([]);
  const [enrolledServices, setEnrolledServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      let allServices: Service[] = [];
      let currentpage = 0;
      try {
        do {
          const response = await getAllServices(currentpage);
          if (response.status === "success") {
            allServices = [...allServices, ...response.data];
            response.pagination.next_page_url !== null
              ? currentpage++
              : (currentpage = -1);
          } else {
            setError(response.message);
            setShowAlert(true);
            break;
          }
        } while (currentpage !== -1);

        setServices(allServices);

        const EnrolledServicesresponse =
          client.id && (await getEnrolledServices(client.id));

        if (EnrolledServicesresponse.status === "error") {
          setError(EnrolledServicesresponse.message);
          setShowAlert(true);
        }

        if (EnrolledServicesresponse.status === "success") {
          setEnrolledServices(EnrolledServicesresponse.data);
          const availableServices = allServices.filter(
            (service: Service) =>
              !EnrolledServicesresponse.data.some(
                (enrolledService: Service) => enrolledService.id === service.id
              )
          );
          setServices(availableServices);
        }
      } catch (err) {
        setError("Failed to fetch services.");
        setShowAlert(true);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const handleEnroll = async (serviceId: number) => {
    const response = client.id && (await enrollService(client.id, serviceId));

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    if (response.status === "error") {
      setError(response.message);
      setShowAlert(true);
      return;
    }

    if (response.status === "success") {
      setSuccess("Service enrolled successfully!");
      setShowAlert(true);

      // Add the enrolled service to the enrolledServices list
      const enrolledService: Service | undefined = services.find(
        (service) => service.id === serviceId
      );

      if (enrolledService) {
        // add the enrolled service to enrolled services
        setEnrolledServices((prevEnrolled) => [
          ...prevEnrolled,
          enrolledService,
        ]);

        // Remove the enrolled service from available services
        setServices((prevServices) =>
          prevServices.filter((service) => service.id !== enrolledService.id)
        );
      }
    }
  };

  if (loading) {
    return (
      <>
        <h5 className="text-center pt-5">Loading Services...</h5>
        <Spinner />
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
        onClose={handleCloseAlert}
      />
    );
  }

  return (
    <div className="row g-6 mt-5">
      {success && (
        <Alert
          showAlert={showAlert}
          type="success"
          heading={"Success:"}
          text={success}
          onClose={handleCloseAlert}
        />
      )}
      <div className="row">
        <h5>Enrolled Services</h5>
        {enrolledServices.map((service) => (
          <EnrollServiceCard
            key={service.id}
            service={service}
            enrolled={true}
            onEnroll={handleEnroll}
          />
        ))}
      </div>

      <div className="row mt-5">
        <h5>Available Services</h5>
        {services.map((service) => (
          <EnrollServiceCard
            key={service.id}
            service={service}
            enrolled={false}
            onEnroll={handleEnroll}
          />
        ))}
      </div>
    </div>
  );
};

export default ServicesSection;
