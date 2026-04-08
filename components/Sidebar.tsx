"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Cpu,
  Zap,
  BarChart3,
  Settings,
  Bell,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Leaf,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/devices", label: "Devices", icon: Cpu },
  { href: "/dashboard/automation", label: "Automation", icon: Zap },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className="sidebar"
      style={{
        width: collapsed ? "72px" : "240px",
        minHeight: "100vh",
        background: "rgba(5, 18, 37, 0.95)",
        borderRight: "1px solid rgba(0, 212, 255, 0.1)",
        backdropFilter: "blur(12px)",
        display: "flex",
        flexDirection: "column",
        transition: "width 0.3s ease",
        position: "sticky",
        top: 0,
        overflow: "hidden",
        zIndex: 100,
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: "24px 16px",
          borderBottom: "1px solid rgba(0, 212, 255, 0.08)",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          justifyContent: collapsed ? "center" : "flex-start",
        }}
      >
        <div
          style={{
            width: "36px",
            height: "36px",
            background: "linear-gradient(135deg, #00d4ff, #0060cc)",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            boxShadow: "0 0 20px rgba(0, 212, 255, 0.4)",
          }}
        >
          <Leaf size={18} color="white" />
        </div>
        {!collapsed && (
          <span
            className="font-orbitron"
            style={{
              fontSize: "16px",
              fontWeight: "700",
              background: "linear-gradient(135deg, #00d4ff, #00ff88)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              whiteSpace: "nowrap",
            }}
          >
            EnergyIQ
          </span>
        )}
      </div>

      {/* Nav */}
      <nav style={{ padding: "16px 8px", flex: 1 }}>
        <div style={{ marginBottom: "8px" }}>
          {!collapsed && (
            <span
              style={{
                fontSize: "10px",
                textTransform: "uppercase",
                letterSpacing: "1px",
                color: "rgba(107, 143, 168, 0.6)",
                padding: "0 8px",
                display: "block",
                marginBottom: "8px",
              }}
            >
              Main Menu
            </span>
          )}
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`sidebar-link ${isActive ? "active" : ""}`}
                style={{
                  justifyContent: collapsed ? "center" : "flex-start",
                  marginBottom: "4px",
                }}
                title={collapsed ? item.label : undefined}
              >
                <Icon size={18} style={{ flexShrink: 0 }} />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Alerts badge */}
      {!collapsed && (
        <div
          style={{
            margin: "0 8px 8px",
            padding: "12px 16px",
            background: "rgba(255, 107, 53, 0.08)",
            border: "1px solid rgba(255, 107, 53, 0.2)",
            borderRadius: "12px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Bell size={14} color="#ff6b35" />
            <span style={{ fontSize: "12px", color: "#ff6b35", fontWeight: 600 }}>
              4 Active Alerts
            </span>
          </div>
          <p style={{ fontSize: "11px", color: "rgba(107, 143, 168, 0.8)", marginTop: "4px" }}>
            AC running in empty room
          </p>
        </div>
      )}

      {/* Bottom */}
      <div
        style={{
          padding: "16px 8px",
          borderTop: "1px solid rgba(0, 212, 255, 0.08)",
        }}
      >
        {/* User */}
        {!collapsed && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "8px",
              marginBottom: "8px",
            }}
          >
            <div
              style={{
                width: "32px",
                height: "32px",
                background: "linear-gradient(135deg, #a855f7, #0060cc)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "12px",
                fontWeight: 700,
                color: "white",
                flexShrink: 0,
              }}
            >
              AK
            </div>
            <div>
              <p style={{ fontSize: "12px", fontWeight: 600, color: "#e2f4ff" }}>Arjun Kumar</p>
              <p style={{ fontSize: "10px", color: "rgba(107, 143, 168, 0.7)" }}>Home Admin</p>
            </div>
          </div>
        )}
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px",
            width: "100%",
            background: "transparent",
            border: "none",
            color: "rgba(107, 143, 168, 0.7)",
            cursor: "pointer",
            borderRadius: "8px",
            fontSize: "13px",
            justifyContent: collapsed ? "center" : "flex-start",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = "#ff6b35";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = "rgba(107, 143, 168, 0.7)";
          }}
          title={collapsed ? "Logout" : undefined}
        >
          <LogOut size={16} />
          {!collapsed && <span>Logout</span>}
        </button>

        {/* Collapse button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "8px",
            width: "100%",
            marginTop: "8px",
            background: "rgba(0, 212, 255, 0.06)",
            border: "1px solid rgba(0, 212, 255, 0.12)",
            borderRadius: "8px",
            color: "rgba(0, 212, 255, 0.6)",
            cursor: "pointer",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(0, 212, 255, 0.1)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(0, 212, 255, 0.06)";
          }}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>
    </aside>
  );
}
