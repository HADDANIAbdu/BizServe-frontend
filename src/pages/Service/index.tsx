import { Route, Routes } from "react-router-dom";
import ServiceList from "./Lists/ServiceList";
import "./Service.module.css";
import DeletedServicesList from "./Lists/DeletedServicesList";
import EditServiceForm from "./Forms/EditService";

const ServicePage = () => {
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <Routes>
        <Route path="/" element={<ServiceList />} />
        <Route path="/deleted" element={<DeletedServicesList />} />
        <Route path="/edit/:id" element={<EditServiceForm />} />
      </Routes>
    </div>
  );
};
export default ServicePage;
