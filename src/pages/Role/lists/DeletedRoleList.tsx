import React, { useState, useEffect } from "react";
import Spinner from "../../components/Spinner";
import {
  Role,
  forceDeleteRole,
  getDeletedRoles,
  restoreRole,
} from "../../../api/RolesService";
import DeletedRoleCard from "../components/Role Card/DeletedCard";
import Alert from "../../components/Alert";

const DeletedRoleList: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [expandedRoleId, setExpandedRoleId] = useState<number | null>(null); // Track expanded role for showing permissions

  // Fetch all deleted roles
  useEffect(() => {
    const fetchRoles = async () => {
      setLoading(true);
      try {
        const response = await getDeletedRoles();

        if (response.status === "success") {
          setRoles(response.data);
        }
      } catch (err: any) {
        setError(err.message || "Failed to fetch roles.");
        setShowAlert(true);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
  }, []);

  const handleRestore = async (id: number) => {
    try {
      await restoreRole(id);
      setRoles((prevRoles) => prevRoles.filter((role) => role.id !== id)); // Remove role from state
    } catch (err: any) {
      console.error("Failed to delete role", err);
      setError(err.message || "Failed to delete role.");
    }
  };

  // Handle role deletion
  const handleForceDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this role permantly?"))
      return;

    try {
      await forceDeleteRole(id);
      setRoles((prevRoles) => prevRoles.filter((role) => role.id !== id)); // Remove role from state
      setSuccess("Role deleted successfully");
      setShowAlert(true);
    } catch (err: any) {
      console.error("Failed to delete role", err);
      setError(err.message || "Failed to delete role.");
    }
  };

  // Toggle role's permissions visibility
  const toggleRolePermissions = (id: number) => {
    setExpandedRoleId(expandedRoleId === id ? null : id); // Toggle expanded role
  };

  // Display loading indicator while fetching data
  if (loading) {
    return (
      <>
        <h5 className="text-center pt-5">Loading roles...</h5>
        <Spinner />;
      </>
    );
  }

  // Display error if an error occurred
  if (error) {
    return (
      <Alert
        showAlert={showAlert}
        type="danger"
        heading={"Error:"}
        text={error}
        onClose={() => setShowAlert(false)}
      />
    );
  }

  return (
    <div className="container mt-4">
      {success && (
        <Alert
          showAlert={showAlert}
          type="success"
          heading={"Success:"}
          text={success}
          onClose={() => setShowAlert(false)}
        />
      )}
      {roles.length === 0 ? (
        <h5 className="text-center pt-5">No roles available.</h5>
      ) : (
        <div className="row">
          {roles.map((role) => {
            const isExpanded = expandedRoleId === role.id;
            return (
              <div key={role.id} className="col-md-4 mb-4">
                <DeletedRoleCard
                  role={role}
                  isExpanded={isExpanded}
                  onToggle={() => {
                    role.id && toggleRolePermissions(role.id);
                  }}
                  onRestore={() => role.id && handleRestore(role.id)}
                  onForceDelete={() => role.id && handleForceDelete(role.id)}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DeletedRoleList;
