import React, { useState } from "react";
import { Payment } from "../../../../api/PaymentsService";
import paylogo from "../../../../assets/img/elements/11.jpg";
import { FaEllipsisV } from "react-icons/fa";
interface Props {
  payments: Payment[];
  onManagePayments: () => void;
}

const ProfilePayments: React.FC<Props> = ({ payments, onManagePayments }) => {
  const [showAll, setShowAll] = useState<boolean>(false);
  const displayedPayments = showAll ? payments : payments.slice(0, 5);
  return (
    <div className="col-lg-12 col-xl-6">
      {" "}
      <div className="card card-action mb-6">
        <div className="card-header align-items-center">
          <h5 className="card-action-title mb-0">Payments</h5>
          <div className="card-action-element">
            <div className="dropdown">
              <button
                type="button"
                className="btn btn-icon btn-text-secondary dropdown-toggle hide-arrow p-0"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <FaEllipsisV className="text-muted" />
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <button className="dropdown-item" onClick={onManagePayments}>
                    Manage Payments
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="card-body">
          {payments.length === 0 ? (
            <span className="text-start text-primary pt-5">
              No payments available.
            </span>
          ) : (
            <>
              <ul className="list-unstyled mb-0">
                {displayedPayments.map((payment) => (
                  <li key={payment.id} className="mb-4">
                    <li className="mb-4">
                      <div className="d-flex align-items-center">
                        <div className="d-flex align-items-center">
                          <div className="avatar me-2">
                            <img
                              src={paylogo}
                              alt="Avatar"
                              className="rounded-circle"
                            />
                          </div>
                          <div className="me-2">
                            <h6 className="mb-0">{payment.service.name}</h6>
                            <small>left: {payment.total_amount}</small>
                          </div>
                        </div>
                        <div className="ms-auto">
                          <span className={`badge bg-label-danger`}>
                            ${payment.total_amount}
                          </span>
                        </div>
                      </div>
                    </li>
                  </li>
                ))}
                {payments.length > 5 && !showAll && (
                  <li className="text-center">
                    <button
                      className="btn btn-link"
                      onClick={() => setShowAll(true)}
                    >
                      View more payments
                    </button>
                  </li>
                )}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePayments;
