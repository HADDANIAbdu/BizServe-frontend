import React from "react";
import { Permission } from "../../../../api/RolesService";

interface PermissionsListProps {
  permissions: Record<string, Permission[]>;
  selectedPermissions: Permission[];
  handlePermissionsChange: (permission: Permission) => void;
  error?: string;
}

const PermissionsList: React.FC<PermissionsListProps> = ({
  permissions,
  selectedPermissions,
  handlePermissionsChange,
  error,
}) => {
  return (
    <>
      {error && <p className="text-danger">{error}</p>}
      {Object.keys(permissions).map((context: string) => (
        <div key={context} className="col-12 mb-4">
          <div className="d-flex justify-content-between align-items-center">
            <span className="text-primary">{context} permissions</span>
          </div>
          <div className="row mt-2">
            {permissions[context].map((permission: Permission) => (
              <div key={permission.id} className="col-md-3 col-sm-6 mb-2">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={`permission-${permission.id}`}
                    value={permission.id}
                    checked={selectedPermissions.some(
                      (selected) => selected.id === permission.id
                    )}
                    onChange={() => handlePermissionsChange(permission)}
                  />
                  <label
                    htmlFor={`permission-${permission.id}`}
                    className="form-check-label"
                  >
                    {permission.name}
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default PermissionsList;
