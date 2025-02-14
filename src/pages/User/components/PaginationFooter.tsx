import React from "react";
import { IconType } from "react-icons";

interface PaginationProps {
  currentPage: number;
  totalPages: number ;
  onPageChange: (page: number) => void;
  PreviousIcon: IconType;
  NextIcon: IconType;
}

const PaginationFooter: React.FC<PaginationProps> = ({
  currentPage,
  totalPages = 1,
  onPageChange,
  PreviousIcon,
  NextIcon,
}) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handleClick = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="row mt-3">
      <div className="col-sm-12 col-md-6">
        <div className="dataTables_info mt-1" role="status" aria-live="polite">
          Showing {currentPage} to {Math.min(currentPage * 10, totalPages * 10)}{" "}
          of {totalPages * 10} entries
        </div>
      </div>
      <div className="col-sm-12 col-md-6">
        <div className="dataTables_paginate paging_simple_numbers">
          <ul className="pagination">
            <li
              className={`paginate_button page-item previous ${
                currentPage === 1 ? "disabled" : ""
              }`}
            >
              <a
                onClick={handlePrevious}
                role="link"
                aria-disabled={currentPage === 1}
                className="page-link"
              >
                <PreviousIcon size={18} />
              </a>
            </li>

            {pageNumbers.map((page) => (
              <li
                key={page}
                className={`paginate_button page-item ${
                  page === currentPage ? "active" : ""
                }`}
              >
                <a
                  onClick={() => handleClick(page)}
                  role="link"
                  aria-current={page === currentPage ? "page" : undefined}
                  className="page-link"
                >
                  {page}
                </a>
              </li>
            ))}

            <li
              className={`paginate_button page-item next ${
                currentPage === totalPages ? "disabled" : ""
              }`}
            >
              <a
                onClick={handleNext}
                role="link"
                aria-disabled={currentPage === totalPages}
                className="page-link"
              >
                <NextIcon size={18} />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PaginationFooter;
