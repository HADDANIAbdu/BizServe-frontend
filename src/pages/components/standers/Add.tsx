import React from "react";

interface AddUserFormProps {
  onClose: () => void;
}

const AddUserForm: React.FC<AddUserFormProps> = ({ onClose }) => {
  return (
    <div
      className="offcanvas offcanvas-end show"
      tabIndex={-1}
      id="offcanvasAddUser"
    >
      <div className="offcanvas-header border-bottom">
        <h5 id="offcanvasAddUserLabel" className="offcanvas-title">
          Add User
        </h5>
        <button type="button" className="btn-close" onClick={onClose}></button>
      </div>
      <div className="offcanvas-body p-6">
        <form
          className="add-new-user"
          id="addNewUserForm"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="mb-6">
            <label className="form-label" htmlFor="add-user-username">
              Userame
            </label>
            <input
              type="text"
              className="form-control"
              id="add-user-username"
              placeholder="John Doe"
              name="userusername"
            />
          </div>
          <div className="mb-6">
            <label className="form-label" htmlFor="add-user-email">
              Email
            </label>
            <input
              type="email"
              id="add-user-email"
              className="form-control"
              placeholder="john.doe@example.com"
              name="userEmail"
            />
          </div>
          <div className="mb-6">
            <label className="form-label" htmlFor="add-user-email">
              Password
            </label>
            <input
              type="password"
              id="add-user-email"
              className="form-control"
              name="userEmail"
            />
          </div>
          <div className="mb-6">
            <label className="form-label" htmlFor="add-user-email">
              Password Confirmation
            </label>
            <input
              type="password"
              id="add-user-email"
              className="form-control"
              name="userEmail"
            />
          </div>
          <div className="mb-6">
            <label className="form-label" htmlFor="user-role">
              User Role
            </label>
            <select id="user-role" className="form-select">
              <option value="author">Author</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary me-3">
            Submit
          </button>
          <button
            type="reset"
            className="btn btn-label-danger"
            onClick={onClose}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUserForm;
