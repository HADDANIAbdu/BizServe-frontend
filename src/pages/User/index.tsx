import { Navigate, Route, Routes } from "react-router-dom";
import "./User.module.css";
import UserList from "./Lists/UsersList";
import DeletedUsersList from "./Lists/DeletedUsersList";
import EditUserForm from "./Forms/EditUserForm";
import UserProfile from "./Profile/Profile";

const UserPage = () => {
  return (
      <div className="container-xxl flex-grow-1 container-p-y">
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/deleted" element={<DeletedUsersList />} />
          <Route path="/profile/:id" element={<UserProfile />} />
          <Route path="/edit/:id" element={<EditUserForm />} />
          <Route path="/*" element={<Navigate to="/404" />} />
        </Routes>
      </div>
  );
};
export default UserPage;
