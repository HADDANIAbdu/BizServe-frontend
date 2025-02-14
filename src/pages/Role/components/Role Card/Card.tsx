import {
  BsChevronUp,
  BsChevronDown,
  BsPencilSquare,
  BsTrash2,
} from "react-icons/bs";
import { Permission, Role } from "../../../../api/RolesService";

interface Props {
  role: Role;
  isExpanded: boolean;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => 0 | Promise<void> | undefined;
}
const RoleCard = ({ role, isExpanded, onToggle, onEdit, onDelete }: Props) => {
  return (
    <div className="card mb-6">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="mb-0">{role.name}</h5>
        <button className="btn btn-link" onClick={onToggle}>
          {isExpanded ? <BsChevronUp size={20} /> : <BsChevronDown size={20} />}
        </button>
      </div>

      {/* Card body with permissions */}
      {isExpanded && (
        <>
          <div className="card-body">
            {role.permissions && role.permissions.length > 0 ? (
              <>
                <h6>Permissions</h6>
                <p>
                  {role.permissions
                    .map((permission: Permission) => {
                      return permission.name;
                    })
                    .join(", ")}
                </p>
              </>
            ) : (
              <p>No permissions assigned to this role.</p>
            )}
          </div>
          {/* Card footer with edit and delete buttons */}
          <div className="card-footer d-flex justify-content-center">
            <button className="btn btn-warning btn-sm me-2" onClick={onEdit}>
              <BsPencilSquare /> Edit
            </button>
            <button className="btn btn-danger btn-sm" onClick={onDelete}>
              <BsTrash2 /> Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default RoleCard;
