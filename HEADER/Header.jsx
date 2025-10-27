import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Header.css";

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // ✅ Clear authentication/session data
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    sessionStorage.clear();

    // ✅ Blue-themed toast message
    toast.success("✅ Logged out successfully!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      style: {
        backgroundColor: "#0077b6",
        color: "#ffffff",
        fontWeight: "600",
        borderRadius: "8px",
      },
      icon: "🚀",
    });

    // ✅ Delay redirect so toast can display
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <header className="header">
      <div className="header-left">
        <h1>ULTRACBT</h1>
      </div>
      <div className="header-right">
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}

export default Header;
