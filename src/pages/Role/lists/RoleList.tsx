import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner";
import { Role, deleteRole, getAllRoles } from "../../../api/RolesService";
import RoleCard from "../components/Role Card/Card";
import { FaPlus } from "react-icons/fa6";
import Alert from "../../components/Alert";

const RoleList: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [expandedRoleId, setExpandedRoleId] = useState<number | null>(null); // Track expanded role for showing permissions
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const navigate = useNavigate();

  // Fetch roles when component mounts
  useEffect(() => {
    const fetchRoles = async () => {
      setLoading(true);
      try {
        const response = await getAllRoles();

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

  // Navigate to edit page
  const handleEdit = (id: number) => {
    navigate(`/manage-roles/edit/${id}`);
  };

  // Handle role deletion
  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this role?")) return;

    try {
      await deleteRole(id);
      setRoles((prevRoles) => prevRoles.filter((role) => role.id !== id)); // Remove role from state
      setSuccess("Role deleted successfully");
      setShowAlert(true);
    } catch (err: any) {
      console.error("Failed to delete role", err);
      setError(err.message || "Failed to delete role.");
      setShowAlert(true);
    }
  };

  // Toggle role's permissions visibility
  const toggleRolePermissions = (id: number) => {
    setExpandedRoleId(expandedRoleId === id ? null : id);
  };

  const handleCreate = () => {
    navigate(`/manage-roles/create/`);
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
      <div className="row">
        <div className="d-flex justify-content-end align-items-center py-4 gap-4">
          <button
            className="btn btn-secondary add-new btn-primary"
            type="button"
            onClick={handleCreate}
          >
            <FaPlus className="me-2" />
            <span>Add New Role</span>
          </button>
        </div>
      </div>
      {roles.length === 0 ? (
        <h5 className="text-center pt-5">No roles available.</h5>
      ) : (
        <div className="row">
          {roles.map((role) => {
            const isExpanded = expandedRoleId === role.id;
            return (
              <div key={role.id} className="col-md-4 mb-4">
                {" "}
                <RoleCard
                  role={role}
                  isExpanded={isExpanded}
                  onToggle={() => {
                    role.id && toggleRolePermissions(role.id);
                  }}
                  onEdit={() => role.id && handleEdit(role.id)}
                  onDelete={() => role.id && handleDelete(role.id)}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RoleList;
