import React from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { Pagination } from "../../../../api/base";

interface Props {
  pagination: Pagination;
  onPageChange: (page: number) => void;
}

const PaginationFooter: React.FC<Props> = ({ pagination, onPageChange }) => {
  const pageNumbers = Array.from(
    { length: pagination.last_page },
    (_, i) => i + 1
  );

  const handleClick = (page: number) => {
    if (page !== pagination.current_page) {
      onPageChange(page);
    }
  };

  const handlePrevious = () => {
    if (pagination.current_page > 1) {
      onPageChange(pagination.current_page - 1);
    }
  };

  const handleNext = () => {
    if (pagination.current_page < pagination.last_page) {
      onPageChange(pagination.current_page + 1);
    }
  };

  return (
    <div className="row mt-5">
      <div className="col-sm-12 col-md-6">
        <div className="dataTables_info" role="status" aria-live="polite">
          Showing {(pagination.current_page - 1) * 10} to{" "}
          {Math.min(pagination.current_page * 10, pagination.last_page * 10)} of{" "}
          {pagination.total} entries
        </div>
      </div>
      <div className="col-sm-12 col-md-6">
        <div className="dataTables_paginate paging_simple_numbers">
          <ul className="pagination">
            <li
              className={`paginate_button page-item previous ${
                pagination.current_page === 1 ? "disabled" : ""
              }`}
            >
              <button
                onClick={handlePrevious}
                role="link"
                aria-disabled={pagination.current_page === 1}
                className="page-link"
              >
                <BsChevronLeft size={18} />
              </button>
            </li>

            {pageNumbers.map((page) => (
              <li
                key={page}
                className={`paginate_button page-item ${
                  page === pagination.current_page ? "active" : ""
                }`}
              >
                <button
                  onClick={() => handleClick(page)}
                  role="link"
                  aria-current={
                    page === pagination.current_page ? "page" : undefined
                  }
                  className="page-link"
                >
                  {page}
                </button>
              </li>
            ))}

            <li
              className={`paginate_button page-item next ${
                pagination.current_page === pagination.last_page
                  ? "disabled"
                  : ""
              }`}
            >
              <button
                onClick={handleNext}
                role="link"
                aria-disabled={pagination.current_page === pagination.last_page}
                className="page-link"
              >
                <BsChevronRight size={18} />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PaginationFooter;
