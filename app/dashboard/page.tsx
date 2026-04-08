"use client";
import { useEffect, useState } from "react";
import MetricCard from "@/components/MetricCard";
import { RealtimeChart } from "@/components/EnergyCharts";
import AlertPanel from "@/components/AlertPanel";
import { devices } from "@/lib/mockData";
import { useLiveData } from "@/lib/useLiveData";
import { Bell, RefreshCw, Sun, Zap, Wifi, Activity, CheckCircle2 } from "lucide-react";

export default function DashboardPage() {
  const [time, setTime] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshed, setRefreshed] = useState(false);

  // All live data from the central hook
  const { power, solar, netPower, todayUsage, monthlyBill, co2Saved, efficiency, refresh } = useLiveData();

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const handleRefresh = () => {
    if (isRefreshing) return;
    setIsRefreshing(true);
    setRefreshed(false);
    setTimeout(() => {
      refresh(); // immediately update all live metrics
      setIsRefreshing(false);
      setRefreshed(true);
      setTimeout(() => setRefreshed(false), 2500);
    }, 1200);
  };

  const activeDevices = devices.filter((d) => d.status);
  const topDevices = devices
    .filter((d) => d.status && d.id !== 9)
    .sort((a, b) => b.power - a.power)
    .slice(0, 5);

  return (
    <div style={{ padding: "28px" }}>
      {/* Page header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px" }}>
        <div>
          <h1 style={{ fontSize: "22px", fontWeight: 800, color: "#e2f4ff", marginBottom: "4px" }}>
            Energy Dashboard
          </h1>
          <p style={{ fontSize: "13px", color: "rgba(107, 143, 168, 0.7)" }}>
            {time.toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })} •{" "}
            <span style={{ color: "#00d4ff", fontFamily: "monospace" }}>
              {time.toLocaleTimeString("en-IN")}
            </span>
          </p>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            id="refresh-dashboard"
            onClick={handleRefresh}
            disabled={isRefreshing}
            style={{
              background: refreshed ? "rgba(0, 255, 136, 0.1)" : "rgba(0, 212, 255, 0.08)",
              border: `1px solid ${refreshed ? "rgba(0,255,136,0.3)" : "rgba(0, 212, 255, 0.2)"}`,
              borderRadius: "10px",
              padding: "9px 12px",
              color: refreshed ? "#00ff88" : "#00d4ff",
              cursor: isRefreshing ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "12px",
              fontWeight: 500,
              transition: "all 0.3s",
              opacity: isRefreshing ? 0.7 : 1,
            }}
          >
            {refreshed ? (
              <><CheckCircle2 size={14} /> Updated!</>
            ) : (
              <>
                <RefreshCw
                  size={14}
                  style={{ animation: isRefreshing ? "spin 0.8s linear infinite" : "none" }}
                />
                {isRefreshing ? "Fetching..." : "Refresh"}
              </>
            )}
          </button>
          <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>

          <div
            style={{
              background: "rgba(0, 255, 136, 0.08)",
              border: "1px solid rgba(0, 255, 136, 0.2)",
              borderRadius: "10px",
              padding: "9px 16px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "12px",
              color: "#00ff88",
              fontWeight: 600,
            }}
          >
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#00ff88",
                animation: "pulse-cyan 1.5s infinite",
              }}
            />
            Live
          </div>
        </div>
      </div>

      {/* Metric cards — all powered by useLiveData */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        <MetricCard
          title="Current Power Draw"
          value={netPower}
          unit="W"
          change={-8}
          changeLabel="less than avg"
          icon="⚡"
          color="cyan"
          barPercent={(netPower / 3000) * 100}
        />
        <MetricCard
          title="Today's Usage"
          value={todayUsage}
          unit="kWh"
          change={-12}
          changeLabel="vs yesterday"
          icon="📊"
          color="green"
          subtitle="Target: 20 kWh"
          barPercent={(todayUsage / 20) * 100}
        />
        <MetricCard
          title="Monthly Bill Est."
          value={monthlyBill}
          unit="₹"
          change={15}
          changeLabel="savings vs last month"
          icon="💰"
          color="orange"
          subtitle={`₹${Math.round(todayUsage * 8.3 * 2)} saved this month`}
        />
        <MetricCard
          title="CO₂ Saved"
          value={co2Saved}
          unit="kg"
          change={-24}
          changeLabel="less emissions"
          icon="🌱"
          color="purple"
          subtitle="Equivalent to 2 trees planted"
        />
      </div>

      {/* Status row — all live */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: "12px",
          marginBottom: "24px",
        }}
      >
        {[
          { label: "Active Devices", value: `${activeDevices.length}/${devices.length}`, icon: <Wifi size={14} />, color: "#00ff88" },
          { label: "Solar Generation", value: `${solar}W`, icon: <Sun size={14} />, color: "#facc15" },
          { label: "Grid Usage", value: `${netPower}W`, icon: <Zap size={14} />, color: "#00d4ff" },
          { label: "Efficiency Score", value: `${efficiency}%`, icon: <Activity size={14} />, color: "#a855f7" },
        ].map((item, i) => (
          <div
            key={i}
            className="glass-card"
            style={{
              padding: "14px 16px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              border: `1px solid ${item.color}22`,
            }}
          >
            <div
              style={{
                width: "34px",
                height: "34px",
                background: `${item.color}18`,
                border: `1px solid ${item.color}33`,
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: item.color,
                flexShrink: 0,
              }}
            >
              {item.icon}
            </div>
            <div>
              <p style={{ fontSize: "11px", color: "rgba(107, 143, 168, 0.7)" }}>{item.label}</p>
              <p className="font-orbitron" style={{ fontSize: "16px", fontWeight: 700, color: item.color }}>
                {item.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Main content grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "20px" }}>
        {/* Real-time chart */}
        <div className="glass-card" style={{ padding: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <div>
              <h2 style={{ fontSize: "15px", fontWeight: 700, color: "#e2f4ff" }}>Live Power Feed</h2>
              <p style={{ fontSize: "11px", color: "rgba(107, 143, 168, 0.6)" }}>Real-time consumption (Watts)</p>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "11px",
                color: "rgba(107,143,168,0.7)",
                background: "rgba(0,212,255,0.06)",
                border: "1px solid rgba(0,212,255,0.12)",
                borderRadius: "6px",
                padding: "5px 10px",
              }}
            >
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#00d4ff", animation: "pulse-cyan 2s infinite" }} />
              {netPower}W
            </div>
          </div>
          <div style={{ height: "240px" }}>
            <RealtimeChart />
          </div>
        </div>

        {/* Alerts */}
        <div className="glass-card" style={{ padding: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <h2 style={{ fontSize: "15px", fontWeight: 700, color: "#e2f4ff" }}>Active Alerts</h2>
            <div
              style={{
                background: "rgba(255, 107, 53, 0.15)",
                border: "1px solid rgba(255, 107, 53, 0.3)",
                borderRadius: "999px",
                padding: "3px 10px",
                fontSize: "11px",
                color: "#ff6b35",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <Bell size={10} /> 4 new
            </div>
          </div>
          <AlertPanel />
        </div>
      </div>

      {/* Top Consumers Table */}
      <div className="glass-card" style={{ padding: "20px", marginTop: "20px" }}>
        <h2 style={{ fontSize: "15px", fontWeight: 700, color: "#e2f4ff", marginBottom: "16px" }}>
          Top Energy Consumers
        </h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0, 212, 255, 0.08)" }}>
              {["Device", "Room", "Status", "Power", "% of Total", "Actions"].map((h) => (
                <th
                  key={h}
                  style={{
                    textAlign: "left",
                    padding: "10px 12px",
                    fontSize: "11px",
                    color: "rgba(107, 143, 168, 0.7)",
                    fontWeight: 600,
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {topDevices.map((device) => {
              const pct = Math.round((device.power / netPower) * 100);
              return (
                <tr
                  key={device.id}
                  style={{ borderBottom: "1px solid rgba(0, 212, 255, 0.04)", transition: "background 0.2s" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLTableRowElement).style.background = "rgba(0, 212, 255, 0.04)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLTableRowElement).style.background = "transparent")}
                >
                  <td style={{ padding: "12px", display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", color: "#e2f4ff", fontWeight: 500 }}>
                    <span style={{ fontSize: "18px" }}>{device.icon}</span> {device.name}
                  </td>
                  <td style={{ padding: "12px", fontSize: "12px", color: "rgba(107, 143, 168, 0.7)" }}>{device.room}</td>
                  <td style={{ padding: "12px" }}>
                    <span style={{
                      fontSize: "11px",
                      fontWeight: 600,
                      color: device.status ? "#00ff88" : "#6b7280",
                      background: device.status ? "rgba(0, 255, 136, 0.1)" : "rgba(107,114,128,0.1)",
                      padding: "3px 10px",
                      borderRadius: "999px",
                      border: `1px solid ${device.status ? "rgba(0,255,136,0.3)" : "rgba(107,114,128,0.2)"}`,
                    }}>
                      {device.status ? "Online" : "Offline"}
                    </span>
                  </td>
                  <td style={{ padding: "12px" }}>
                    <span className="font-orbitron" style={{ fontSize: "13px", fontWeight: 700, color: device.power > 1000 ? "#ff6b35" : "#00d4ff" }}>
                      {device.power}W
                    </span>
                  </td>
                  <td style={{ padding: "12px", minWidth: "120px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div className="metric-bar-track" style={{ flex: 1 }}>
                        <div
                          className="metric-bar-fill"
                          style={{
                            width: `${Math.min(pct, 100)}%`,
                            background: pct > 50 ? "linear-gradient(90deg, #ff6b35, #ff3366)" : "linear-gradient(90deg, #00d4ff, #00ff88)",
                          }}
                        />
                      </div>
                      <span style={{ fontSize: "11px", color: "rgba(107, 143, 168, 0.7)", width: "30px" }}>{pct}%</span>
                    </div>
                  </td>
                  <td style={{ padding: "12px" }}>
                    <button
                      style={{
                        fontSize: "11px",
                        padding: "4px 12px",
                        background: "rgba(255, 107, 53, 0.1)",
                        border: "1px solid rgba(255, 107, 53, 0.3)",
                        borderRadius: "6px",
                        color: "#ff6b35",
                        cursor: "pointer",
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "rgba(255, 107, 53, 0.2)")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "rgba(255, 107, 53, 0.1)")}
                    >
                      Turn Off
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
