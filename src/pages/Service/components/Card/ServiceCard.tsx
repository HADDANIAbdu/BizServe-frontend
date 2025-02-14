import React from "react";
import ServiceCardHeader from "./ServiceCardHeader";
import ServiceCardBody from "./ServiceCardBody";
import ServiceCardFooter from "./ServiceCardFooter";
import { Service } from "../../../../api/ServicesService";

interface Props {
  service: Service;
  onSeeService: (id: number) => void;
  onEditService: (id: number) => void;
  onDeleteService: (id: number) => void;
}

const ServiceCard: React.FC<Props> = ({
  service,
  onSeeService,
  onEditService,
  onDeleteService,
}) => {
  return (
    <div className="col-xl-4 col-lg-6 col-md-6">
      <div className="card">
        <ServiceCardHeader
          serviceId={service.id}
          serviceName={service.name}
          category={service.category}
          onSeeService={onSeeService}
          onDeleteService={onDeleteService}
          onEditService={onEditService}
        />
        <ServiceCardBody
          price={service.price}
          description={service.description}
        />
        <ServiceCardFooter
          clients={service.clients}
          clientCount={service.clients && service.clients.length}
        />
      </div>
    </div>
  );
};

export default ServiceCard;
