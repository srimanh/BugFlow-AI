import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const location = useLocation();
  // Hide Navbar on login and register
  const hideNavbar = ["/login", "/"].includes(location.pathname);
  return (
    <>  
      {!hideNavbar && <Navbar />}
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
    <ToastContainer position="bottom-right" />
    </>
  );
}
export default App;
