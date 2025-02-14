import React from "react";

interface ServiceCardBodyProps {
  price: number | undefined;
  description: string | undefined;
}

const ServiceCardBody: React.FC<ServiceCardBodyProps> = ({
  price,
  description,
}) => {
  return (
    <div className="card-body">
      <div className="d-flex align-items-center flex-wrap">
        <div className="bg-lighter px-3 py-2 rounded me-auto mb-4">
          <p className="mb-1">
            <span className="fw-medium text-heading">Price: </span> ${price}
          </p>
        </div>
      </div>
      <p className="mb-0">
        {description && description.length > 100
          ? description.substring(0, 100) + "..."
          : description}
      </p>
    </div>
  );
};

export default ServiceCardBody;
