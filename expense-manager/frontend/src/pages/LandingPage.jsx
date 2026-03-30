import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const nav = useNavigate();

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Expense Manager</h1>
        <p style={styles.subtitle}>
          Track your expenses smartly & stay financially organized
        </p>

        <div style={styles.btnRow}>
          <button style={styles.loginBtn} onClick={() => nav("/login")}>
            Login
          </button>

          <button style={styles.signupBtn} onClick={() => nav("/signup")}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
page: {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #fff5f5, #ffe3e3, #ffffff)",
},

  card: {
    width: "420px",
    padding: "45px",
    textAlign: "center",
    borderRadius: "18px",
    background: "#fff",
    boxShadow: "0 20px 50px rgba(0,0,0,0.08)",
    borderTop: "5px solid #e53935",
  },

  title: {
    fontSize: "34px",
    marginBottom: "10px",
    color: "#e53935",
    fontWeight: "bold",
  },

  subtitle: {
    fontSize: "14px",
    marginBottom: "25px",
    color: "#666",
  },

  btnRow: {
    display: "flex",
    gap: "12px",
  },

  loginBtn: {
    flex: 1,
    padding: "12px",
    border: "2px solid #e53935",
    background: "white",
    color: "#e53935",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer",
  },

  signupBtn: {
    flex: 1,
    padding: "12px",
    border: "none",
    background: "#e53935",
    color: "white",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer",
  },
};