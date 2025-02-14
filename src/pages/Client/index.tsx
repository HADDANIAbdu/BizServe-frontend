import { Route, Routes } from "react-router-dom";
import "./Client.module.css";
import ClientsList from "./Lists/ClientsList";
import Duplicates from "./Lists/Duplicates";
import DeletedClientsList from "./Lists/DeletedClientsList";
import EditClientForm from "./Forms/EditClient";
import ClientProfile from "./Profile/Profile";

const ClientPage = () => {
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <Routes>
        <Route path="/" element={<ClientsList />} />
        <Route path="/check-duplicates" element={<Duplicates />}></Route>
        <Route path="/deleted" element={<DeletedClientsList />} />
        <Route path="/profile/:id" element={<ClientProfile />} />
        <Route path="/edit/:id" element={<EditClientForm />} />
        {/* // <Route path="/*" element={<Navigate to="/404" />} /> */}
      </Routes>
    </div>
  );
};
export default ClientPage;
