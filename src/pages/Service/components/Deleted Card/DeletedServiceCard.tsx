import React from "react";
import ServiceCardBody from "../Card/ServiceCardBody";
import ServiceCardFooter from "../Card/ServiceCardFooter";
import { Service } from "../../../../../api/Services";
import DeletedServiceCardHeader from "./DeletedServiceCardHeader";

interface Props {
  service: Service;
  onRestoreService: (id: number) => void;
  onForceDeleteService: (id: number) => void;
}

const DeletedServiceCard: React.FC<Props> = ({
  service,
  onRestoreService,
  onForceDeleteService,
}) => {
  return (
    <div className="col-xl-4 col-lg-6 col-md-6">
      <div className="card">
        <DeletedServiceCardHeader
          serviceId={service.id}
          serviceName={service.name}
          category={service.category}
          onRestoreService={onRestoreService}
          onForceDeleteService={onForceDeleteService}
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

export default DeletedServiceCard;
