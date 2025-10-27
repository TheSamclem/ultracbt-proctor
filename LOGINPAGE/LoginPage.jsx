import React, { useState } from "react";
import "./LoginPage.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔗 Replace this with your real backend API endpoint
  const LOGIN_URL = "http://localhost:5000/api/auth/login";

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(LOGIN_URL, {
        username,
        password,
      });

      // ✅ Assuming your backend returns something like:
      // { success: true, token: "...", user: {...} }

      if (response.data.success) {
        const { token, user } = response.data;

        // Save token (and maybe user info) locally
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        toast.success("Login successful!");
        navigate("/dashboard");
      } else {
        toast.error(response.data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error.response) {
        // Server responded with an error
        toast.error(error.response.data.message || "Login failed");
      } else {
        // Network or other issue
        toast.error("Network error. Please check your connection.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login to Ultra CBT</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Username / Reg No</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Enter your username or reg number"
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;

