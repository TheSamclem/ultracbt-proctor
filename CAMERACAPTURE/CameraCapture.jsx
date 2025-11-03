import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../HEADER/Header";
import "./CameraCapture.css";

const mockStudents = [
  { id: 1, name: "Ayokunle Adebolu", regNo: "UCBT/001" },
  { id: 2, name: "Samuel Clement", regNo: "UCBT/002" },
  { id: 3, name: "Ayodeji Adebolu", regNo: "UCBT/003" },
  { id: 4, name: "Oladapo Adebolu", regNo: "UCBT/004" },
  { id: 5, name: "Adebayo Adebolu", regNo: "UCBT/005" },
  { id: 6, name: "Bankole Adebolu", regNo: "UCBT/006" },
];

export default function CameraCapture() {
  const navigate = useNavigate();
  const videoRefs = useRef([]);

  useEffect(() => {
    // Access webcam feed for all video elements
    async function setupCameras() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRefs.current.forEach((video) => {
          if (video) video.srcObject = stream;
        });
      } catch (err) {
        console.error("Camera access denied:", err);
      }
    }
    setupCameras();
  }, []);

  const handleStudentClick = (student) => {
    navigate(`/student/${student.id}`, { state: { student } });
  };

  return (
    <div>
      <Header />
      <div className="camera-container">
        {mockStudents.map((student, index) => (
          <div
            key={student.id}
            className="student-card"
            onClick={() => handleStudentClick(student)}
          >
            <div className="video-wrapper">
              <video
                ref={(el) => (videoRefs.current[index] = el)}
                className="student-video"
                autoPlay
                muted
              ></video>

              {/* Mic activity beside each video */}
              <div className="mic-container">
                <div className="mic-bar"></div>
                <div className="mic-bar"></div>
                <div className="mic-bar"></div>
              </div>
            </div>

            <div className="student-info">
              <p className="student-name">{student.name}</p>
              <p className="student-reg">{student.regNo}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
