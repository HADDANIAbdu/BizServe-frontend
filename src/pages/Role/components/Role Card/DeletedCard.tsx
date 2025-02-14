import {
  BsChevronUp,
  BsChevronDown,
  BsTrash2,
  BsRecycle,
} from "react-icons/bs";
import "./Card.module.css";
import { Permission, Role } from "../../../../api/RolesService";

interface Props {
  role: Role;
  isExpanded: boolean;
  onToggle: () => void;
  onRestore: () => void;
  onForceDelete: () => 0 | Promise<void> | undefined;
}
const DeletedRoleCard = ({
  role,
  isExpanded,
  onToggle,
  onRestore,
  onForceDelete,
}: Props) => {
  return (
    <div className="card mb-3">
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
          {/* Card footer with Restore and delete buttons */}
          <div className="card-footer d-flex justify-content-center btn-group">
            <button
              className="btn btn-success btn-sm me-2 btn-icon"
              onClick={onRestore}
            >
              <BsRecycle className="icon" />
              <span className="btn-text">Restore</span>
            </button>
            <button
              className="btn btn-danger btn-sm btn-icon"
              onClick={onForceDelete}
            >
              <BsTrash2 className="icon" />
              <span className="btn-text">Force Delete</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default DeletedRoleCard;
