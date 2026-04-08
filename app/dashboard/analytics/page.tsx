"use client";
import { WeeklyChart, MonthlyBarChart, CategoryDoughnut } from "@/components/EnergyCharts";
import { TrendingDown, Sun, Leaf, DollarSign, Zap } from "lucide-react";

const predictions = [
  { label: "Tomorrow's Usage", value: "18.4 kWh", trend: "-6%", up: false, icon: "📊" },
  { label: "Monthly Bill Est.", value: "₹1,840", trend: "-₹420", up: false, icon: "💰" },
  { label: "Peak Load Time", value: "7–9 PM", trend: "High risk", up: true, icon: "⚡" },
  { label: "Savings This Month", value: "₹420", trend: "+₹80 vs Aug", up: false, icon: "🎯" },
];

export default function AnalyticsPage() {
  return (
    <div style={{ padding: "28px" }}>
      {/* Header */}
      <div style={{ marginBottom: "28px" }}>
        <h1 style={{ fontSize: "22px", fontWeight: 800, color: "#e2f4ff", marginBottom: "4px" }}>Energy Analytics</h1>
        <p style={{ fontSize: "13px", color: "rgba(107, 143, 168, 0.7)" }}>
          Historical trends, AI predictions, and consumption breakdown
        </p>
      </div>

      {/* AI Predictions */}
      <div style={{ marginBottom: "24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
          <div
            style={{
              padding: "4px 12px",
              background: "rgba(168, 85, 247, 0.1)",
              border: "1px solid rgba(168, 85, 247, 0.3)",
              borderRadius: "999px",
              fontSize: "11px",
              color: "#a855f7",
              fontWeight: 600,
              letterSpacing: "0.5px",
            }}
          >
            🤖 AI PREDICTIONS
          </div>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "12px",
          }}
        >
          {predictions.map((p, i) => (
            <div
              key={i}
              className="glass-card"
              style={{
                padding: "18px",
                border: "1px solid rgba(168, 85, 247, 0.15)",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)";
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(168, 85, 247, 0.35)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(168, 85, 247, 0.15)";
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <span style={{ fontSize: "11px", color: "rgba(107, 143, 168, 0.7)", fontWeight: 500 }}>{p.label}</span>
                <span style={{ fontSize: "18px" }}>{p.icon}</span>
              </div>
              <p className="font-orbitron" style={{ fontSize: "20px", fontWeight: 700, color: "#e2f4ff", marginBottom: "6px" }}>
                {p.value}
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <TrendingDown size={12} color={p.up ? "#ff6b35" : "#00ff88"} style={{ transform: p.up ? "rotate(180deg)" : "none" }} />
                <span style={{ fontSize: "11px", color: p.up ? "#ff6b35" : "#00ff88", fontWeight: 600 }}>
                  {p.trend}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Charts section */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
        {/* Weekly trend */}
        <div className="glass-card" style={{ padding: "20px" }}>
          <div style={{ marginBottom: "16px" }}>
            <h2 style={{ fontSize: "15px", fontWeight: 700, color: "#e2f4ff", marginBottom: "4px" }}>
              7-Day Energy Trend
            </h2>
            <p style={{ fontSize: "11px", color: "rgba(107, 143, 168, 0.6)" }}>Consumption vs Solar vs Savings (kWh)</p>
          </div>
          <div style={{ height: "240px" }}>
            <WeeklyChart />
          </div>
        </div>

        {/* Category breakdown */}
        <div className="glass-card" style={{ padding: "20px" }}>
          <div style={{ marginBottom: "16px" }}>
            <h2 style={{ fontSize: "15px", fontWeight: 700, color: "#e2f4ff", marginBottom: "4px" }}>
              Energy by Category
            </h2>
            <p style={{ fontSize: "11px", color: "rgba(107, 143, 168, 0.6)" }}>Device category breakdown (%)</p>
          </div>
          <div style={{ height: "240px" }}>
            <CategoryDoughnut />
          </div>
        </div>
      </div>

      {/* Monthly bar + CO2 */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "20px" }}>
        {/* Monthly comparison */}
        <div className="glass-card" style={{ padding: "20px" }}>
          <div style={{ marginBottom: "16px" }}>
            <h2 style={{ fontSize: "15px", fontWeight: 700, color: "#e2f4ff", marginBottom: "4px" }}>
              Monthly Comparison
            </h2>
            <p style={{ fontSize: "11px", color: "rgba(107, 143, 168, 0.6)" }}>12-month consumption and bill tracker</p>
          </div>
          <div style={{ height: "260px" }}>
            <MonthlyBarChart />
          </div>
        </div>

        {/* CO2 + Eco stats */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {/* CO2 */}
          <div
            className="glass-card"
            style={{
              padding: "20px",
              flex: 1,
              border: "1px solid rgba(0, 255, 136, 0.2)",
              boxShadow: "0 0 30px rgba(0, 255, 136, 0.06)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
              <Leaf size={16} color="#00ff88" />
              <h2 style={{ fontSize: "14px", fontWeight: 700, color: "#e2f4ff" }}>Eco Impact</h2>
            </div>
            {[
              { label: "CO₂ Reduced", value: "42.3 kg", icon: "🌿", color: "#00ff88" },
              { label: "Trees Equivalent", value: "2.1 trees", icon: "🌳", color: "#00d4ff" },
              { label: "Coal Equivalent", value: "17 kg", icon: "⬛", color: "#a855f7" },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px 0",
                  borderBottom: i < 2 ? "1px solid rgba(0, 212, 255, 0.06)" : "none",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ fontSize: "16px" }}>{item.icon}</span>
                  <span style={{ fontSize: "12px", color: "rgba(107, 143, 168, 0.8)" }}>{item.label}</span>
                </div>
                <span className="font-orbitron" style={{ fontSize: "13px", fontWeight: 700, color: item.color }}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>

          {/* Solar summary */}
          <div
            className="glass-card"
            style={{
              padding: "20px",
              border: "1px solid rgba(250, 204, 21, 0.2)",
              boxShadow: "0 0 30px rgba(250, 204, 21, 0.05)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
              <Sun size={16} color="#facc15" />
              <h2 style={{ fontSize: "14px", fontWeight: 700, color: "#e2f4ff" }}>Solar Summary</h2>
            </div>
            {[
              { label: "Generated Today", value: "4.2 kWh", color: "#facc15" },
              { label: "Grid Offset", value: "62%", color: "#00ff88" },
              { label: "Exported to Grid", value: "1.1 kWh", color: "#00d4ff" },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px 0",
                  borderBottom: i < 2 ? "1px solid rgba(0, 212, 255, 0.06)" : "none",
                }}
              >
                <span style={{ fontSize: "12px", color: "rgba(107, 143, 168, 0.8)" }}>{item.label}</span>
                <span className="font-orbitron" style={{ fontSize: "13px", fontWeight: 700, color: item.color }}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
