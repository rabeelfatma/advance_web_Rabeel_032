import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function LandingPage() {
  const nav = useNavigate();

  // ── Contact form state ──
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [formStatus, setFormStatus] = useState(""); // "sending" | "success" | "error"

  const handleInput = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSend = async () => {
    const { name, email, subject, message } = formData;
    if (!name || !email || !subject || !message) {
      setFormStatus("error_empty");
      return;
    }
    setFormStatus("sending");
    try {
      await axios.post("http://localhost:5000/api/contact/send", { name, email, subject, message });
      setFormStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error(err);
      setFormStatus("error");
    }
  };

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={styles.page}>
      {/* ── NAVBAR ── */}
      <nav style={styles.navbar}>
        <div style={styles.navLogo}>
          <div style={styles.logoIconBox}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
            </svg>
          </div>
          <span style={styles.logoText}>Expense Manager</span>
        </div>
        <div style={styles.navLinks}>
          {[["Home","home"],["Features","features"],["About","about"],["Contact","contact"]].map(([label, id]) => (
            <button key={id} style={styles.navLinkBtn} onClick={() => scrollTo(id)}>{label}</button>
          ))}
        </div>
        <div style={styles.navButtons}>
          <button style={styles.loginOutlineBtn} onClick={() => nav("/login")}>Login</button>
          <button style={styles.signupSolidBtn} onClick={() => nav("/signup")}>Sign Up</button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section id="home" style={styles.hero}>
        <div style={styles.heroLeft}>
          <h1 style={styles.heroTitle}>
            Take Control of Your{" "}
            <span style={styles.red}>Finances</span>
          </h1>
          <p style={styles.heroSubtitle}>
            Expense Manager helps you track income, manage expenses, set budgets
            and achieve your financial goals with powerful insights.
          </p>
          <div style={styles.heroBtns}>
            <button style={styles.loginOutlineBtn} onClick={() => nav("/login")}>Login</button>
            <button style={styles.signupSolidBtn} onClick={() => nav("/signup")}>Sign Up</button>
          </div>
          <div style={styles.heroBadges}>
            {[["🛡️","Secure & Safe"],["📈","Smart Analytics"],["🎯","Achieve Goals"]].map(([icon,text]) => (
              <div key={text} style={styles.badge}>
                <span style={{fontSize:"16px"}}>{icon}</span>
                <span style={styles.badgeText}>{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── HERO ILLUSTRATION (matching reference image) ── */}
        <div style={styles.heroRight}>
          <div style={styles.illustrationBg}>

            {/* Decorative blobs */}
            <div style={styles.blob1}/>
            <div style={styles.blob2}/>

            {/* Leaf decorations */}
            <svg style={styles.leafLeft} width="70" height="90" viewBox="0 0 70 90" fill="none">
              <path d="M35 85 C10 60 5 30 35 5 C65 30 60 60 35 85Z" fill="#ffb3b3" opacity="0.5"/>
              <path d="M35 85 C20 55 18 28 35 5" stroke="#e57373" strokeWidth="1.5" fill="none" opacity="0.6"/>
            </svg>
            <svg style={styles.leafRight} width="60" height="80" viewBox="0 0 60 80" fill="none">
              <path d="M30 75 C8 52 4 25 30 4 C56 25 52 52 30 75Z" fill="#ffb3b3" opacity="0.4"/>
              <path d="M30 75 C18 48 16 24 30 4" stroke="#e57373" strokeWidth="1.5" fill="none" opacity="0.5"/>
            </svg>

            {/* Monitor / Dashboard */}
            <div style={styles.monitor}>
              <div style={styles.monitorScreen}>
                {/* Top bar dots */}
                <div style={styles.monitorDots}>
                  <span style={{...styles.dot, background:"#ff6b6b"}}/>
                  <span style={{...styles.dot, background:"#ffd93d"}}/>
                  <span style={{...styles.dot, background:"#6bcb77"}}/>
                </div>
                <p style={styles.dashLabel}>Total Balance</p>
                <p style={styles.dashAmount}>Rs. 24,500</p>
                <div style={styles.chartsRow}>
                  {/* Donut chart */}
                  <svg width="80" height="80" viewBox="0 0 80 80">
                    <circle cx="40" cy="40" r="30" fill="none" stroke="#e53935" strokeWidth="16" strokeDasharray="110 75"/>
                    <circle cx="40" cy="40" r="30" fill="none" stroke="#a5d6a7" strokeWidth="16" strokeDasharray="75 110" strokeDashoffset="-110"/>
                    <circle cx="40" cy="40" r="22" fill="white"/>
                  </svg>
                  {/* Bar chart */}
                  <div style={styles.barsWrap}>
                    {[38,52,44,62,55,100,78].map((h,i) => (
                      <div key={i} style={{
                        ...styles.bar,
                        height:`${h}%`,
                        background: i >= 4 ? "#e53935" : "#f5b8b8",
                      }}/>
                    ))}
                  </div>
                </div>
              </div>
              <div style={styles.monitorStand}/>
              <div style={styles.monitorBase}/>
            </div>

            {/* Phone / Expense card */}
            <div style={styles.phone}>
              <div style={styles.phoneInner}>
                <div style={styles.phoneNotch}/>
                <p style={styles.expLabel}>Expense</p>
                <p style={styles.expAmount}>Rs. 8,500</p>
                <svg width="100%" height="50" viewBox="0 0 120 50" preserveAspectRatio="none">
                  <polyline points="0,38 24,24 48,30 72,12 96,20 120,10" fill="none" stroke="#e53935" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <polygon points="0,38 24,24 48,30 72,12 96,20 120,10 120,50 0,50" fill="rgba(229,57,53,0.08)" stroke="none"/>
                </svg>
                {/* mini rows */}
                <div style={styles.phoneRow}><div style={styles.phoneRowDot}/><div style={styles.phoneRowLine}/></div>
                <div style={styles.phoneRow}><div style={{...styles.phoneRowDot, background:"#a5d6a7"}}/><div style={styles.phoneRowLine}/></div>
              </div>
            </div>

            {/* Wallet */}
            <div style={styles.walletWrap}>
              <svg width="90" height="72" viewBox="0 0 90 72" fill="none">
                {/* wallet body */}
                <rect x="4" y="22" width="82" height="46" rx="8" fill="#c62828"/>
                <rect x="4" y="20" width="82" height="44" rx="8" fill="#e53935"/>
                {/* clasp */}
                <circle cx="72" cy="42" r="8" fill="#c62828"/>
                <circle cx="72" cy="42" r="5" fill="#b71c1c"/>
                {/* money sticking out */}
                <rect x="14" y="8" width="42" height="22" rx="4" fill="#66bb6a"/>
                <rect x="14" y="8" width="42" height="4" rx="2" fill="#43a047"/>
                <rect x="20" y="14" width="30" height="2" rx="1" fill="#81c784" opacity="0.6"/>
                {/* strap */}
                <rect x="4" y="20" width="82" height="10" rx="4" fill="#b71c1c" opacity="0.5"/>
                <circle cx="45" cy="25" r="4" fill="#c62828"/>
                <circle cx="45" cy="25" r="2.5" fill="#ef9a9a"/>
              </svg>
            </div>

            {/* Coins stack */}
            <div style={styles.coinsWrap}>
              {[0,1,2].map(i => (
                <svg key={i} style={{display:"block", marginTop: i === 0 ? 0 : "-10px"}} width="52" height="20" viewBox="0 0 52 20" fill="none">
                  <ellipse cx="26" cy="10" rx="26" ry="10" fill={i===0?"#f57f17":i===1?"#f9a825":"#fbc02d"}/>
                  <ellipse cx="26" cy="8" rx="24" ry="8" fill={i===0?"#f9a825":i===1?"#fbc02d":"#fdd835"}/>
                  {i===2 && <text x="26" y="13" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#e65100" fontFamily="Arial">$</text>}
                </svg>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={styles.statsSection}>
        {[
          {icon:"👥", value:"10K+",  label:"Happy Users"},
          {icon:"📋", value:"500K+", label:"Transactions"},
          {icon:"📊", value:"99%",   label:"Uptime"},
          {icon:"🔒", value:"100%",  label:"Secure"},
        ].map((s,i,arr) => (
          <div key={i} style={{...styles.statItem, borderRight: i<arr.length-1?"1px solid #eee":"none"}}>
            <span style={{fontSize:"32px"}}>{s.icon}</span>
            <div>
              <p style={styles.statValue}>{s.value}</p>
              <p style={styles.statLabel}>{s.label}</p>
            </div>
          </div>
        ))}
      </section>

      {/* ── FEATURES ── */}
      <section id="features" style={styles.featuresSection}>
        <p style={styles.sectionEyebrow}>EVERYTHING YOU NEED</p>
        <h2 style={styles.sectionTitle}>
          Why Choose <span style={styles.red}>Expense Manager?</span>
        </h2>
        <div style={styles.titleUnderline}/>
        <div style={styles.featuresGrid}>
          {[
            {icon:"🥧", color:"#fff0f0", title:"Track Expenses",   desc:"Easily track your daily income and expenses in one place with real-time updates."},
            {icon:"👜", color:"#fff8ee", title:"Budget Planning",   desc:"Set monthly budgets and get smart alerts when you are close to exceeding limits."},
            {icon:"📊", color:"#f0fff4", title:"Smart Analytics",   desc:"Analyze your spending patterns with beautiful interactive charts and detailed reports."},
            {icon:"🎯", color:"#f0f4ff", title:"Goals & Savings",   desc:"Set financial goals, track your savings progress, and celebrate milestones every day."},
            {icon:"🛡️", color:"#f5f0ff", title:"Secure & Private", desc:"Your data is protected with bank-grade encryption, top-notch security and full privacy."},
            {icon:"🌙", color:"#fffbf0", title:"Dark Mode",         desc:"Switch to dark mode any time for a comfortable, eye-friendly viewing experience."},
          ].map((f,i) => (
            <div key={i} style={styles.featureCard}>
              <div style={{...styles.featureIconWrap, background:f.color}}>
                <span style={{fontSize:"28px"}}>{f.icon}</span>
              </div>
              <h3 style={styles.featureTitle}>{f.title}</h3>
              <p style={styles.featureDesc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" style={styles.aboutSection}>
        <div style={styles.aboutInner}>
          <div style={styles.aboutLeft}>
            <p style={styles.sectionEyebrow}>OUR STORY</p>
            <h2 style={styles.sectionTitle}>About <span style={styles.red}>Expense Manager</span></h2>
            <div style={styles.titleUnderline}/>
            <p style={styles.aboutText}>
              Expense Manager was built with one mission — to make personal finance simple,
              transparent, and stress-free for everyone. We believe that understanding where
              your money goes is the first step toward financial freedom.
            </p>
            <p style={styles.aboutText}>
              Developed at COMSATS University Vehari Campus, our app combines intuitive design
              with powerful features to give you full control over your financial life — whether
              you are a student, professional, or small business owner.
            </p>
            <div style={styles.aboutStats}>
              {[["10K+","Active Users"],["500K+","Transactions Tracked"],["4.9★","User Rating"]].map(([v,l]) => (
                <div key={l} style={styles.aboutStat}>
                  <p style={styles.aboutStatVal}>{v}</p>
                  <p style={styles.aboutStatLbl}>{l}</p>
                </div>
              ))}
            </div>
          </div>
          <div style={styles.aboutRight}>
            <div style={styles.aboutCardGrid}>
              {[
                {icon:"🎯", title:"Our Mission",  text:"Empower every person to take control of their finances through smart, accessible tools."},
                {icon:"👁️", title:"Our Vision",   text:"A world where financial stress is eliminated through technology and smart money habits."},
                {icon:"💎", title:"Our Values",   text:"Transparency, security, simplicity, and putting our users financial wellbeing first."},
                {icon:"🚀", title:"Our Journey",  text:"From a university project to a platform trusted by 10,000 plus users across Pakistan."},
              ].map((c,i) => (
                <div key={i} style={styles.aboutCard}>
                  <span style={{fontSize:"28px",marginBottom:"10px",display:"block"}}>{c.icon}</span>
                  <h4 style={styles.aboutCardTitle}>{c.title}</h4>
                  <p style={styles.aboutCardText}>{c.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={styles.contactSection}>
        <p style={styles.sectionEyebrowLight}>GET IN TOUCH</p>
        <h2 style={{...styles.sectionTitle, color:"#fff"}}>
          Contact <span style={{color:"#ffcdd2"}}>Us</span>
        </h2>
        <p style={styles.contactSubtitle}>
          Have a question, feedback, or need support? We would love to hear from you.
        </p>
        <div style={styles.contactGrid}>
          <div style={styles.contactInfoCol}>
            {[
              {icon:"✉️", title:"Email Us",  val:"rabeelfatma032@gmail.com", sub:"We reply within 24 hours"},
              {icon:"📞", title:"Call Us",   val:"+92 300 1234567",           sub:"Mon–Fri, 9am–6pm PKT"},
              {icon:"📍", title:"Visit Us",  val:"COMSATS University",        sub:"Vehari Campus, Punjab, Pakistan"},
            ].map((info,i) => (
              <div key={i} style={styles.contactInfoCard}>
                <div style={styles.contactInfoIcon}>{info.icon}</div>
                <div>
                  <p style={styles.contactInfoTitle}>{info.title}</p>
                  <p style={styles.contactInfoVal}>{info.val}</p>
                  <p style={styles.contactInfoSub}>{info.sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* ── FORM ── */}
          <div style={styles.contactForm}>
            <h3 style={styles.formTitle}>Send a Message</h3>
            <div style={styles.formRow}>
              <input
                style={styles.formInput}
                placeholder="Your Name"
                name="name"
                value={formData.name}
                onChange={handleInput}
              />
              <input
                style={styles.formInput}
                placeholder="Your Email"
                name="email"
                value={formData.email}
                onChange={handleInput}
              />
            </div>
            <input
              style={{...styles.formInput, width:"100%", boxSizing:"border-box", marginBottom:"14px"}}
              placeholder="Subject"
              name="subject"
              value={formData.subject}
              onChange={handleInput}
            />
            <textarea
              style={styles.formTextarea}
              rows={4}
              placeholder="Your Message"
              name="message"
              value={formData.message}
              onChange={handleInput}
            />

            {/* Status messages */}
            {formStatus === "error_empty" && (
              <p style={styles.statusError}>⚠️ Please fill in all fields.</p>
            )}
            {formStatus === "error" && (
              <p style={styles.statusError}>❌ Something went wrong. Please try again.</p>
            )}
            {formStatus === "success" && (
              <p style={styles.statusSuccess}>✅ Message sent successfully!</p>
            )}

            <button
              style={{
                ...styles.formSubmitBtn,
                opacity: formStatus === "sending" ? 0.7 : 1,
                cursor: formStatus === "sending" ? "not-allowed" : "pointer",
              }}
              onClick={handleSend}
              disabled={formStatus === "sending"}
            >
              {formStatus === "sending" ? "Sending..." : "Send Message"}
            </button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={styles.footer}>
        <div style={styles.footerTop}>
          <div style={styles.footerBrand}>
            <div style={styles.footerLogoRow}>
              <div style={styles.logoIconBox}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                </svg>
              </div>
              <span style={styles.logoText}>Expense Manager</span>
            </div>
            <p style={styles.footerTagline}>A smart way to manage your income, expenses and achieve financial freedom.</p>
          </div>
          <div style={styles.footerCol}>
            <h4 style={styles.footerColTitle}>Quick Links</h4>
            {[["Home","home"],["Features","features"],["About Us","about"],["Contact","contact"]].map(([label,id]) => (
              <button key={id} style={styles.footerLinkBtn} onClick={()=>scrollTo(id)}>› {label}</button>
            ))}
          </div>
          <div style={styles.footerCol}>
            <h4 style={styles.footerColTitle}>Contact Us</h4>
            <p style={styles.footerContact}>✉️ rabeelfatma032@gmail.com</p>
            <p style={styles.footerContact}>📞 +92 300 1234567</p>
            <p style={styles.footerContact}>📍 COMSATS University, Vehari Campus</p>
          </div>
          <div style={styles.footerCol}>
            <h4 style={styles.footerColTitle}>Follow Us</h4>
            <div style={styles.socialRow}>
              {["💬","💼","📷"].map((ic,i) => (
                <div key={i} style={styles.socialIcon}>{ic}</div>
              ))}
            </div>
          </div>
        </div>
        <div style={styles.footerBottom}>
          <p style={{margin:0}}>© 2025 Expense Manager. All rights reserved.</p>
          <p style={{margin:0}}>Made with ❤️ by Rabeel Fatima</p>
        </div>
      </footer>
    </div>
  );
}

// ─────────────────────────────────────────────
const RED      = "#e53935";
const LIGHT_BG = "#fff5f5";

const styles = {
  page: { fontFamily:"'Segoe UI',Arial,sans-serif", background:LIGHT_BG, minHeight:"100vh", color:"#222" },

  // NAVBAR
  navbar: { display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 60px", background:"#fff", boxShadow:"0 2px 10px rgba(0,0,0,0.06)", position:"sticky", top:0, zIndex:100 },
  navLogo: { display:"flex", alignItems:"center", gap:"10px" },
  logoIconBox: { width:"36px", height:"36px", background:RED, borderRadius:"8px", display:"flex", alignItems:"center", justifyContent:"center" },
  logoText: { fontWeight:"700", fontSize:"18px", color:RED },
  navLinks: { display:"flex", gap:"8px" },
  navLinkBtn: { background:"none", border:"none", color:"#333", fontSize:"15px", fontWeight:"500", cursor:"pointer", padding:"8px 14px", borderRadius:"6px" },
  navButtons: { display:"flex", gap:"12px" },
  loginOutlineBtn: { padding:"10px 22px", border:`2px solid ${RED}`, background:"white", color:RED, borderRadius:"8px", fontWeight:"700", fontSize:"14px", cursor:"pointer" },
  signupSolidBtn:  { padding:"10px 22px", border:"none", background:RED, color:"white", borderRadius:"8px", fontWeight:"700", fontSize:"14px", cursor:"pointer" },

  // HERO
  hero: { display:"flex", alignItems:"center", justifyContent:"space-between", padding:"70px 60px 60px", gap:"40px", maxWidth:"1200px", margin:"0 auto" },
  heroLeft: { flex:1, maxWidth:"480px" },
  heroTitle: { fontSize:"48px", fontWeight:"800", lineHeight:"1.15", marginBottom:"18px", color:"#111" },
  red: { color:RED },
  heroSubtitle: { fontSize:"15px", color:"#555", lineHeight:"1.7", marginBottom:"30px" },
  heroBtns: { display:"flex", gap:"14px", marginBottom:"32px" },
  heroBadges: { display:"flex", gap:"24px", flexWrap:"wrap" },
  badge: { display:"flex", alignItems:"center", gap:"6px" },
  badgeText: { fontSize:"13px", fontWeight:"600", color:"#444" },

  // HERO RIGHT / ILLUSTRATION
  heroRight: { flex:1, display:"flex", justifyContent:"center", alignItems:"center" },
  illustrationBg: {
    position:"relative",
    width:"480px",
    height:"360px",
    background:"radial-gradient(ellipse at 55% 45%, #fde8e8 0%, #fdf0f0 55%, #fff5f5 100%)",
    borderRadius:"24px",
    overflow:"visible",
  },
  blob1: { position:"absolute", top:"-20px", left:"-20px", width:"160px", height:"120px", background:"rgba(229,57,53,0.07)", borderRadius:"50%", filter:"blur(18px)" },
  blob2: { position:"absolute", bottom:"-10px", right:"-10px", width:"130px", height:"100px", background:"rgba(229,57,53,0.06)", borderRadius:"50%", filter:"blur(14px)" },

  leafLeft:  { position:"absolute", left:"-24px", top:"60px" },
  leafRight: { position:"absolute", right:"-18px", bottom:"40px" },

  // Monitor
  monitor: { position:"absolute", top:"20px", left:"30px", display:"flex", flexDirection:"column", alignItems:"center" },
  monitorScreen: {
    width:"260px", background:"#fff", borderRadius:"12px 12px 0 0",
    border:"3px solid #ddd", padding:"12px 14px",
    boxShadow:"0 8px 32px rgba(0,0,0,0.10)",
  },
  monitorDots: { display:"flex", gap:"5px", marginBottom:"8px" },
  dot: { width:"8px", height:"8px", borderRadius:"50%", display:"inline-block" },
  monitorStand: { width:"20px", height:"22px", background:"#ddd" },
  monitorBase:  { width:"60px", height:"6px", background:"#ccc", borderRadius:"4px" },
  dashLabel:  { fontSize:"11px", color:"#999", margin:"0 0 3px" },
  dashAmount: { fontSize:"22px", fontWeight:"800", color:RED, margin:"0 0 10px" },
  chartsRow:  { display:"flex", alignItems:"flex-end", gap:"14px" },
  barsWrap:   { display:"flex", alignItems:"flex-end", gap:"5px", height:"64px", flex:1 },
  bar:        { flex:1, borderRadius:"4px 4px 0 0", minHeight:"6px" },

  // Phone
  phone: {
    position:"absolute", top:"30px", right:"20px",
    width:"130px", height:"220px",
    background:"#e53935", borderRadius:"20px",
    padding:"3px", boxShadow:"0 8px 28px rgba(229,57,53,0.3)",
  },
  phoneInner: { background:"#fff", borderRadius:"18px", height:"100%", padding:"10px 10px 8px", display:"flex", flexDirection:"column" },
  phoneNotch: { width:"40px", height:"6px", background:"#eee", borderRadius:"3px", margin:"0 auto 8px" },
  expLabel:   { fontSize:"10px", color:"#999", margin:"0 0 2px" },
  expAmount:  { fontSize:"14px", fontWeight:"800", color:RED, margin:"0 0 6px" },
  phoneRow:   { display:"flex", alignItems:"center", gap:"5px", marginTop:"6px" },
  phoneRowDot:{ width:"6px", height:"6px", borderRadius:"50%", background:RED, flexShrink:0 },
  phoneRowLine:{ flex:1, height:"4px", background:"#f5f5f5", borderRadius:"2px" },

  // Wallet
  walletWrap: { position:"absolute", bottom:"30px", left:"40px" },

  // Coins
  coinsWrap: { position:"absolute", bottom:"20px", right:"30px", display:"flex", flexDirection:"column-reverse" },

  // STATS
  statsSection: { display:"flex", justifyContent:"space-around", background:"#fff", padding:"28px 60px", boxShadow:"0 2px 12px rgba(0,0,0,0.04)" },
  statItem:  { display:"flex", alignItems:"center", gap:"14px", flex:1, justifyContent:"center", padding:"0 20px" },
  statValue: { fontSize:"28px", fontWeight:"800", color:RED, margin:0 },
  statLabel: { fontSize:"13px", color:"#666", margin:0 },

  // FEATURES
  featuresSection: { padding:"70px 60px", textAlign:"center", background:LIGHT_BG },
  sectionEyebrow:  { fontSize:"12px", fontWeight:"700", letterSpacing:"2px", color:RED, marginBottom:"8px" },
  sectionTitle:    { fontSize:"32px", fontWeight:"800", marginBottom:"4px" },
  titleUnderline:  { width:"60px", height:"3px", background:RED, margin:"0 auto 40px", borderRadius:"2px" },
  featuresGrid: { display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"24px", maxWidth:"960px", margin:"0 auto" },
  featureCard:  { background:"#fff", borderRadius:"16px", padding:"32px 24px", boxShadow:"0 4px 20px rgba(0,0,0,0.06)", textAlign:"center" },
  featureIconWrap: { width:"64px", height:"64px", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px" },
  featureTitle: { fontSize:"16px", fontWeight:"700", marginBottom:"10px", color:"#111" },
  featureDesc:  { fontSize:"13px", color:"#666", lineHeight:"1.65" },

  // ABOUT
  aboutSection: { background:"#fff", padding:"80px 60px" },
  aboutInner:   { display:"flex", gap:"60px", maxWidth:"1100px", margin:"0 auto", alignItems:"flex-start" },
  aboutLeft:    { flex:1 },
  aboutText:    { fontSize:"15px", color:"#555", lineHeight:"1.8", marginBottom:"18px" },
  aboutStats:   { display:"flex", gap:"32px", marginTop:"32px" },
  aboutStat:    { textAlign:"center" },
  aboutStatVal: { fontSize:"26px", fontWeight:"800", color:RED, margin:0 },
  aboutStatLbl: { fontSize:"12px", color:"#888", margin:"4px 0 0" },
  aboutRight:   { flex:1 },
  aboutCardGrid:{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"18px" },
  aboutCard:    { background:LIGHT_BG, borderRadius:"14px", padding:"24px 20px", boxShadow:"0 2px 12px rgba(0,0,0,0.05)" },
  aboutCardTitle:{ fontSize:"15px", fontWeight:"700", color:"#111", marginBottom:"8px" },
  aboutCardText: { fontSize:"13px", color:"#666", lineHeight:"1.6" },

  // CONTACT
  contactSection: { background:`linear-gradient(135deg, #c62828 0%, ${RED} 50%, #e57373 100%)`, padding:"80px 60px", textAlign:"center" },
  sectionEyebrowLight: { fontSize:"12px", fontWeight:"700", letterSpacing:"2px", color:"rgba(255,255,255,0.7)", marginBottom:"8px" },
  contactSubtitle: { fontSize:"15px", color:"rgba(255,255,255,0.8)", marginBottom:"48px" },
  contactGrid: { display:"flex", gap:"40px", maxWidth:"1000px", margin:"0 auto", textAlign:"left" },
  contactInfoCol: { display:"flex", flexDirection:"column", gap:"20px", flex:"0 0 300px" },
  contactInfoCard: { background:"rgba(255,255,255,0.12)", borderRadius:"14px", padding:"20px", display:"flex", gap:"16px", alignItems:"flex-start" },
  contactInfoIcon: { fontSize:"28px", marginTop:"2px" },
  contactInfoTitle:{ fontSize:"13px", fontWeight:"700", color:"rgba(255,255,255,0.7)", margin:"0 0 4px", textTransform:"uppercase", letterSpacing:"1px" },
  contactInfoVal:  { fontSize:"15px", fontWeight:"700", color:"#fff", margin:"0 0 2px" },
  contactInfoSub:  { fontSize:"12px", color:"rgba(255,255,255,0.6)", margin:0 },
  contactForm: { flex:1, background:"#fff", borderRadius:"18px", padding:"36px 32px" },
  formTitle:   { fontSize:"20px", fontWeight:"700", marginBottom:"20px", color:"#111" },
  formRow:     { display:"flex", gap:"14px", marginBottom:"14px" },
  formInput:   { flex:1, padding:"12px 16px", border:"1.5px solid #eee", borderRadius:"8px", fontSize:"14px", outline:"none", background:"#fafafa" },
  formTextarea:{ width:"100%", padding:"12px 16px", border:"1.5px solid #eee", borderRadius:"8px", fontSize:"14px", outline:"none", resize:"vertical", background:"#fafafa", boxSizing:"border-box", marginBottom:"12px" },
  formSubmitBtn:{ padding:"13px 32px", background:RED, color:"#fff", border:"none", borderRadius:"8px", fontWeight:"700", fontSize:"14px", cursor:"pointer" },
  statusError:   { color:"#c62828", fontSize:"13px", margin:"0 0 10px", fontWeight:"600" },
  statusSuccess: { color:"#2e7d32", fontSize:"13px", margin:"0 0 10px", fontWeight:"600" },

  // FOOTER
  footer: { background:"#fff", borderTop:"1px solid #eee", padding:"48px 60px 0" },
  footerTop: { display:"flex", gap:"60px", justifyContent:"space-between", flexWrap:"wrap", paddingBottom:"36px" },
  footerBrand: { maxWidth:"240px" },
  footerLogoRow:{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"12px" },
  footerTagline:{ fontSize:"13px", color:"#666", lineHeight:"1.6" },
  footerCol:    { display:"flex", flexDirection:"column", gap:"8px" },
  footerColTitle:{ fontSize:"15px", fontWeight:"700", color:RED, marginBottom:"6px" },
  footerLinkBtn: { background:"none", border:"none", fontSize:"13px", color:"#444", cursor:"pointer", textAlign:"left", padding:"2px 0" },
  footerContact: { fontSize:"13px", color:"#444", margin:0 },
  socialRow:    { display:"flex", gap:"10px" },
  socialIcon:   { width:"36px", height:"36px", background:"#111", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"16px", cursor:"pointer" },
  footerBottom: { borderTop:"1px solid #eee", display:"flex", justifyContent:"space-between", padding:"18px 0", fontSize:"13px", color:"#888" },
};