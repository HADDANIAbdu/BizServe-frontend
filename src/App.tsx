import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/index";
import Page500 from "./pages/Error/Page500";
import Page404 from "./pages/Error/Page404";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

// Import CSS files
import "bootstrap/dist/css/bootstrap.css";
import "boxicons/css/boxicons.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import "./assets/vendor/css/core.css";
import "./assets/vendor/css/theme-default.css";
import "./assets/css/demo.css";
// Import JS files if needed
import "bootstrap/dist/js/bootstrap.bundle.js";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/500" element={<Page500 />} />
        <Route path="/404" element={<Page404 />} />
        <Route path="/*" element={<MainPage />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
