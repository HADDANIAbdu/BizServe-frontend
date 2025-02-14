import React, { useEffect, useState } from "react";
import {
  deleteNotification,
  Notification,
} from "../../../api/NotificationsService";
import { formatDistanceToNow } from "date-fns";
import AddNotificationForm from "../components/Notification section component/AddNotification";

interface Props {
  client_id: number;
  notifications: Notification[];
}

const NotificationsSection: React.FC<Props> = ({
  client_id,
  notifications: initialNotifications,
}) => {
  const [notifications, setNotifications] =
    useState<Notification[]>(initialNotifications);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {}, [initialNotifications]);

  const handleNotificationDelete = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: number
  ) => {
    e.stopPropagation(); // Prevent triggering the notification click
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
    await deleteNotification(id);
  };

  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
  };

  return (
    <div className="card p-3">
      <div className="row">
        <ul className="px-5 show list-unstyled">
          <li className="dropdown-menu-header border-bottom">
            <div className="dropdown-header d-flex align-items-center py-3">
              <h6 className="m-0 me-auto">Notifications</h6>
              <div className="d-flex align-items-center h6 mb-0">
                <button
                  className="btn btn bg-primary text-white"
                  onClick={toggleAddForm}
                >
                  Add
                </button>
              </div>
            </div>
          </li>
          <li className="dropdown-notifications-list scrollable-container ps ps--active-y">
            <ul className="list-group list-group-flush">
              {notifications.map((notification) => (
                <li
                  key={notification.id}
                  className="list-group-item list-group-item-action dropdown-notifications-item"
                  style={{ cursor: "pointer" }}
                >
                  <div className="d-flex">
                    <div className="flex-shrink-0 me-3 d-flex align-items-center">
                      <div className="avatar">
                        <span className="avatar-initial rounded-circle bg-label-primary">
                          {notification.data.slice(0, 2).toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div className="flex-grow-1">
                      <h6 className="small mb-0">{notification.data}</h6>
                      <small className="text-muted mb-1 d-block text-body">
                        {notification.data}
                      </small>
                      <span
                        className={`badge bg-label-${
                          notification.type === "urgent" ? "danger" : "success"
                        } me-2`}
                      >
                        {notification.type}
                      </span>
                      <small className="text-muted">
                        {notification.sent_at &&
                          formatDistanceToNow(new Date(notification.sent_at), {
                            addSuffix: true,
                          })}
                      </small>
                    </div>
                    <div className="d-flex align-items-center jus">
                      {notification.read_at === null && (
                        <button
                          type="button"
                          className="btn p-0 badge badge-dot bg-primary"
                          style={{
                            width: "10px",
                            height: "10px",
                            borderRadius: "50%",
                          }}
                          aria-label="Mark as read"
                        ></button>
                      )}
                      <button
                        type="button"
                        className="btn-close text-primary"
                        aria-label="Close"
                        onClick={(e) => {
                          notification.id &&
                            handleNotificationDelete(e, notification.id);
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
      {showAddForm && (
        <AddNotificationForm
          client_id={client_id}
          notifications={notifications}
          onClose={toggleAddForm}
        />
      )}
    </div>
  );
};

export default NotificationsSection;
