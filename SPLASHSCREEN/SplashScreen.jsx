import React, { useEffect } from "react";
import "./SplashScreen.css";
import { useNavigate } from "react-router-dom";

function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    // After 3 seconds, move to login page
    const timer = setTimeout(() => {
      navigate("/login");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="splash-container">
      <h1 className="splash-title">Ultra CBT Proctor App</h1>
      <div className="loader"></div>
    </div>
  );
}

export default SplashScreen;
