import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import App from "./App";
import SplashScreen from "../SPLASHSCREEN/SplashScreen";
import LoginPage from "../LOGINPAGE/LoginPage";
import CameraCapture from "../CAMERACAPTURE/CameraCapture";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cameracapture" element={<CameraCapture />} />
        <Route path="/exam" element={<App />} />
      </Routes>

      {/* ✅ Toastify container (works across all pages) */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="colored"
      />
    </BrowserRouter>
  </React.StrictMode>
);
