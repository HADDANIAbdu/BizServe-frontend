import { Navigate, Route, Routes } from "react-router-dom";
import "./Role.module.css";
import RoleList from "./lists/RoleList";
import DeletedRoleList from "./lists/DeletedRoleList";
import CreateRoleForm from "./From/AddRoleForm";
import EditRoleForm from "./From/EditRoleForm";

const RolePage = () => {
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <Routes>
        <Route path="/" element={<RoleList />} />
        <Route path="/deleted" element={<DeletedRoleList />} />
        <Route path="/create" element={<CreateRoleForm />} />
        <Route path="/edit/:id" element={<EditRoleForm />} />
        <Route path="/*" element={<Navigate to="/404" />} />

      </Routes>
    </div>
  );
};
export default RolePage;
