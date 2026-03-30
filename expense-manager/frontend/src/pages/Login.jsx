import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const nav = useNavigate();
  const [show, setShow] = useState(false);

  const handleFocus = (e) => {
    e.target.style.border = "1px solid #e53935";
    e.target.style.boxShadow = "0 0 5px rgba(229,57,53,0.3)";
  };

  const handleBlur = (e) => {
    e.target.style.border = "1px solid #eee";
    e.target.style.boxShadow = "none";
  };

  const handleLogin = async () => {
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Login successful");
       nav("/dashboard");
      } else {
        alert(data.msg || "Login failed");
      }

    } catch (error) {
      alert("Server error");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Login</h2>

        {/* EMAIL */}
        <input
          id="email"
          style={styles.input}
          placeholder="Email"
          onFocus={handleFocus}
          onBlur={handleBlur}
        />

        {/* PASSWORD */}
        <div style={styles.passBox}>
          <input
            id="password"
            style={styles.passInput}
            type={show ? "text" : "password"}
            placeholder="Password"
            onFocus={handleFocus}
            onBlur={handleBlur}
          />

          <span onClick={() => setShow(!show)} style={styles.eye}>
            {show ? "Hide" : "Show"}
          </span>
        </div>

        {/* LOGIN BUTTON */}
        <button style={styles.btn} onClick={handleLogin}>
          Login
        </button>

        {/* 🔥 FORGOT PASSWORD */}
        <p style={styles.text}>
          Forgot Password?{" "}
          <span
            style={styles.link}
            onClick={() => nav("/forgot-password")}
          >
            Reset Here
          </span>
        </p>

        {/* SIGNUP LINK */}
        <p style={styles.text}>
          Don’t have account?{" "}
          <span style={styles.link} onClick={() => nav("/signup")}>
            Sign Up
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
    transition: "0.3s",
  },

  passBox: {
    display: "flex",
    alignItems: "center",
    border: "1px solid #eee",
    borderRadius: "8px",
    marginBottom: "12px",
    paddingRight: "10px",
    transition: "0.3s",
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