import React, { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom"; 

export default function Dashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState("");
  const [filter, setFilter] = useState("all"); 
  const [budgetLimit, setBudgetLimit] = useState(10000);
  const [darkMode, setDarkMode] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [form, setForm] = useState({
    title: "",
    amount: "",
    type: "expense",
    category: "",
    date: new Date().toISOString().substring(0, 10),
  });

  const load = async () => {
    try {
      const res = await api.get("/transactions");
      setData(res.data);
    } catch (err) {
      console.log("LOAD ERROR:", err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("token"); 
      navigate("/login"); 
    }
  };

  const resetForm = () => {
    setForm({
      title: "",
      amount: "",
      type: "expense",
      category: "",
      date: new Date().toISOString().substring(0, 10),
    });
    setEditId(null);
  };

  const handleSubmit = async () => {
    if (!form.title || !form.amount) {
      setMessage("⚠️ Title & Amount required");
      return;
    }
    const payload = {
      title: form.title,
      amount: Number(form.amount),
      type: form.type,
      category: form.category || "General",
      date: form.date || new Date().toISOString(),
    };
    try {
      if (editId) {
        await api.put(`/transactions/${editId}`, payload);
        setMessage("✏️ Updated Successfully");
      } else {
        await api.post("/transactions", payload);
        setMessage("✅ Transaction Added");
      }
      resetForm();
      load();
    } catch (err) {
      setMessage("❌ Failed to save");
    }
  };

  const del = async (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      await api.delete(`/transactions/${id}`);
      load();
    }
  };

  const edit = (item) => {
    setForm({
      title: item.title || "",
      amount: item.amount || "",
      type: item.type || "expense",
      category: item.category || "",
      date: item.date ? item.date.substring(0, 10) : "",
    });
    setEditId(item._id);
  };

  const filteredData = data.filter((item) => {
    const itemDate = new Date(item.date);
    const now = new Date();
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    let matchesDateRange = true;
    const dateStr = item.date ? item.date.substring(0, 10) : "";
    if (startDate) matchesDateRange = matchesDateRange && dateStr >= startDate;
    if (endDate) matchesDateRange = matchesDateRange && dateStr <= endDate;
    let matchesQuick = true;
    if (filter === "daily") matchesQuick = itemDate.toDateString() === now.toDateString();
    if (filter === "monthly") matchesQuick = itemDate.getMonth() === now.getMonth() && itemDate.getFullYear() === now.getFullYear();
    if (filter === "yearly") matchesQuick = itemDate.getFullYear() === now.getFullYear();
    return matchesSearch && matchesCategory && matchesDateRange && matchesQuick;
  });

  const categories = ["all", ...new Set(data.map((item) => item.category))];
  const income = filteredData.filter((x) => x.type === "income").reduce((a, b) => a + Number(b.amount), 0);
  const expense = filteredData.filter((x) => x.type === "expense").reduce((a, b) => a + Number(b.amount), 0);
  const balance = income - expense;

  const theme = {
    pageBg: darkMode ? "#121212" : "linear-gradient(135deg,#fff5f5,#ffe3e3)",
    cardBg: darkMode ? "#1e1e1e" : "#fff",
    text: darkMode ? "#ffffff" : "#333",
    inputBg: darkMode ? "#333" : "#fff",
    inputBorder: darkMode ? "#444" : "#ddd",
    itemBg: darkMode ? "#2c2c2c" : "#ffeaea" 
  };

  return (
    <div style={{ ...styles.page, background: theme.pageBg }}>
      <div style={{ ...styles.container, background: theme.cardBg, color: theme.text }}>
        
        {/* HEADER */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h2 style={{ color: "#e53935", margin: 0 }}>💰 Transaction Manager</h2>
          <div onClick={() => setDarkMode(!darkMode)} style={{ fontSize: "28px", cursor: "pointer" }}>
            {darkMode ? "☀️" : "🌙"}
          </div>
        </div>

        {/* SUMMARY SECTION */}
        <div style={styles.summaryBox}>
          <div style={styles.sumItem}>💰 Balance: {balance}</div>
          <div style={{ ...styles.sumItem, color: "#4CAF50" }}>⬆ Income: {income}</div>
          <div style={{ ...styles.sumItem, color: "#f44336" }}>⬇ Expense: {expense}</div>
        </div>

        {/* ALERTS */}
        {expense > budgetLimit && <div style={styles.warningAlert}>🚨 Warning: Budget Exceeded!</div>}
        {message && <div style={styles.msgAlert}>{message}</div>}

        {/* MAIN LAYOUT: Split into 2 columns on laptop */}
        <div style={styles.mainContent}>
          
          {/* LEFT: FORM SECTION */}
          <div style={styles.leftCol}>
            <div style={styles.formCard}>
              <h3 style={{fontSize: "16px", marginBottom: "15px"}}>Add Transaction</h3>
              <input style={{...styles.input, background: theme.inputBg, color: theme.text, borderColor: theme.inputBorder}} placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
              <input style={{...styles.input, background: theme.inputBg, color: theme.text, borderColor: theme.inputBorder}} placeholder="Amount" type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} />
              <select style={{...styles.input, background: theme.inputBg, color: theme.text, borderColor: theme.inputBorder}} value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
              <input style={{...styles.input, background: theme.inputBg, color: theme.text, borderColor: theme.inputBorder}} placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
              <input style={{...styles.input, background: theme.inputBg, color: theme.text, borderColor: theme.inputBorder}} type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
              <button style={styles.mainBtn} onClick={handleSubmit}>{editId ? "Update" : "Add Transaction"}</button>
              {editId && <button style={{ ...styles.mainBtn, background: "#757575", marginTop: "10px" }} onClick={resetForm}>Cancel</button>}
            </div>
          </div>

          {/* RIGHT: HISTORY SECTION */}
          <div style={styles.rightCol}>
            <div style={{...styles.filterArea, background: darkMode ? "#252525" : "#f9f9f9"}}>
              <div style={{display: "flex", gap: "10px", marginBottom: "10px"}}>
                <input style={{...styles.input, flex: 2}} placeholder="🔍 Search Title..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                <select style={{...styles.input, flex: 1}} value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                  {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <input type="date" style={{ ...styles.input, flex: 1 }} value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                <input type="date" style={{ ...styles.input, flex: 1 }} value={endDate} onChange={(e) => setEndDate(e.target.value)} />
              </div>
            </div>

            <div style={styles.tabs}>
              {["all", "daily", "monthly", "yearly"].map((f) => (
                <button key={f} onClick={() => setFilter(f)} style={{ ...styles.tabBtn, background: filter === f ? "#e53935" : "#eee", color: filter === f ? "#fff" : "#333" }}>{f.toUpperCase()}</button>
              ))}
            </div>

            <div style={styles.historyList}>
              <h4 style={{fontSize: "14px", color: "#888"}}>History ({filteredData.length})</h4>
              {filteredData.map((d) => (
                <div key={d._id} style={{...styles.historyItem, background: theme.itemBg, color: theme.text}}>
                  <div>
                    <b>{d.title}</b> - {d.amount}
                    <br /><small>{d.category} | {d.date?.substring(0, 10)}</small>
                  </div>
                  <div style={{ display: "flex", gap: "5px" }}>
                    <button style={styles.editBtn} onClick={() => edit(d)}>Edit</button>
                    <button style={styles.delBtn} onClick={() => del(d._id)}>Del</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div style={styles.footer}>
           <div style={{marginBottom: "15px"}}>
              <label style={{fontSize: "14px"}}>Set Budget Limit: </label>
              <input type="number" value={budgetLimit} onChange={(e) => setBudgetLimit(Number(e.target.value))} style={{width: "100px", border: "none", borderBottom: "1px solid #ddd", background: "transparent", color: theme.text, textAlign: "center"}} />
           </div>
           <div style={{display: "flex", justifyContent: "center", gap: "20px"}}>
              <button onClick={() => navigate("/analytics")} style={{...styles.navBtn, background: "#2196F3"}}>📊 Analytics</button>
              <button onClick={handleLogout} style={{...styles.navBtn, background: "#f44336"}}>🚪 Logout</button>
           </div>
        </div>

      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: "100vh", width: "100vw", display: "flex", justifyContent: "center", padding: "40px 0" },
  container: { width: "95vw", maxWidth: "1200px", padding: "30px", borderRadius: "20px", boxShadow: "0 10px 40px rgba(0,0,0,0.1)", height: "fit-content" },
  mainContent: { display: "flex", gap: "40px", flexWrap: "wrap", marginTop: "20px" },
  leftCol: { flex: 1, minWidth: "300px" },
  rightCol: { flex: 1.5, minWidth: "350px" },
  summaryBox: { display: "flex", justifyContent: "space-between", padding: "20px", background: "rgba(0,0,0,0.03)", borderRadius: "12px", fontWeight: "bold", fontSize: "16px" },
  formCard: { display: "flex", flexDirection: "column", gap: "12px" },
  input: { padding: "12px", borderRadius: "8px", border: "1px solid #ddd", fontSize: "14px", width: "100%", boxSizing: "border-box" },
  mainBtn: { background: "#e53935", color: "#fff", padding: "14px", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold", fontSize: "15px", width: "100%" },
  filterArea: { padding: "15px", borderRadius: "12px", marginBottom: "15px" },
  tabs: { display: "flex", justifyContent: "center", gap: "10px", marginBottom: "20px" },
  tabBtn: { padding: "8px 20px", border: "none", borderRadius: "20px", cursor: "pointer", fontSize: "12px", fontWeight: "bold" },
  historyList: { display: "flex", flexDirection: "column", gap: "10px" },
  historyItem: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px", borderRadius: "8px" },
  footer: { marginTop: "40px", borderTop: "1px solid #eee", paddingTop: "20px", textAlign: "center" },
  navBtn: { padding: "12px 50px", border: "none", borderRadius: "10px", color: "#fff", cursor: "pointer", fontSize: "15px", fontWeight: "bold" },
  editBtn: { background: "orange", color: "#fff", border: "none", padding: "8px 15px", borderRadius: "5px", cursor: "pointer", fontSize: "12px" },
  delBtn: { background: "red", color: "#fff", border: "none", padding: "8px 15px", borderRadius: "5px", cursor: "pointer", fontSize: "12px" },
  warningAlert: { padding: "12px", background: "#ffcdd2", color: "#b71c1c", borderRadius: "8px", textAlign: "center", marginBottom: "10px", fontWeight: "bold" },
  msgAlert: { padding: "12px", background: "#fff3cd", color: "#856404", borderRadius: "8px", textAlign: "center", marginBottom: "10px" }
};