"use client";
import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  unit: string;
  change?: number;
  changeLabel?: string;
  icon: string;
  color: "cyan" | "green" | "orange" | "purple";
  subtitle?: string;
  barPercent?: number;
}

const colorMap = {
  cyan: {
    accent: "#00d4ff",
    bg: "rgba(0, 212, 255, 0.08)",
    border: "rgba(0, 212, 255, 0.2)",
    glow: "rgba(0, 212, 255, 0.15)",
    gradient: "linear-gradient(135deg, #00d4ff, #0060cc)",
  },
  green: {
    accent: "#00ff88",
    bg: "rgba(0, 255, 136, 0.08)",
    border: "rgba(0, 255, 136, 0.2)",
    glow: "rgba(0, 255, 136, 0.15)",
    gradient: "linear-gradient(135deg, #00ff88, #00d4ff)",
  },
  orange: {
    accent: "#ff6b35",
    bg: "rgba(255, 107, 53, 0.08)",
    border: "rgba(255, 107, 53, 0.2)",
    glow: "rgba(255, 107, 53, 0.15)",
    gradient: "linear-gradient(135deg, #ff6b35, #ff3366)",
  },
  purple: {
    accent: "#a855f7",
    bg: "rgba(168, 85, 247, 0.08)",
    border: "rgba(168, 85, 247, 0.2)",
    glow: "rgba(168, 85, 247, 0.15)",
    gradient: "linear-gradient(135deg, #a855f7, #0060cc)",
  },
};

export default function MetricCard({
  title,
  value,
  unit,
  change,
  changeLabel,
  icon,
  color,
  subtitle,
  barPercent,
}: MetricCardProps) {
  const c = colorMap[color];
  const [displayed, setDisplayed] = useState(0);
  const numValue = parseFloat(String(value));

  useEffect(() => {
    let start = 0;
    const end = numValue;
    const duration = 1200;
    const step = (end / duration) * 16;
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setDisplayed(end);
        clearInterval(timer);
      } else {
        setDisplayed(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [numValue]);

  const isPositiveChange = change !== undefined && change >= 0;

  return (
    <div
      className="glass-card"
      style={{
        padding: "20px",
        border: `1px solid ${c.border}`,
        boxShadow: `0 0 30px ${c.glow}`,
        transition: "all 0.3s ease",
        cursor: "default",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = `0 12px 40px ${c.glow}, 0 0 0 1px ${c.border}`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 30px ${c.glow}`;
      }}
    >
      {/* Background glow orb */}
      <div
        style={{
          position: "absolute",
          top: "-20px",
          right: "-20px",
          width: "80px",
          height: "80px",
          background: c.gradient,
          borderRadius: "50%",
          opacity: 0.06,
          filter: "blur(20px)",
        }}
      />

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
        <div>
          <p style={{ fontSize: "12px", color: "rgba(107, 143, 168, 0.8)", fontWeight: 500, letterSpacing: "0.5px" }}>
            {title}
          </p>
        </div>
        <div
          style={{
            width: "38px",
            height: "38px",
            background: c.bg,
            border: `1px solid ${c.border}`,
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "18px",
          }}
        >
          {icon}
        </div>
      </div>

      {/* Value */}
      <div style={{ display: "flex", alignItems: "baseline", gap: "6px", marginBottom: "8px" }}>
        <span
          className="font-orbitron"
          style={{
            fontSize: "28px",
            fontWeight: "700",
            color: c.accent,
            lineHeight: 1,
          }}
        >
          {typeof value === "string" && value.includes(",")
            ? displayed.toLocaleString("en-IN", { maximumFractionDigits: 0 })
            : displayed >= 1000
            ? displayed.toLocaleString("en-IN", { maximumFractionDigits: 0 })
            : displayed.toFixed(displayed < 100 ? 1 : 0)}
        </span>
        <span style={{ fontSize: "13px", color: "rgba(107, 143, 168, 0.7)", fontWeight: 500 }}>{unit}</span>
      </div>

      {/* Subtitle */}
      {subtitle && (
        <p style={{ fontSize: "11px", color: "rgba(107, 143, 168, 0.6)", marginBottom: "10px" }}>{subtitle}</p>
      )}

      {/* Progress bar */}
      {barPercent !== undefined && (
        <div className="metric-bar-track" style={{ marginBottom: "10px" }}>
          <div
            className="metric-bar-fill"
            style={{ width: `${Math.min(barPercent, 100)}%`, background: c.gradient }}
          />
        </div>
      )}

      {/* Change indicator */}
      {change !== undefined && (
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          {isPositiveChange ? (
            <TrendingDown size={12} color="#00ff88" />
          ) : (
            <TrendingUp size={12} color="#ff6b35" />
          )}
          <span
            style={{
              fontSize: "11px",
              color: isPositiveChange ? "#00ff88" : "#ff6b35",
              fontWeight: 600,
            }}
          >
            {Math.abs(change)}% {changeLabel || "vs last week"}
          </span>
        </div>
      )}
    </div>
  );
}
