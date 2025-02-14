import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthHook";
import Spinner from "./components/Spinner";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import UserPage from "./User";
import RolePage from "./Role";
import ClientPage from "./Client";
import SchedulePage from "./Schedule";
import Navbar from "./components/Navbar";
import HomePage from "./Home/HomePage";
import { useState } from "react";
import ServicePage from "./Service";
import AnalyticsPage from "./Analytics/AnalyticsPage";
import UserProfile from "./Profile/Profile";

const MainPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { isAuthenticated, logout, loading } = useAuth();

  // State for sidebar visibility
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  if (loading) {
    return <Spinner />; // Show loading spinner while checking authentication
  }

  if (!isAuthenticated) {
    navigate("/login");
  }

  const handleLogout = async () => {
    console.log("logout");
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.error("Failed to logout:", err);
    }
  };

  const handleToggle = async () => {
    console.log("toggled");
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Layout wrapper  */}

      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
          <Sidebar isOpen={isSidebarOpen} onToggle={handleToggle} />
          <div className="layout-page">
            <Navbar
              user={user}
              isSidebarOpen={isSidebarOpen}
              onLogout={handleLogout}
              onToggle={handleToggle}
            />
            <div className="content-wrapper">
              <Routes>
                <Route path="/" element={<HomePage user={user} />} />
                <Route path="/dashboard" element={<HomePage user={user} />} />
                <Route path="/analytics" element={<AnalyticsPage />} />
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/manage-users/*" element={<UserPage />} />
                <Route path="/manage-roles/*" element={<RolePage />} />
                <Route path="/manage-clients/*" element={<ClientPage />} />
                <Route path="/manage-services/*" element={<ServicePage />} />
                <Route path="/manage-schedules/*" element={<SchedulePage />} />
                <Route path="/*" element={<Navigate to="/404" />} />
              </Routes>
              <Footer />
            </div>
          </div>
        </div>
        {/* Overlay  */}
        <div className="layout-overlay layout-menu-toggle"></div>
      </div>
      {/* / Layout wrapper  */}
    </>
  );
};

export default MainPage;
