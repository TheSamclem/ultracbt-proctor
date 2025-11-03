import React, { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../HEADER/Header";
import "./StudentDetails.css";

const mockStudents = [
  {
    id: 1,
    name: "Ayokunle Adebolu",
    regNo: "UCBT/001",
    department: "Computer Science",
    level: "400L",
    email: "ayofullhouse@example.com",
    exam: "Software Engineering",
  },
  {
    id: 2,
    name: "Samuel Clement",
    regNo: "UCBT/002",
    department: "Information Technology",
    level: "300L",
    email: "samclem@example.com",
    exam: "Database Systems",
  },
  {
    id: 3,
    name: "Ayodeji Adebolu",
    regNo: "UCBT/003",
    department: "Computer Engineering",
    level: "400L",
    email: "ayodeji@example.com",
    exam: "Digital Logic Design",
  },
  {
    id: 4,
    name: "Oladapo Adebolu",
    regNo: "UCBT/004",
    department: "Cyber Security",
    level: "200L",
    email: "Oladapo@example.com",
    exam: "Network Security",
  },
  {
    id: 5,
    name: "Adebayo Adebolu",
    regNo: "UCBT/005",
    department: "Software Engineering",
    level: "400L",
    email: "Adebayo@example.com",
    exam: "AI and Machine Learning",
  },
  {
    id: 6,
    name: "Bankole Adebolu",
    regNo: "UCBT/006",
    department: "Computer Science",
    level: "300L",
    email: "Bankole@example.com",
    exam: "Web Development",
  },
];

export default function StudentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const videoRef = useRef(null);

  // Find student by ID
  const student = mockStudents.find((s) => s.id === Number(id));

  useEffect(() => {
    async function enableCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) videoRef.current.srcObject = stream;
      } catch (err) {
        console.error("Unable to access camera:", err);
      }
    }
    enableCamera();
  }, []);

  if (!student) {
    return (
      <div>
        <Header />
        <div className="student-details-container">
          <p>Student not found.</p>
          <button className="back-button" onClick={() => navigate("/cameracapture")}>
            ← Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="student-details-container">
        {/* Left Side — Student Info */}
        <div className="student-info-section">
          <h2>{student.name}</h2>
          <p><strong>Reg No:</strong> {student.regNo}</p>
          <p><strong>Department:</strong> {student.department}</p>
          <p><strong>Level:</strong> {student.level}</p>
          <p><strong>Email:</strong> {student.email}</p>
          <p><strong>Exam:</strong> {student.exam}</p>

          <button className="back-button" onClick={() => navigate("/cameracapture")}>
            ← Back to Camera View
          </button>
        </div>

        {/* Right Side — Live Video */}
        <div className="student-video-section">
          <video ref={videoRef} autoPlay muted className="student-live-video" />
        </div>
      </div>
    </div>
  );
}
