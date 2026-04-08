"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Leaf, Zap, Shield, BarChart3, Cpu, Globe, ArrowRight, CheckCircle2 } from "lucide-react";

// Animated stat counter
function AnimatedNumber({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let current = 0;
    const step = target / 60;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { setVal(target); clearInterval(timer); }
      else setVal(Math.floor(current));
    }, 20);
    return () => clearInterval(timer);
  }, [target]);
  return <span>{val.toLocaleString()}{suffix}</span>;
}

// Wave bars for hero
function EnergyWave() {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: "4px", height: "48px" }}>
      {Array.from({ length: 16 }).map((_, i) => (
        <div
          key={i}
          className="wave-bar"
          style={{
            width: "6px",
            height: `${20 + Math.sin(i * 0.8) * 14}px`,
            background: `linear-gradient(to top, #00d4ff, #00ff88)`,
            borderRadius: "3px",
            animationDuration: `${0.8 + Math.random() * 0.8}s`,
            animationDelay: `${i * 0.08}s`,
            opacity: 0.7 + Math.sin(i) * 0.3,
          }}
        />
      ))}
    </div>
  );
}

const features = [
  {
    icon: <Zap size={22} />,
    title: "Real-Time Monitoring",
    desc: "Live voltage, current, and power readings from all connected IoT sensors and smart meters.",
    color: "#00d4ff",
    bg: "rgba(0, 212, 255, 0.08)",
  },
  {
    icon: <Cpu size={22} />,
    title: "Smart Device Control",
    desc: "Remotely toggle appliances, set schedules, and establish energy limits from anywhere.",
    color: "#a855f7",
    bg: "rgba(168, 85, 247, 0.08)",
  },
  {
    icon: <BarChart3 size={22} />,
    title: "AI Energy Prediction",
    desc: "ML-powered forecasts for next-day usage, monthly bills, and peak load patterns.",
    color: "#00ff88",
    bg: "rgba(0, 255, 136, 0.08)",
  },
  {
    icon: <Shield size={22} />,
    title: "Waste Detection",
    desc: "Automatic alerts when AC runs in empty rooms or devices consume abnormal power.",
    color: "#ff6b35",
    bg: "rgba(255, 107, 53, 0.08)",
  },
  {
    icon: <Globe size={22} />,
    title: "Renewable Integration",
    desc: "Track solar generation, battery levels, and grid consumption in one unified view.",
    color: "#facc15",
    bg: "rgba(250, 204, 21, 0.08)",
  },
  {
    icon: <Leaf size={22} />,
    title: "Eco Impact Tracker",
    desc: "Visualize your CO₂ savings and contribution to a greener planet in real time.",
    color: "#00ff88",
    bg: "rgba(0, 255, 136, 0.08)",
  },
];

const stats = [
  { label: "kWh Monitored", value: 2400000, suffix: "+" },
  { label: "Active Users", value: 12500, suffix: "+" },
  { label: "Tonnes CO₂ Saved", value: 4800, suffix: "T" },
  { label: "Avg. Bill Reduction", value: 32, suffix: "%" },
];

const plans = [
  { name: "Home", price: "Free", features: ["Up to 8 devices", "7-day history", "Basic alerts", "Mobile dashboard"] },
  { name: "Pro", price: "₹499/mo", features: ["Unlimited devices", "1-year history", "AI predictions", "Automation rules", "Email/SMS alerts", "Solar tracking"], highlight: true },
  { name: "Enterprise", price: "Custom", features: ["Multi-site management", "API access", "Custom integrations", "Dedicated support", "SLA guarantee"] },
];

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="hero-gradient grid-pattern" style={{ minHeight: "100vh" }}>
      {/* NAV */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "rgba(2, 11, 24, 0.8)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(0, 212, 255, 0.08)",
          padding: "0 24px",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "64px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                background: "linear-gradient(135deg, #00d4ff, #0060cc)",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 20px rgba(0, 212, 255, 0.4)",
              }}
            >
              <Leaf size={18} color="white" />
            </div>
            <span
              className="font-orbitron"
              style={{
                fontSize: "18px",
                fontWeight: "700",
                background: "linear-gradient(135deg, #00d4ff, #00ff88)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              EnergyIQ
            </span>
          </div>

          <div style={{ display: "flex", gap: "8px" }}>
            <Link href="/dashboard" className="btn-secondary" style={{ fontSize: "13px", padding: "8px 20px", textDecoration: "none" }}>
              Login
            </Link>
            <Link href="/dashboard" className="btn-primary" style={{ fontSize: "13px", padding: "8px 20px", textDecoration: "none" }}>
              Launch App →
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "100px 24px 80px",
          textAlign: "center",
        }}
      >
        {/* Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(0, 212, 255, 0.08)",
            border: "1px solid rgba(0, 212, 255, 0.2)",
            borderRadius: "999px",
            padding: "6px 16px",
            marginBottom: "32px",
          }}
        >
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#00ff88", boxShadow: "0 0 8px #00ff88" }} />
          <span style={{ fontSize: "12px", color: "#00d4ff", fontWeight: 500 }}>AI-Powered IoT Energy Platform</span>
        </div>

        <h1
          style={{
            fontSize: "clamp(36px, 6vw, 72px)",
            fontWeight: 900,
            lineHeight: 1.1,
            marginBottom: "24px",
            letterSpacing: "-1px",
          }}
        >
          Smart Energy.{" "}
          <br />
          <span className="gradient-text-multi">Zero Waste.</span>
        </h1>

        <p
          style={{
            fontSize: "clamp(15px, 2vw, 19px)",
            color: "rgba(107, 143, 168, 0.9)",
            maxWidth: "560px",
            margin: "0 auto 40px",
            lineHeight: 1.7,
          }}
        >
          Monitor, control, and optimize your home's energy consumption with real-time IoT sensors, AI predictions, and intelligent automation.
        </p>

        {/* CTA buttons */}
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap", marginBottom: "60px" }}>
          <Link
            href="/dashboard"
            className="btn-primary"
            style={{
              textDecoration: "none",
              fontSize: "15px",
              padding: "14px 32px",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            Open Dashboard <ArrowRight size={16} />
          </Link>
          <a
            href="#features"
            className="btn-secondary"
            style={{
              textDecoration: "none",
              fontSize: "15px",
              padding: "14px 32px",
            }}
          >
            See Features
          </a>
        </div>

        {/* Energy wave decoration */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "60px" }}>
          <EnergyWave />
        </div>

        {/* Hero stats grid */}
        <div
          className="glass-card"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "0",
            border: "1px solid rgba(0, 212, 255, 0.12)",
            overflow: "hidden",
          }}
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              style={{
                padding: "24px",
                borderRight: i < stats.length - 1 ? "1px solid rgba(0, 212, 255, 0.08)" : "none",
                textAlign: "center",
              }}
            >
              <p
                className="font-orbitron"
                style={{ fontSize: "28px", fontWeight: 800, color: "#00d4ff", marginBottom: "4px" }}
              >
                <AnimatedNumber target={stat.value} suffix={stat.suffix} />
              </p>
              <p style={{ fontSize: "12px", color: "rgba(107, 143, 168, 0.7)" }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" style={{ maxWidth: "1200px", margin: "0 auto", padding: "60px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <p style={{ fontSize: "12px", color: "#00d4ff", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", marginBottom: "12px" }}>
            Features
          </p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, marginBottom: "16px" }}>
            Everything you need to <span className="gradient-text-cyan">save energy</span>
          </h2>
          <p style={{ color: "rgba(107, 143, 168, 0.8)", maxWidth: "480px", margin: "0 auto", fontSize: "15px", lineHeight: 1.7 }}>
            A complete platform combining IoT sensors, AI analytics, and smart automation.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "20px",
          }}
        >
          {features.map((f, i) => (
            <div
              key={i}
              className="glass-card"
              style={{
                padding: "24px",
                cursor: "default",
                transition: "all 0.3s ease",
                border: `1px solid ${f.color}22`,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = `0 16px 40px ${f.color}22`;
                (e.currentTarget as HTMLDivElement).style.borderColor = `${f.color}44`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                (e.currentTarget as HTMLDivElement).style.borderColor = `${f.color}22`;
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  background: f.bg,
                  border: `1px solid ${f.color}44`,
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: f.color,
                  marginBottom: "16px",
                }}
              >
                {f.icon}
              </div>
              <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#e2f4ff", marginBottom: "8px" }}>
                {f.title}
              </h3>
              <p style={{ fontSize: "13px", color: "rgba(107, 143, 168, 0.8)", lineHeight: 1.7 }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "60px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, marginBottom: "16px" }}>
            How It <span className="gradient-text-green">Works</span>
          </h2>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "24px",
            textAlign: "center",
          }}
        >
          {[
            { step: "01", icon: "🔌", title: "Connect Devices", desc: "Pair your IoT sensors and smart plugs via our gateway" },
            { step: "02", icon: "📊", title: "Monitor Usage", desc: "View real-time energy data across all devices" },
            { step: "03", icon: "🤖", title: "AI Optimizes", desc: "Our AI detects waste and suggests automation rules" },
            { step: "04", icon: "💰", title: "Save Money", desc: "Reduce your energy bill by up to 35% automatically" },
          ].map((item, i) => (
            <div key={i} style={{ position: "relative" }}>
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  background: "rgba(0, 212, 255, 0.08)",
                  border: "1px solid rgba(0, 212, 255, 0.2)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "28px",
                  margin: "0 auto 16px",
                }}
              >
                {item.icon}
              </div>
              <p style={{ fontSize: "11px", color: "#00d4ff", fontWeight: 600, marginBottom: "4px", letterSpacing: "1px" }}>STEP {item.step}</p>
              <h3 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "8px" }}>{item.title}</h3>
              <p style={{ fontSize: "13px", color: "rgba(107, 143, 168, 0.8)", lineHeight: 1.6 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "60px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, marginBottom: "16px" }}>
            Simple <span className="gradient-text-cyan">Pricing</span>
          </h2>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "20px",
          }}
        >
          {plans.map((plan, i) => (
            <div
              key={i}
              className="glass-card"
              style={{
                padding: "28px",
                border: plan.highlight ? "1px solid rgba(0, 212, 255, 0.4)" : "1px solid rgba(0, 212, 255, 0.1)",
                boxShadow: plan.highlight ? "0 0 40px rgba(0, 212, 255, 0.15)" : "none",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {plan.highlight && (
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "3px",
                    background: "linear-gradient(90deg, #00d4ff, #00ff88)",
                  }}
                />
              )}
              {plan.highlight && (
                <span
                  style={{
                    position: "absolute",
                    top: "16px",
                    right: "16px",
                    background: "linear-gradient(135deg, #00d4ff, #0060cc)",
                    color: "white",
                    fontSize: "10px",
                    padding: "3px 10px",
                    borderRadius: "999px",
                    fontWeight: 700,
                    letterSpacing: "0.5px",
                  }}
                >
                  POPULAR
                </span>
              )}
              <p style={{ fontSize: "14px", color: "rgba(107, 143, 168, 0.8)", fontWeight: 500, marginBottom: "8px" }}>{plan.name}</p>
              <p
                className="font-orbitron"
                style={{ fontSize: "32px", fontWeight: 800, color: plan.highlight ? "#00d4ff" : "#e2f4ff", marginBottom: "20px" }}
              >
                {plan.price}
              </p>
              <ul style={{ listStyle: "none", marginBottom: "24px" }}>
                {plan.features.map((f, j) => (
                  <li key={j} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                    <CheckCircle2 size={14} color="#00ff88" style={{ flexShrink: 0 }} />
                    <span style={{ fontSize: "13px", color: "rgba(107, 143, 168, 0.9)" }}>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/dashboard"
                style={{
                  display: "block",
                  textAlign: "center",
                  textDecoration: "none",
                  padding: "11px",
                  borderRadius: "10px",
                  fontSize: "13px",
                  fontWeight: 600,
                  background: plan.highlight ? "linear-gradient(135deg, #00d4ff, #0060cc)" : "transparent",
                  color: plan.highlight ? "white" : "#00d4ff",
                  border: plan.highlight ? "none" : "1px solid rgba(0, 212, 255, 0.3)",
                  transition: "all 0.3s",
                }}
              >
                Get Started
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* CTA BANNER */}
      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "60px 24px" }}>
        <div
          className="glass-card"
          style={{
            padding: "56px 40px",
            textAlign: "center",
            background: "linear-gradient(135deg, rgba(0, 212, 255, 0.08), rgba(0, 255, 136, 0.04))",
            border: "1px solid rgba(0, 212, 255, 0.2)",
            boxShadow: "0 0 60px rgba(0, 212, 255, 0.08)",
          }}
        >
          <h2 style={{ fontSize: "clamp(24px, 4vw, 40px)", fontWeight: 800, marginBottom: "16px" }}>
            Ready to cut your energy bill?
          </h2>
          <p style={{ color: "rgba(107, 143, 168, 0.8)", marginBottom: "32px", fontSize: "16px" }}>
            Join 12,500+ smart homes saving energy every day.
          </p>
          <Link href="/dashboard" className="btn-primary" style={{ textDecoration: "none", fontSize: "15px", padding: "14px 40px" }}>
            Launch Dashboard Free →
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          borderTop: "1px solid rgba(0, 212, 255, 0.08)",
          padding: "24px",
          textAlign: "center",
          color: "rgba(107, 143, 168, 0.5)",
          fontSize: "12px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "8px" }}>
          <Leaf size={14} color="#00d4ff" />
          <span className="font-orbitron" style={{ color: "#00d4ff", fontSize: "13px" }}>EnergyIQ</span>
        </div>
        © 2025 EnergyIQ Technologies. Smart energy for a sustainable future.
      </footer>
    </div>
  );
}
