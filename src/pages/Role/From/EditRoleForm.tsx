import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Permission,
  UpdateRole,
  getAllPermissions,
  getRoleById,
  updateRole,
} from "../../../api/RolesService";
import PermissionsList from "../components/Permission Grid/list";
import Alert from "../../components/Alert";
import Spinner from "../../components/Spinner";

const EditRoleForm: React.FC = () => {
  const { id: urlId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [permissions, setPermissions] = useState<Record<string, Permission[]>>(
    {}
  );
  const [selectedPermissions, setSelectedPermissions] = useState<Permission[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [formData, setFormData] = useState<UpdateRole>({
    name: "",
    permissions: [],
  });

  useEffect(() => {
    const fetchRole = async () => {
      setLoading(true);
      try {
        const permissionsResponse = await getAllPermissions();

        if (permissionsResponse.status === "error") {
          setError(permissionsResponse.message);
          setShowAlert(true);
        }
        if (permissionsResponse.status === "success") {
          setPermissions(permissionsResponse.data);
        }

        const roleResponse = await getRoleById(parseInt(urlId!));

        if (roleResponse.status === "error") {
          setError(roleResponse.errors);
          setShowAlert(true);
        }

        const role = roleResponse.data;
        setSelectedPermissions(role.permissions);
        setFormData({
          name: role.name,
          permissions: [...role.permissions],
        });
      } catch (err) {
        console.log("Error fetching role data", err);
        setError("An error occurred while fetching the role.");
        setShowAlert(true);
      } finally {
        setLoading(false);
      }
    };

    fetchRole();
  }, [urlId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(null);
    setShowAlert(false);
  };

  const handlePermissionsChange = (permission: Permission) => {
    setError(null);
    setShowAlert(false);
    if (selectedPermissions.some((selected) => selected.id === permission.id)) {
      setSelectedPermissions(
        selectedPermissions.filter(
          (filtredPermission) => filtredPermission.id !== permission.id
        )
      ); // Uncheck role
    } else {
      setSelectedPermissions([...selectedPermissions, permission]); // Check role
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    try {
      const updatedData = {
        ...formData,
        permissions: selectedPermissions,
      };

      const response = await updateRole(parseInt(urlId!), updatedData);
      if (response.status === "success") {
        setSuccess("Role updated successfully!");
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
          navigate("/manage-roles");
        }, 2000);
      }
    } catch (err: any) {
      setError("An error occurred while updating  the role.");
      console.log("Error editing role");
      console.log(err);

      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseALert = () => {
    setShowAlert(false);
  };

  if (loading) {
    return (
      <>
        <h5 className="text-center p-5">Getting role info...</h5>
        <Spinner />
      </>
    );
  }

  return (
    <div className="container mt-4">
      {success && (
        <Alert
          showAlert={showAlert}
          type="success"
          heading={"Success :"}
          text={success}
          onClose={handleCloseALert}
        />
      )}
      {error && typeof error === "string" && (
        <Alert
          showAlert={showAlert}
          type="danger"
          heading={"Error :"}
          text={error}
          onClose={handleCloseALert}
        />
      )}
      <div className="card p-5">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className={`form-control ${error?.name ? "is-invalid" : ""}`}
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            {error?.name && (
              <div className="invalid-feedback">{error.name}</div>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Permissions</label>
            <PermissionsList
              permissions={permissions}
              selectedPermissions={selectedPermissions}
              handlePermissionsChange={handlePermissionsChange}
              error={error?.permissions}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Update Role
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditRoleForm;
