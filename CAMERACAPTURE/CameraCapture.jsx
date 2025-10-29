import React, { useEffect, useRef, useState } from "react";
import Header from "../HEADER/Header";
import "./CameraCapture.css";
import { toast } from "react-toastify";

function CameraCapture() {
  const students = [
    { id: 1, name: "Ayokunle Adebolu", regNo: "CBT001" },
    { id: 2, name: "Samuel Clement", regNo: "CBT002" },
    { id: 3, name: "David Faola", regNo: "CBT003" },
    { id: 4, name: "Adebolu Oladapo", regNo: "CBT004" },
    { id: 5, name: "Adebolu Ayodeji", regNo: "CBT005" },
    { id: 6, name: "Adebolu Adebayo", regNo: "CBT006" },
  ];

  const videoRefs = useRef([]);
  const [streams, setStreams] = useState([]);
  const [volumes, setVolumes] = useState(students.map(() => 0));
  const [errors, setErrors] = useState(students.map(() => ""));
  const [visibleErrors, setVisibleErrors] = useState(students.map(() => false));
  const [shakeErrors, setShakeErrors] = useState(students.map(() => false));

  const startCamera = async (index) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      videoRefs.current[index].srcObject = stream;

      const newStreams = [...streams];
      newStreams[index] = stream;
      setStreams(newStreams);

      toast.success(`${students[index].name} camera started!`);

      monitorAudio(stream, index);
    } catch (err) {
      console.error(err);

      const newErrors = [...errors];
      newErrors[index] = "Cannot access camera/mic.";
      setErrors(newErrors);

      const newVisible = [...visibleErrors];
      newVisible[index] = true;
      setVisibleErrors(newVisible);

      const newShake = [...shakeErrors];
      newShake[index] = true;
      setShakeErrors(newShake);

      setTimeout(() => {
        const clearedShake = [...shakeErrors];
        clearedShake[index] = false;
        setShakeErrors(clearedShake);
      }, 500);

      toast.error(`Cannot start camera for ${students[index].name}`);

      setTimeout(() => {
        const hideVisible = [...visibleErrors];
        hideVisible[index] = false;
        setVisibleErrors(hideVisible);

        setTimeout(() => {
          const clearedErrors = [...errors];
          clearedErrors[index] = "";
          setErrors(clearedErrors);
        }, 500);
      }, 3000);
    }
  };

  const monitorAudio = (stream, index) => {
    const audioContext = new AudioContext();
    const source = audioContext.createMediaStreamSource(stream);
    const analyser = audioContext.createAnalyser();
    source.connect(analyser);
    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    const updateVolume = () => {
      analyser.getByteFrequencyData(dataArray);
      const avg = dataArray.reduce((a, b) => a + b, 0) / dataArray.length / 2;
      const newVolumes = [...volumes];
      newVolumes[index] = avg;
      setVolumes(newVolumes);

      if (stream.getTracks().some((t) => t.readyState === "live")) {
        requestAnimationFrame(updateVolume);
      }
    };

    updateVolume();
  };

  // Determine volume bar color based on level
  const getVolumeColor = (level) => {
    if (level < 30) return "green";
    if (level < 70) return "yellow";
    return "red";
  };

  useEffect(() => {
    return () => {
      streams.forEach((stream) => {
        if (stream) stream.getTracks().forEach((t) => t.stop());
      });
    };
  }, [streams]);

  return (
    <div className="camera-page">
      <Header />

      <div className="student-grid">
        {students.map((student, index) => (
          <div key={student.id} className="student-card">
            <div className="video-section">
              <video
                ref={(el) => (videoRefs.current[index] = el)}
                autoPlay
                playsInline
                muted
                className="student-video"
              ></video>

              <div className="student-info">
                <p className="student-name">{student.name}</p>
                <p className="student-reg">{student.regNo}</p>
              </div>

              <div className="student-controls">
                <button onClick={() => startCamera(index)}>▶️ Start</button>
                {errors[index] && (
                  <p
                    className={`error-message ${visibleErrors[index] ? "fade-in" : "fade-out"
                      } ${shakeErrors[index] ? "shake" : ""}`}
                  >
                    {errors[index]}
                  </p>
                )}
              </div>
            </div>

            <div className="controls-section">
              <div className="mic-meter">
                <div
                  className="mic-level"
                  style={{
                    height: `${volumes[index]}%`,
                    backgroundColor: getVolumeColor(volumes[index]),
                    boxShadow: `0 0 8px ${getVolumeColor(volumes[index])}`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CameraCapture;
