import React, { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState("");
  const [filter, setFilter] = useState("all");
  const [budgetLimit, setBudgetLimit] = useState(80000);
  const [darkMode, setDarkMode] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // 🔔 Notifications state
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  // 🤖 AI Financial Advisor state
  const [aiAdvice, setAiAdvice] = useState([]);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState("");
  const [showAiAdvisor, setShowAiAdvisor] = useState(false);

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

  // 🔔 Auto-generate notifications based on data
  useEffect(() => {
    const notifs = [];
    const expenses = data.filter((x) => x.type === "expense");
    const totalExpenseNotif = expenses.reduce((a, b) => a + Number(b.amount), 0);

    if (totalExpenseNotif > budgetLimit) {
      notifs.push({ id: 1, msg: `🚨 Budget exceeded! Spent Rs.${totalExpenseNotif.toLocaleString()}`, type: "danger" });
    }
    if (totalExpenseNotif > budgetLimit * 0.8 && totalExpenseNotif <= budgetLimit) {
      notifs.push({ id: 2, msg: `⚠️ 80% budget used. Remaining: Rs.${(budgetLimit - totalExpenseNotif).toLocaleString()}`, type: "warning" });
    }
    if (data.length > 0) {
      const latest = [...data].sort((a, b) => new Date(b.date) - new Date(a.date))[0];
      notifs.push({ id: 3, msg: `📝 Last transaction: "${latest.title}" - Rs.${latest.amount}`, type: "info" });
    }
    setNotifications(notifs);
  }, [data, budgetLimit]);

  // 🤖 AI Financial Advisor - Call Backend (Gemini)
  const getAiAdvice = async () => {
    if (data.length === 0) {
      setAiError("No transactions found. Add some transactions first!");
      setShowAiAdvisor(true);
      return;
    }

    setAiLoading(true);
    setAiError("");
    setAiAdvice([]);
    setShowAiAdvisor(true);

    const totalIncomeCal = data.filter((x) => x.type === "income").reduce((a, b) => a + Number(b.amount), 0);
    const totalExpenseCal = data.filter((x) => x.type === "expense").reduce((a, b) => a + Number(b.amount), 0);
    const savingsRate = totalIncomeCal > 0
      ? (((totalIncomeCal - totalExpenseCal) / totalIncomeCal) * 100).toFixed(1)
      : 0;

    const catTotals = {};
    data.filter((x) => x.type === "expense").forEach((item) => {
      const cat = item.category || "General";
      catTotals[cat] = (catTotals[cat] || 0) + Number(item.amount);
    });
    const categoryBreakdown = Object.entries(catTotals)
      .sort((a, b) => b[1] - a[1])
      .map(([cat, amt]) => `${cat}: Rs.${amt.toLocaleString()}`)
      .join(", ");

    try {
      const res = await api.post("/ai-advice", {
        totalIncome: totalIncomeCal,
        totalExpense: totalExpenseCal,
        balance: totalIncomeCal - totalExpenseCal,
        savingsRate,
        budgetLimit,
        budgetUsedPercent: Math.round((totalExpenseCal / budgetLimit) * 100),
        categoryBreakdown,
        totalTransactions: data.length,
      });

      setAiAdvice(res.data.advice);
    } catch (err) {
      setAiError("Failed to get AI advice. Please try again.");
      console.error("AI Advisor error:", err);
    } finally {
      setAiLoading(false);
    }
  };

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

  // 🏆 Largest Expense
  const allExpenses = data.filter((x) => x.type === "expense");
  const largestExpense = allExpenses.length > 0
    ? allExpenses.reduce((max, item) => Number(item.amount) > Number(max.amount) ? item : max, allExpenses[0])
    : null;

  // 📈 Top Categories
  const categoryTotals = {};
  data.filter((x) => x.type === "expense").forEach((item) => {
    const cat = item.category || "General";
    categoryTotals[cat] = (categoryTotals[cat] || 0) + Number(item.amount);
  });
  const topCategories = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1]).slice(0, 4);
  const maxCatAmount = topCategories[0]?.[1] || 1;

  // ❤️ Financial Health Score
  const totalIncome = data.filter((x) => x.type === "income").reduce((a, b) => a + Number(b.amount), 0);
  const totalExpense = data.filter((x) => x.type === "expense").reduce((a, b) => a + Number(b.amount), 0);
  let healthScore = 100;
  if (totalIncome > 0) {
    const savingsRate = (totalIncome - totalExpense) / totalIncome;
    healthScore = Math.max(0, Math.min(100, Math.round(savingsRate * 100 + 50)));
  } else if (totalExpense > 0) {
    healthScore = 10;
  }
  const healthLabel = healthScore >= 75 ? "Excellent 🌟" : healthScore >= 50 ? "Good 👍" : healthScore >= 25 ? "Fair ⚠️" : "Poor 🔴";
  const healthColor = healthScore >= 75 ? "#4CAF50" : healthScore >= 50 ? "#2196F3" : healthScore >= 25 ? "#FF9800" : "#f44336";

  // 📊 Budget Progress
  const budgetUsedPercent = Math.min(100, Math.round((totalExpense / budgetLimit) * 100));
  const budgetBarColor = budgetUsedPercent >= 100 ? "#f44336" : budgetUsedPercent >= 80 ? "#FF9800" : "#4CAF50";

  // 📄 Export PDF
  const exportPDF = async () => {
    if (!window.jspdf) {
      await new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    }
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.setTextColor(229, 57, 53);
    doc.text("Transaction Manager - Report", 14, 20);
    doc.setFontSize(11);
    doc.setTextColor(50, 50, 50);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 30);
    doc.text(`Total Income: Rs.${income.toLocaleString()}`, 14, 40);
    doc.text(`Total Expense: Rs.${expense.toLocaleString()}`, 14, 48);
    doc.text(`Balance: Rs.${balance.toLocaleString()}`, 14, 56);
    doc.text(`Financial Health Score: ${healthScore}/100 (${healthLabel})`, 14, 64);
    doc.setFontSize(13);
    doc.setTextColor(229, 57, 53);
    doc.text("Transaction History", 14, 76);
    doc.setFontSize(10);
    doc.setTextColor(50, 50, 50);
    let y = 84;
    filteredData.forEach((item, i) => {
      if (y > 270) { doc.addPage(); y = 20; }
      const sign = item.type === "income" ? "+" : "-";
      doc.text(`${i + 1}. ${item.title} | ${sign}Rs.${Number(item.amount).toLocaleString()} | ${item.category} | ${item.date?.substring(0, 10)}`, 14, y);
      y += 8;
    });
    doc.save("transactions_report.pdf");
    setMessage("📄 PDF Exported Successfully!");
  };

  const theme = {
    pageBg: darkMode ? "#121212" : "linear-gradient(135deg,#fff5f5,#ffe3e3)",
    cardBg: darkMode ? "#1e1e1e" : "#fff",
    text: darkMode ? "#ffffff" : "#333",
    inputBg: darkMode ? "#333" : "#fff",
    inputBorder: darkMode ? "#444" : "#ddd",
    itemBg: darkMode ? "#2c2c2c" : "#ffeaea",
    widgetBg: darkMode ? "#252525" : "#f9f9f9",
    aiCardBg: darkMode ? "#2a1a1a" : "#fff5f5",
    aiItemBg: darkMode ? "#3a1a1a" : "#ffffff",
    aiItemBorder: darkMode ? "#5a2a2a" : "#ffcdd2",
  };

  const catColors = ["#e53935", "#FF9800", "#2196F3", "#9C27B0"];

  return (
    <div style={{ ...styles.page, background: theme.pageBg }}>
      <div style={{ ...styles.container, background: theme.cardBg, color: theme.text }}>

        {/* HEADER */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h2 style={{ color: "#e53935", margin: 0 }}>💰 Transaction Manager</h2>
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            {/* 🔔 Notification Bell */}
            <div style={{ position: "relative" }}>
              <div onClick={() => setShowNotifications(!showNotifications)} style={{ fontSize: "26px", cursor: "pointer", userSelect: "none" }} title="Notifications">
                🔔
                {notifications.length > 0 && (
                  <span style={{ position: "absolute", top: "-4px", right: "-6px", background: "#f44336", color: "#fff", borderRadius: "50%", fontSize: "11px", width: "18px", height: "18px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold" }}>
                    {notifications.length}
                  </span>
                )}
              </div>
              {showNotifications && (
                <div style={{ position: "absolute", top: "38px", right: 0, zIndex: 999, background: theme.cardBg, border: "1px solid #ddd", borderRadius: "12px", boxShadow: "0 8px 24px rgba(0,0,0,0.15)", width: "300px", padding: "12px" }}>
                  <div style={{ fontWeight: "bold", marginBottom: "10px", fontSize: "14px", color: theme.text }}>🔔 Notifications</div>
                  {notifications.length === 0 && <div style={{ fontSize: "13px", color: "#888" }}>No notifications</div>}
                  {notifications.map((n) => (
                    <div key={n.id} style={{ padding: "10px", borderRadius: "8px", marginBottom: "8px", fontSize: "13px", background: n.type === "danger" ? "#ffcdd2" : n.type === "warning" ? "#fff3cd" : "#e3f2fd", color: n.type === "danger" ? "#b71c1c" : n.type === "warning" ? "#856404" : "#0d47a1" }}>
                      {n.msg}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div onClick={() => setDarkMode(!darkMode)} style={{ fontSize: "28px", cursor: "pointer" }}>
              {darkMode ? "☀️" : "🌙"}
            </div>
          </div>
        </div>

        {/* SUMMARY */}
        <div style={styles.summaryBox}>
          <div style={styles.sumItem}>💰 Balance: {balance.toLocaleString()}</div>
          <div style={{ ...styles.sumItem, color: "#4CAF50" }}>⬆ Income: {income.toLocaleString()}</div>
          <div style={{ ...styles.sumItem, color: "#f44336" }}>⬇ Expense: {expense.toLocaleString()}</div>
        </div>

        {expense > budgetLimit && <div style={styles.warningAlert}>🚨 Warning: Budget Exceeded!</div>}
        {message && <div style={styles.msgAlert}>{message}</div>}

        {/* WIDGETS ROW */}
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", margin: "20px 0" }}>
          {/* Largest Expense */}
          <div style={{ ...styles.widgetCard, background: darkMode ? "#2c1a1a" : "#fff5f5", flex: 1, minWidth: "200px" }}>
            <div style={styles.widgetTitle}>🏆 Largest Expense</div>
            {largestExpense ? (
              <>
                <div style={{ fontSize: "22px", fontWeight: "bold", color: "#e53935", marginBottom: "4px" }}>Rs.{Number(largestExpense.amount).toLocaleString()}</div>
                <div style={{ fontSize: "13px", color: theme.text }}>{largestExpense.title}</div>
                <div style={{ fontSize: "11px", color: "#888" }}>{largestExpense.category} | {largestExpense.date?.substring(0, 10)}</div>
              </>
            ) : <div style={{ fontSize: "13px", color: "#888" }}>No expenses yet</div>}
          </div>

          {/* Financial Health */}
          <div style={{ ...styles.widgetCard, background: darkMode ? "#1a2c1a" : "#f0fff4", flex: 1, minWidth: "200px" }}>
            <div style={styles.widgetTitle}>❤️ Financial Health</div>
            <div style={{ fontSize: "28px", fontWeight: "bold", color: healthColor }}>{healthScore}<span style={{ fontSize: "14px" }}>/100</span></div>
            <div style={{ fontSize: "13px", color: healthColor, fontWeight: "bold" }}>{healthLabel}</div>
            <div style={{ background: "#e0e0e0", borderRadius: "10px", height: "8px", marginTop: "8px", overflow: "hidden" }}>
              <div style={{ width: `${healthScore}%`, height: "100%", background: healthColor, borderRadius: "10px", transition: "width 0.5s" }} />
            </div>
          </div>

          {/* Budget Progress */}
          <div style={{ ...styles.widgetCard, background: darkMode ? "#1a1a2c" : "#f0f4ff", flex: 1, minWidth: "200px" }}>
            <div style={styles.widgetTitle}>📊 Budget Progress</div>
            <div style={{ fontSize: "13px", color: theme.text, marginBottom: "6px" }}>Rs.{totalExpense.toLocaleString()} / Rs.{budgetLimit.toLocaleString()}</div>
            <div style={{ background: "#e0e0e0", borderRadius: "10px", height: "14px", overflow: "hidden" }}>
              <div style={{ width: `${budgetUsedPercent}%`, height: "100%", background: budgetBarColor, borderRadius: "10px", transition: "width 0.5s", display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                {budgetUsedPercent > 15 && <span style={{ fontSize: "10px", color: "#fff", paddingRight: "5px", fontWeight: "bold" }}>{budgetUsedPercent}%</span>}
              </div>
            </div>
            <div style={{ fontSize: "12px", marginTop: "6px", color: budgetBarColor, fontWeight: "bold" }}>
              {budgetUsedPercent >= 100 ? "Budget Exceeded!" : `${100 - budgetUsedPercent}% remaining`}
            </div>
          </div>
        </div>

        {/* Top Categories */}
        {topCategories.length > 0 && (
          <div style={{ ...styles.widgetCard, background: theme.widgetBg, marginBottom: "20px" }}>
            <div style={styles.widgetTitle}>📈 Top Expense Categories</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "8px" }}>
              {topCategories.map(([cat, amt], i) => (
                <div key={cat}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", marginBottom: "4px" }}>
                    <span style={{ fontWeight: "bold", color: theme.text }}><span style={{ color: catColors[i % catColors.length] }}>●</span> {cat}</span>
                    <span style={{ color: catColors[i % catColors.length], fontWeight: "bold" }}>Rs.{amt.toLocaleString()}</span>
                  </div>
                  <div style={{ background: "#e0e0e0", borderRadius: "10px", height: "8px", overflow: "hidden" }}>
                    <div style={{ width: `${(amt / maxCatAmount) * 100}%`, height: "100%", background: catColors[i % catColors.length], borderRadius: "10px", transition: "width 0.5s" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== 🤖 AI FINANCIAL ADVISOR ===== */}
        <div style={{
          ...styles.widgetCard,
          background: theme.aiCardBg,
          marginBottom: "20px",
          border: darkMode ? "1px solid #5a2a2a" : "1px solid #ffcdd2",
        }}>
          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontSize: "22px" }}>🤖</span>
                <span style={{ fontWeight: "bold", fontSize: "16px", color: "#e53935" }}>
                  AI Financial Advisor
                </span>
                <span style={{
                  background: darkMode ? "#4a1a1a" : "#ffebee",
                  color: "#e53935",
                  fontSize: "10px", fontWeight: "bold",
                  padding: "2px 8px", borderRadius: "20px",
                  border: "1px solid #ffcdd2"
                }}>
                  AI POWERED
                </span>
              </div>
              <div style={{ fontSize: "12px", color: "#888", marginTop: "4px", marginLeft: "30px" }}>
                Personalized advice based on your transactions
              </div>
            </div>

            {/* RED BUTTON - matching project style */}
            <button
              onClick={getAiAdvice}
              disabled={aiLoading}
              style={{
                background: aiLoading ? "#bdbdbd" : "#e53935",
                color: "#fff",
                border: "none",
                padding: "12px 22px",
                borderRadius: "8px",
                cursor: aiLoading ? "not-allowed" : "pointer",
                fontWeight: "bold",
                fontSize: "14px",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                boxShadow: aiLoading ? "none" : "0 4px 12px rgba(229,57,53,0.35)",
                transition: "all 0.2s",
                whiteSpace: "nowrap",
              }}
            >
              {aiLoading ? (
                <><span style={{ display: "inline-block", animation: "spin 1s linear infinite" }}>⏳</span> Analyzing...</>
              ) : (
                <>✨ Get AI Advice</>
              )}
            </button>
          </div>

          {/* Divider */}
          {(showAiAdvisor || aiLoading) && (
            <div style={{ borderTop: darkMode ? "1px solid #5a2a2a" : "1px solid #ffcdd2", margin: "16px 0" }} />
          )}

          {/* Loading Skeleton */}
          {aiLoading && (
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} style={{ padding: "14px", borderRadius: "10px", background: darkMode ? "#4a1a1a" : "#ffebee", height: "60px", opacity: 0.6, animation: "pulse 1.5s ease-in-out infinite" }} />
              ))}
              <style>{`
                @keyframes pulse { 0%,100%{opacity:0.4} 50%{opacity:0.8} }
                @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
                @keyframes fadeIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
              `}</style>
            </div>
          )}

          {/* Error */}
          {aiError && !aiLoading && (
            <div style={{ padding: "14px", borderRadius: "10px", background: "#ffcdd2", color: "#b71c1c", fontSize: "13px", fontWeight: "bold" }}>
              ❌ {aiError}
            </div>
          )}

          {/* Advice Cards */}
          {!aiLoading && aiAdvice.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}`}</style>
              {aiAdvice.map((item, i) => (
                <div key={i} style={{
                  padding: "14px 16px", borderRadius: "10px",
                  background: theme.aiItemBg,
                  border: `1px solid ${theme.aiItemBorder}`,
                  display: "flex", alignItems: "flex-start", gap: "12px",
                  animation: `fadeIn 0.3s ease ${i * 0.08}s both`,
                  boxShadow: darkMode ? "none" : "0 1px 4px rgba(229,57,53,0.08)",
                }}>
                  <div style={{
                    fontSize: "20px", minWidth: "36px", height: "36px",
                    background: darkMode ? "#4a1a1a" : "#ffebee",
                    borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    {item.icon}
                  </div>
                  <div>
                    <div style={{ fontWeight: "bold", fontSize: "13px", color: "#e53935", marginBottom: "3px" }}>
                      {item.title}
                    </div>
                    <div style={{ fontSize: "13px", color: theme.text, lineHeight: "1.5" }}>
                      {item.tip}
                    </div>
                  </div>
                </div>
              ))}
              <div style={{ fontSize: "11px", color: "#9ca3af", textAlign: "center", marginTop: "4px" }}>
                🤖 AI advice is based on your transaction history. Always consult a financial expert for major decisions.
              </div>
            </div>
          )}

          {/* Empty state */}
          {!aiLoading && !showAiAdvisor && aiAdvice.length === 0 && !aiError && (
            <div style={{ textAlign: "center", padding: "20px", color: "#888", fontSize: "13px" }}>
              <div style={{ fontSize: "32px", marginBottom: "8px" }}>🤖</div>
              Click <strong style={{ color: "#e53935" }}>"Get AI Advice"</strong> to receive personalized financial tips based on your spending patterns.
            </div>
          )}
        </div>
        {/* ===== END AI FINANCIAL ADVISOR ===== */}

        {/* MAIN LAYOUT */}
        <div style={styles.mainContent}>
          {/* LEFT: FORM */}
          <div style={styles.leftCol}>
            <div style={styles.formCard}>
              <h3 style={{ fontSize: "16px", marginBottom: "15px" }}>Add Transaction</h3>
              <input style={{ ...styles.input, background: theme.inputBg, color: theme.text, borderColor: theme.inputBorder }} placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
              <input style={{ ...styles.input, background: theme.inputBg, color: theme.text, borderColor: theme.inputBorder }} placeholder="Amount" type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} />
              <select style={{ ...styles.input, background: theme.inputBg, color: theme.text, borderColor: theme.inputBorder }} value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
              <input style={{ ...styles.input, background: theme.inputBg, color: theme.text, borderColor: theme.inputBorder }} placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
              <input style={{ ...styles.input, background: theme.inputBg, color: theme.text, borderColor: theme.inputBorder }} type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
              <button style={styles.mainBtn} onClick={handleSubmit}>{editId ? "Update" : "Add Transaction"}</button>
              {editId && <button style={{ ...styles.mainBtn, background: "#757575", marginTop: "10px" }} onClick={resetForm}>Cancel</button>}
            </div>
          </div>

          {/* RIGHT: HISTORY */}
          <div style={styles.rightCol}>
            <div style={{ ...styles.filterArea, background: darkMode ? "#252525" : "#f9f9f9" }}>
              <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
                <input style={{ ...styles.input, flex: 2 }} placeholder="🔍 Search Title..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                <select style={{ ...styles.input, flex: 1 }} value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
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
              <h4 style={{ fontSize: "14px", color: "#888" }}>History ({filteredData.length})</h4>
              {filteredData.map((d) => (
                <div key={d._id} style={{ ...styles.historyItem, background: theme.itemBg, color: theme.text }}>
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
          <div style={{ marginBottom: "15px" }}>
            <label style={{ fontSize: "14px" }}>Set Budget Limit: </label>
            <input type="number" value={budgetLimit} onChange={(e) => setBudgetLimit(Number(e.target.value))} style={{ width: "100px", border: "none", borderBottom: "1px solid #ddd", background: "transparent", color: theme.text, textAlign: "center" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: "15px", flexWrap: "wrap" }}>
            <button onClick={() => navigate("/analytics")} style={{ ...styles.navBtn, background: "#2196F3" }}>📊 Analytics</button>
            <button onClick={exportPDF} style={{ ...styles.navBtn, background: "#4CAF50" }}>📄 Export PDF</button>
            <button onClick={handleLogout} style={{ ...styles.navBtn, background: "#f44336" }}>🚪 Logout</button>
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
  sumItem: { flex: 1, textAlign: "center" },
  formCard: { display: "flex", flexDirection: "column", gap: "12px" },
  input: { padding: "12px", borderRadius: "8px", border: "1px solid #ddd", fontSize: "14px", width: "100%", boxSizing: "border-box" },
  mainBtn: { background: "#e53935", color: "#fff", padding: "14px", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold", fontSize: "15px", width: "100%" },
  filterArea: { padding: "15px", borderRadius: "12px", marginBottom: "15px" },
  tabs: { display: "flex", justifyContent: "center", gap: "10px", marginBottom: "20px" },
  tabBtn: { padding: "8px 20px", border: "none", borderRadius: "20px", cursor: "pointer", fontSize: "12px", fontWeight: "bold" },
  historyList: { display: "flex", flexDirection: "column", gap: "10px" },
  historyItem: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px", borderRadius: "8px" },
  footer: { marginTop: "40px", borderTop: "1px solid #eee", paddingTop: "20px", textAlign: "center" },
  navBtn: { padding: "12px 35px", border: "none", borderRadius: "10px", color: "#fff", cursor: "pointer", fontSize: "15px", fontWeight: "bold" },
  editBtn: { background: "orange", color: "#fff", border: "none", padding: "8px 15px", borderRadius: "5px", cursor: "pointer", fontSize: "12px" },
  delBtn: { background: "red", color: "#fff", border: "none", padding: "8px 15px", borderRadius: "5px", cursor: "pointer", fontSize: "12px" },
  warningAlert: { padding: "12px", background: "#ffcdd2", color: "#b71c1c", borderRadius: "8px", textAlign: "center", marginBottom: "10px", fontWeight: "bold" },
  msgAlert: { padding: "12px", background: "#fff3cd", color: "#856404", borderRadius: "8px", textAlign: "center", marginBottom: "10px" },
  widgetCard: { padding: "16px", borderRadius: "14px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" },
  widgetTitle: { fontSize: "13px", fontWeight: "bold", color: "#888", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.5px" },
};
