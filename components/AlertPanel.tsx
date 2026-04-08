"use client";
import { useState } from "react";
import { alerts as initialAlerts } from "@/lib/mockData";
import { X, Bell } from "lucide-react";

type AlertType = "warning" | "info" | "success";

const typeStyles: Record<AlertType, { border: string; bg: string; iconColor: string }> = {
  warning: { border: "#ff6b35", bg: "rgba(255, 107, 53, 0.07)", iconColor: "#ff6b35" },
  info: { border: "#00d4ff", bg: "rgba(0, 212, 255, 0.07)", iconColor: "#00d4ff" },
  success: { border: "#00ff88", bg: "rgba(0, 255, 136, 0.07)", iconColor: "#00ff88" },
};

export default function AlertPanel() {
  const [alertList, setAlertList] = useState(initialAlerts);

  const dismiss = (id: number) => {
    setAlertList((prev) => prev.filter((a) => a.id !== id));
  };

  if (alertList.length === 0) {
    return (
      <div
        className="glass-card"
        style={{
          padding: "32px",
          textAlign: "center",
          border: "1px solid rgba(0, 255, 136, 0.15)",
        }}
      >
        <div style={{ fontSize: "32px", marginBottom: "8px" }}>✅</div>
        <p style={{ color: "#00ff88", fontWeight: 600, fontSize: "14px" }}>All Clear!</p>
        <p style={{ color: "rgba(107, 143, 168, 0.6)", fontSize: "12px" }}>No active alerts</p>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      {alertList.map((alert) => {
        const style = typeStyles[alert.type as AlertType];
        return (
          <div
            key={alert.id}
            style={{
              padding: "12px 14px",
              background: style.bg,
              borderLeft: `3px solid ${style.border}`,
              borderRadius: "0 10px 10px 0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: "10px",
              animation: "countUp 0.3s ease",
            }}
          >
            <div style={{ display: "flex", gap: "10px", flex: 1 }}>
              <span style={{ fontSize: "16px", flexShrink: 0 }}>{alert.icon}</span>
              <div>
                <p style={{ fontSize: "12px", color: "#e2f4ff", fontWeight: 500, lineHeight: 1.4 }}>
                  {alert.message}
                </p>
                <div style={{ display: "flex", gap: "8px", marginTop: "4px" }}>
                  <span style={{ fontSize: "10px", color: "rgba(107, 143, 168, 0.6)" }}>{alert.time}</span>
                  <span style={{ fontSize: "10px", color: style.border }}>• {alert.device}</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => dismiss(alert.id)}
              style={{
                background: "none",
                border: "none",
                color: "rgba(107, 143, 168, 0.4)",
                cursor: "pointer",
                padding: "2px",
                flexShrink: 0,
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#e2f4ff")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "rgba(107, 143, 168, 0.4)")}
              title="Dismiss"
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
