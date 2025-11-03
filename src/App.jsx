// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import SplashScreen from "../SPLASHSCREEN/SplashScreen";
import LoginPage from "../LOGINPAGE/LoginPage";
import CameraCapture from "../CAMERACAPTURE/CameraCapture";
import StudentDetails from "../STUDENTDETAILS/StudentDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SplashScreen />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/cameracapture" element={<CameraCapture />} />
      <Route path="/student/:id" element={<StudentDetails />} />
    </Routes>
  );
}

export default App;
