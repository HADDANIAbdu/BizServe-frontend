import React, { useEffect, useRef, useState } from "react";
import { FaChartBar, FaEllipsisV } from "react-icons/fa";
import { Interaction } from "../../../../api/Interactions";
import "./ProfileTimeLine.module.css";

interface Props {
  interactions: Interaction[];
  onMangeInteractions: () => void;
}

const ProfileTimeLine: React.FC<Props> = ({
  interactions,
  onMangeInteractions,
}) => {
  const [showText, setShowText] = useState<boolean | number>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [showAll, setShowAll] = useState(false);
  const displayedInteractions = showAll
    ? interactions
    : interactions.slice(0, 3);
  const handleClick = (interactionId: number) => {
    setShowText((prev) => (prev === interactionId ? false : interactionId));
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setShowText(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="card card-action mb-6">
      <div className="card-header align-items-center">
        <h5 className="card-action-title mb-0">
          <FaChartBar className="text-body me-4" />
          Interactions Timeline
        </h5>
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
                <button className="dropdown-item" onClick={onMangeInteractions}>
                  Manage Client interactions
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="card-body pt-3">
        {interactions.length === 0 ? (
          <span className="text-start text-primary pt-5">
            No interactions available.
          </span>
        ) : (
          <div className="timeline-container">
            <ul className="timeline mb-0">
              {displayedInteractions
                .sort((a, b) => {
                  const dateA = a.date_interaction
                    ? new Date(a.date_interaction).getTime()
                    : 0;
                  const dateB = b.date_interaction
                    ? new Date(b.date_interaction).getTime()
                    : 0;
                  return dateA - dateB;
                })
                .map((interaction) => (
                  <li
                    key={interaction.id}
                    className="timeline-item timeline-item-transparent d-flex border-bottom py-2"
                  >
                    <div className="timeline-container">
                      <button
                        className="btn p-0 badge badge-dot bg-info"
                        style={{
                          width: "10px",
                          height: "10px",
                          borderRadius: "50%",
                          margin: "7.5px 10px 0 0",
                        }}
                        aria-label="Mark as read"
                        onClick={() =>
                          interaction.id && handleClick(interaction.id)
                        }
                      ></button>
                      {showText === interaction.id && (
                        <div className="dropdown-menu show">
                          <span className="dropdown-item">
                            Details:{" "}
                            <small className="m-0">
                              {interaction.details || "no details"}
                            </small>
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="timeline-event">
                      <div className="timeline-header mb-3">
                        <h6 className="mb-0">
                          Service: {interaction.service?.name}
                        </h6>
                        <small className="text-muted">
                          {interaction.date_interaction &&
                            new Date(
                              interaction.date_interaction
                            ).toLocaleString()}
                        </small>
                      </div>
                      <p className="mb-2">
                        Outcome:{" "}
                        <span className="badge bg-label-info">
                          {interaction.outcome}{" "}
                        </span>
                      </p>
                    </div>
                  </li>
                ))}
            </ul>
            {!showAll && interactions.length > 5 && (
              <div className="d-flex justify-content-center">
                <button
                  className="btn btn-link"
                  onClick={() => setShowAll(true)}
                >
                  Show All
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileTimeLine;
