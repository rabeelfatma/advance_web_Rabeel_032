import React, { useEffect, useState } from "react";
import api from "../api";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, CartesianGrid, Legend
} from "recharts";
import { useNavigate } from "react-router-dom";

export default function AnalysisPage() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await api.get("/transactions");
        setData(res.data);
      } catch (err) {
        console.log("Error loading data", err);
      }
    };
    loadData();
  }, []);

  // --- 🕒 FILTER LOGIC ---
  const filteredData = data.filter((item) => {
    const itemDate = new Date(item.date);
    const now = new Date();
    if (filter === "daily") return itemDate.toDateString() === now.toDateString();
    if (filter === "monthly") return itemDate.getMonth() === now.getMonth() && itemDate.getFullYear() === now.getFullYear();
    if (filter === "yearly") return itemDate.getFullYear() === now.getFullYear();
    return true;
  });

  // --- 📊 CALCULATIONS ---
  const income = filteredData.filter(x => x.type === "income").reduce((a, b) => a + Number(b.amount), 0);
  const expense = filteredData.filter(x => x.type === "expense").reduce((a, b) => a + Number(b.amount), 0);
  const savings = income - expense;
  const savingsRate = income > 0 ? ((savings / income) * 100).toFixed(1) : 0;

  const catMap = {};
  filteredData.filter(x => x.type === "expense").forEach(item => {
    catMap[item.category] = (catMap[item.category] || 0) + Number(item.amount);
  });
  const highestCat = Object.keys(catMap).reduce((a, b) => catMap[a] > catMap[b] ? a : b, "N/A");

  // --- 📈 GRAPH DATA LOGIC (Fix for Daily/Empty lines) ---
  const getChartData = () => {
    const format = filteredData.reduce((acc, item) => {
      // Agar daily filter hai to hours dikhaye, warna month/date
      const label = filter === "daily" 
        ? new Date(item.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        : new Date(item.date).toLocaleDateString([], { month: 'short', day: 'numeric' });
      
      let existing = acc.find(d => d.name === label);
      if (!existing) {
        existing = { name: label, income: 0, expense: 0 };
        acc.push(existing);
      }
      if (item.type === "income") existing.income += Number(item.amount);
      else existing.expense += Number(item.amount);
      return acc;
    }, []);

    // Sort data by date so lines flow correctly
    return format.sort((a, b) => new Date(a.name) - new Date(b.name));
  };

  const trendData = getChartData();
  const summaryData = [
    { name: "Income", value: income },
    { name: "Expense", value: expense },
  ];

  const COLORS = ["#4CAF50", "#e53935"]; // Green for Income, Red for Expense

  return (
    <div style={styles.container}>
      {/* HEADER */}
      <div style={styles.header}>
        <div style={{display: "flex", alignItems: "center", gap: "15px"}}>
          <button onClick={() => navigate(-1)} style={styles.backBtn}>← Back</button>
          <h2 style={styles.title}>📊 Financial Analytics</h2>
        </div>
        <div style={styles.filterGroup}>
          {["all", "daily", "monthly", "yearly"].map((f) => (
            <button 
              key={f} 
              onClick={() => setFilter(f)} 
              style={{...styles.filterBtn, background: filter === f ? "#e53935" : "#fff", color: filter === f ? "#fff" : "#e53935"}}
            >
              {f.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* STATS CARDS */}
      <div style={styles.statsRow}>
        <div style={styles.statCard}>
          <p style={styles.statLabel}>Total Savings</p>
          <h3 style={{...styles.statVal, color: "#4CAF50"}}>Rs. {savings}</h3>
          <small style={styles.subText}>{savingsRate}% of income saved</small>
        </div>
        <div style={styles.statCard}>
          <p style={styles.statLabel}>Top Expense Category</p>
          <h3 style={{...styles.statVal, color: "#e53935"}}>{highestCat}</h3>
          <small style={styles.subText}>Highest Spending</small>
        </div>
        <div style={styles.statCard}>
          <p style={styles.statLabel}>Total Transactions</p>
          <h3 style={{...styles.statVal, color: "#2196F3"}}>{filteredData.length}</h3>
          <small style={styles.subText}>In selected period</small>
        </div>
      </div>

      {/* MAIN CHART */}
      <div style={styles.chartWrapper}>
        <h4 style={styles.chartTitle}>Income vs Expense Trend</h4>
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#888" fontSize={12} />
              <YAxis stroke="#888" fontSize={12} />
              <Tooltip contentStyle={styles.tooltip} />
              <Legend verticalAlign="top" height={36}/>
              <Line type="monotone" dataKey="income" stroke="#4CAF50" strokeWidth={3} dot={{ r: 6 }} activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="expense" stroke="#e53935" strokeWidth={3} dot={{ r: 6 }} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* BOTTOM CHARTS */}
      <div style={styles.bottomRow}>
        <div style={{...styles.chartWrapper, flex: 1}}>
          <h4 style={styles.chartTitle}>Budget Distribution</h4>
          <div style={{ width: "100%", height: 250 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={summaryData} dataKey="value" innerRadius={60} outerRadius={80} paddingAngle={5}>
                  {summaryData.map((e, i) => <Cell key={i} fill={COLORS[i]} />)}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div style={{...styles.chartWrapper, flex: 1}}>
          <h4 style={styles.chartTitle}>Income vs Expense Bar</h4>
          <div style={{ width: "100%", height: 250 }}>
            <ResponsiveContainer>
              <BarChart data={summaryData}>
                <XAxis dataKey="name" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip cursor={{fill: '#f5f5f5'}}/>
                <Bar dataKey="value" radius={[10, 10, 0, 0]}>
                  {summaryData.map((e, i) => <Cell key={i} fill={COLORS[i]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #fff5f5 0%, #ffffff 100%)",
    padding: "30px",
    fontFamily: "'Poppins', sans-serif"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "40px",
    flexWrap: "wrap",
    gap: "20px"
  },
  backBtn: {
    padding: "8px 16px",
    background: "#fff",
    border: "1px solid #e53935",
    color: "#e53935",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold"
  },
  title: { fontSize: "28px", color: "#e53935", margin: 0 },
  filterGroup: { 
    display: "flex", 
    gap: "10px", 
    background: "#fff", 
    padding: "5px", 
    borderRadius: "12px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
  },
  filterBtn: {
    padding: "8px 18px",
    border: "1px solid #e53935",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "bold",
    transition: "0.3s"
  },
  statsRow: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "25px",
    marginBottom: "30px"
  },
  statCard: {
    background: "#fff",
    padding: "25px",
    borderRadius: "20px",
    boxShadow: "0 10px 30px rgba(229, 57, 53, 0.08)",
    textAlign: "center",
    border: "1px solid #fff5f5"
  },
  statLabel: { color: "#888", fontSize: "14px", marginBottom: "10px" },
  statVal: { fontSize: "30px", margin: "0", fontWeight: "bold" },
  subText: { color: "#aaa", fontSize: "12px", marginTop: "5px", display: "block" },
  chartWrapper: {
    background: "#fff",
    padding: "30px",
    borderRadius: "25px",
    marginBottom: "30px",
    boxShadow: "0 10px 40px rgba(0,0,0,0.04)",
    border: "1px solid #fff5f5"
  },
  chartTitle: { fontSize: "16px", color: "#e53935", marginBottom: "20px", fontWeight: "600" },
  bottomRow: { display: "flex", gap: "30px", flexWrap: "wrap" },
  tooltip: {
    borderRadius: '12px',
    border: 'none',
    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
    padding: '10px'
  }
};