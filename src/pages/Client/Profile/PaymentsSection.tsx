import React, { useEffect, useState } from "react";
import { deletePayment, Payment } from "../../../api/PaymentsService";

interface Props {
  client_id: number;
  payments: Payment[];
}

const PaymentsSection: React.FC<Props> = ({
  client_id,
  payments: initialPayments,
}) => {
  const [payments, setPayments] = useState<Payment[]>(initialPayments);

  useEffect(() => {
    setPayments(initialPayments);
  }, [initialPayments]);

  const handlePaymentDelete = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: number
  ) => {
    e.stopPropagation();
    await deletePayment(id);
    setPayments((prev) => prev.filter((payment) => payment.id !== id));
  };

  return (
    <div className="card p-3">
      <div className="row">
        <ul className="px-5 show list-unstyled">
          <li className="dropdown-menu-header border-bottom">
            <div className="dropdown-header d-flex align-items-center py-3">
              <h6 className="m-0 me-auto">Payment</h6>
              <div className="d-flex align-items-center h6 mb-0">
                {/* <button
                  className="btn btn bg-primary text-white"
                  onClick={handleToggleAddForm}
                >
                  Add
                </button> */}
              </div>
            </div>
          </li>
          <li className="dropdown-notifications-list scrollable-container ps ps--active-y">
            <ul className="list-group list-group-flush">
              {payments.map((payment) => (
                <li
                  key={payment.id}
                  className="list-group-item list-group-item-action dropdown-notifications-item"
                  style={{ cursor: "pointer" }}
                  // onClick={() => handleEditFormToggle(payment)}
                >
                  <div className="d-flex ">
                    <div className="flex-shrink-0 me-3 d-flex align-items-center">
                      <div className="avatar">
                        <span className="avatar-initial rounded-circle bg-label-secondary">
                          {payment.service?.name &&
                          payment.service?.name.length > 3
                            ? `${payment.service.name[0].toUpperCase()} ..`
                            : payment.service?.name}
                        </span>
                      </div>
                    </div>
                    <div className="flex-grow-1 ">
                      <div className="py-2">
                        <h6 className="small mb-0">{payment.service?.name}</h6>
                        <small className="text-muted">
                          {payment.payment_schedules &&
                          payment.payment_schedules.length
                            ? payment.payment_schedules.length
                            : "no payment schedule"}
                        </small>
                      </div>
                      <span className={`badge bg-label-danger me-2`}>
                        ${payment.total_amount}
                      </span>
                    </div>
                    <div className="d-flex align-items-center">
                      <button
                        type="button"
                        className="btn-close text-primary"
                        aria-label="Close"
                        onClick={(e) => {
                          payment.id && handlePaymentDelete(e, payment.id);
                        }}
                      ></button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PaymentsSection;
