import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleReset = async () => {
    if (!email || !newPass || !confirmPass) {
      alert("Fill all fields");
      return;
    }

    if (newPass !== confirmPass) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword: newPass }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Password updated successfully");
        nav("/login");
      } else {
        alert(data.msg || "Error");
      }
    } catch (err) {
      alert("Server error");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Forgot Password</h2>

        {/* EMAIL */}
        <input
          style={styles.input}
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* NEW PASSWORD */}
        <div style={styles.passBox}>
          <input
            style={styles.input}
            placeholder="New Password"
            type={showPass ? "text" : "password"}
            onChange={(e) => setNewPass(e.target.value)}
          />

          <span
            style={styles.eye}
            onClick={() => setShowPass(!showPass)}
          >
            {showPass ? "🙈" : "👁"}
          </span>
        </div>

        {/* CONFIRM PASSWORD */}
        <input
          style={styles.input}
          placeholder="Confirm Password"
          type={showPass ? "text" : "password"}
          onChange={(e) => setConfirmPass(e.target.value)}
        />

        {/* BUTTON */}
        <button style={styles.btn} onClick={handleReset}>
          Change Password
        </button>

        <p style={styles.text}>
          Back to{" "}
          <span style={styles.link} onClick={() => nav("/login")}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */
const styles = {
  page: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #fff5f5, #ffe3e3, #ffffff)",
  },

  card: {
    width: "360px",
    padding: "35px",
    borderRadius: "18px",
    background: "#fff",
    boxShadow: "0 20px 50px rgba(0,0,0,0.08)",
    borderTop: "5px solid #e53935",
  },

  title: {
    textAlign: "center",
    color: "#e53935",
    marginBottom: "20px",
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "12px",
    border: "1px solid #eee",
    borderRadius: "8px",
    outline: "none",
  },

  passBox: {
    position: "relative",
  },

  eye: {
    position: "absolute",
    right: "10px",
    top: "12px",
    cursor: "pointer",
    fontSize: "16px",
  },

  btn: {
    width: "100%",
    padding: "12px",
    background: "#e53935",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer",
  },

  text: {
    marginTop: "15px",
    textAlign: "center",
    fontSize: "13px",
  },

  link: {
    color: "#e53935",
    fontWeight: "bold",
    cursor: "pointer",
  },
};