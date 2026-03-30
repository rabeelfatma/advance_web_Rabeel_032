import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const nav = useNavigate();

  // 🔥 separate states
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const validatePassword = (password) => {
    const nums = (password.match(/[0-9]/g) || []).length;
    const alpha = (password.match(/[a-zA-Z]/g) || []).length;
    const special = (password.match(/[^a-zA-Z0-9]/g) || []).length;

    return nums >= 3 && alpha >= 2 && special >= 1;
  };

  const handleSignup = async () => {
    const name = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    const confirm = document.querySelector("#confirm").value;

    if (!name || !email || !password || !confirm) {
      alert("Please fill all fields");
      return;
    }

    if (password !== confirm) {
      alert("Passwords do not match");
      return;
    }

    if (!validatePassword(password)) {
      alert("Password must have 3 numbers, 2 letters, 1 special character");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      alert(data.msg || "Signup successful");
      nav("/login");

    } catch (error) {
      alert("Server error");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Sign Up</h2>

        <input id="name" style={styles.input} placeholder="Name" />
        <input id="email" style={styles.input} placeholder="Email" />

        {/* PASSWORD */}
        <div style={styles.passBox}>
          <input
            id="password"
            style={styles.passInput}
            type={showPass ? "text" : "password"}
            placeholder="Password"
          />
          <span style={styles.eye} onClick={() => setShowPass(!showPass)}>
            {showPass ? "Hide" : "Show"}
          </span>
        </div>

        {/* CONFIRM PASSWORD */}
        <div style={styles.passBox}>
          <input
            id="confirm"
            style={styles.passInput}
            type={showConfirm ? "text" : "password"}
            placeholder="Confirm Password"
          />
          <span style={styles.eye} onClick={() => setShowConfirm(!showConfirm)}>
            {showConfirm ? "Hide" : "Show"}
          </span>
        </div>

        <button style={styles.btn} onClick={handleSignup}>
          Create Account
        </button>

        <p style={styles.text}>
          Already have account?{" "}
          <span style={styles.link} onClick={() => nav("/login")}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

/* 🎨 STYLES */
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
    display: "flex",
    alignItems: "center",
    border: "1px solid #eee",
    borderRadius: "8px",
    marginBottom: "12px",
    paddingRight: "10px",
  },

  passInput: {
    flex: 1,
    padding: "12px",
    border: "none",
    outline: "none",
  },

  eye: {
    fontSize: "12px",
    color: "#e53935",
    cursor: "pointer",
    fontWeight: "bold",
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