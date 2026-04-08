"use client";
import { useState } from "react";
import { devices as initialDevices } from "@/lib/mockData";
import { useDevicePower } from "@/lib/useLiveData";
import { Wifi, Zap } from "lucide-react";

type Device = typeof initialDevices[0];

function getStatusColor(status: boolean, power: number) {
  if (!status) return "#6b7280";
  if (power < 0) return "#00ff88";
  if (power > 1000) return "#ff6b35";
  return "#00d4ff";
}

export default function DeviceCard({
  device,
  onToggle,
}: {
  device: Device;
  onToggle: (id: number) => void;
}) {
  // Live-fluctuating power reading for this device
  const livePower = useDevicePower(Math.abs(device.power), device.status);
  const statusColor = getStatusColor(device.status, device.power);
  const isActive = device.status;
  const isSolar = device.power < 0;
  const displayPower = isSolar ? Math.abs(device.power) : livePower;

  return (
    <div
      className="glass-card"
      style={{
        padding: "16px",
        border: `1px solid ${isActive ? statusColor + "33" : "rgba(0, 212, 255, 0.1)"}`,
        boxShadow: isActive ? `0 0 20px ${statusColor}18` : "none",
        transition: "all 0.3s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
      }}
    >
      {/* Header row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              background: isActive ? `${statusColor}22` : "rgba(255,255,255,0.04)",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "20px",
              border: `1px solid ${isActive ? statusColor + "44" : "rgba(255,255,255,0.06)"}`,
            }}
          >
            {device.icon}
          </div>
          <div>
            <p style={{ fontSize: "13px", fontWeight: 600, color: "#e2f4ff" }}>{device.name}</p>
            <p style={{ fontSize: "10px", color: "rgba(107, 143, 168, 0.7)" }}>{device.room}</p>
          </div>
        </div>

        {/* Toggle */}
        <label className="toggle-switch" style={{ flexShrink: 0 }}>
          <input
            type="checkbox"
            checked={isActive}
            onChange={() => onToggle(device.id)}
            id={`toggle-device-${device.id}`}
          />
          <span className="toggle-slider" />
        </label>
      </div>

      {/* Power info */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <Zap size={12} color={statusColor} />
          <span
            className="font-orbitron"
            style={{ fontSize: "14px", fontWeight: 700, color: statusColor }}
          >
            {isActive ? (isSolar ? `+${displayPower}` : displayPower) : 0}W
          </span>
          {isSolar && isActive && (
            <span style={{ fontSize: "10px", color: "#00ff88", background: "rgba(0,255,136,0.1)", padding: "1px 6px", borderRadius: "4px" }}>
              generating
            </span>
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <span className="status-dot" style={{ background: statusColor, boxShadow: isActive ? `0 0 6px ${statusColor}` : "none" }} />
          <span style={{ fontSize: "10px", color: "rgba(107, 143, 168, 0.7)" }}>
            {isActive ? "Online" : "Offline"}
          </span>
        </div>
      </div>

      {/* Power bar */}
      {isActive && displayPower > 0 && (
        <div style={{ marginTop: "10px" }}>
          <div className="metric-bar-track">
            <div
              className="metric-bar-fill"
              style={{
                width: `${Math.min((displayPower / 2000) * 100, 100)}%`,
                background: `linear-gradient(90deg, ${statusColor}99, ${statusColor})`,
                transition: "width 2s ease",
              }}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "4px" }}>
            <span style={{ fontSize: "9px", color: "rgba(107, 143, 168, 0.5)" }}>0W</span>
            <span style={{ fontSize: "9px", color: "rgba(107, 143, 168, 0.5)" }}>2000W</span>
          </div>
        </div>
      )}
    </div>
  );
}

type FilterType = "All" | "Online" | "HVAC" | "Lighting" | "Appliance";

export function DeviceGrid({
  filter = "All",
  search = "",
}: {
  filter?: FilterType;
  search?: string;
}) {
  const [deviceList, setDeviceList] = useState(initialDevices);

  const handleToggle = (id: number) => {
    setDeviceList((prev) =>
      prev.map((d) =>
        d.id === id
          ? {
              ...d,
              status: !d.status,
              power: !d.status
                ? d.id === 9
                  ? -800
                  : Math.abs(d.power) || [1500, 200, 60, 150, 800, 75, 60, 7200, 800, 2000][d.id - 1]
                : 0,
            }
          : d
      )
    );
  };

  // Apply filter logic
  const filteredDevices = deviceList.filter((d) => {
    const matchesSearch =
      search.trim() === "" ||
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.room.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" ||
      (filter === "Online" && d.status) ||
      (filter === "HVAC" && d.type === "HVAC") ||
      (filter === "Lighting" && d.type === "Lighting") ||
      (filter === "Appliance" && d.type === "Appliance");

    return matchesSearch && matchesFilter;
  });

  const activeDevices = deviceList.filter((d) => d.status);
  const totalPower = deviceList.filter((d) => d.status && d.power > 0).reduce((sum, d) => sum + d.power, 0);
  const solarPower = Math.abs(deviceList.find((d) => d.id === 9 && d.status)?.power || 0);

  return (
    <div>
      {/* Summary bar */}
      <div
        style={{
          display: "flex",
          gap: "16px",
          marginBottom: "20px",
          padding: "14px 20px",
          background: "rgba(0, 212, 255, 0.05)",
          border: "1px solid rgba(0, 212, 255, 0.12)",
          borderRadius: "12px",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Wifi size={14} color="#00ff88" />
          <span style={{ fontSize: "12px", color: "#e2f4ff" }}>
            <strong style={{ color: "#00ff88" }}>{activeDevices.length}</strong> / {deviceList.length} Online
          </span>
        </div>
        <div style={{ width: "1px", background: "rgba(0, 212, 255, 0.1)", alignSelf: "stretch" }} />
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Zap size={14} color="#ff6b35" />
          <span style={{ fontSize: "12px", color: "#e2f4ff" }}>
            Total Load: <strong style={{ color: "#ff6b35" }}>{totalPower}W</strong>
          </span>
        </div>
        <div style={{ width: "1px", background: "rgba(0, 212, 255, 0.1)", alignSelf: "stretch" }} />
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "14px" }}>☀️</span>
          <span style={{ fontSize: "12px", color: "#e2f4ff" }}>
            Solar: <strong style={{ color: "#00ff88" }}>{solarPower}W</strong>
          </span>
        </div>
        {/* Filtered count */}
        {filter !== "All" || search ? (
          <div style={{ marginLeft: "auto", fontSize: "11px", color: "rgba(107,143,168,0.7)" }}>
            Showing <strong style={{ color: "#00d4ff" }}>{filteredDevices.length}</strong> of {deviceList.length} devices
          </div>
        ) : null}
      </div>

      {/* Device cards */}
      {filteredDevices.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "14px",
          }}
        >
          {filteredDevices.map((device) => (
            <DeviceCard key={device.id} device={device} onToggle={handleToggle} />
          ))}
        </div>
      ) : (
        <div
          className="glass-card"
          style={{ padding: "48px", textAlign: "center", border: "1px solid rgba(0,212,255,0.1)" }}
        >
          <div style={{ fontSize: "36px", marginBottom: "12px" }}>🔍</div>
          <p style={{ color: "#e2f4ff", fontWeight: 600, marginBottom: "6px" }}>No devices found</p>
          <p style={{ color: "rgba(107,143,168,0.6)", fontSize: "13px" }}>
            No devices match <strong style={{ color: "#00d4ff" }}>"{filter}"</strong>
            {search ? ` and "${search}"` : ""}
          </p>
        </div>
      )}
    </div>
  );
}
