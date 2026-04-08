"use client";
import { useState } from "react";
import { Save, Bell, Shield, Zap, User, Wifi, Mail, Phone } from "lucide-react";

function Section({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="glass-card" style={{ padding: "24px", marginBottom: "20px" }}>
      <h2 style={{ fontSize: "15px", fontWeight: 700, color: "#e2f4ff", marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px" }}>
        {icon} {title}
      </h2>
      {children}
    </div>
  );
}

function SettingRow({ label, description, children }: { label: string; description?: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "14px 0",
        borderBottom: "1px solid rgba(0, 212, 255, 0.06)",
        gap: "16px",
        flexWrap: "wrap",
      }}
    >
      <div style={{ flex: 1, minWidth: "160px" }}>
        <p style={{ fontSize: "13px", color: "#e2f4ff", fontWeight: 500, marginBottom: "2px" }}>{label}</p>
        {description && <p style={{ fontSize: "11px", color: "rgba(107, 143, 168, 0.6)" }}>{description}</p>}
      </div>
      {children}
    </div>
  );
}

function ToggleOption({ id, defaultChecked = true }: { id: string; defaultChecked?: boolean }) {
  const [on, setOn] = useState(defaultChecked);
  return (
    <label className="toggle-switch">
      <input type="checkbox" id={id} checked={on} onChange={() => setOn(!on)} />
      <span className="toggle-slider" />
    </label>
  );
}

function NumberInput({ id, defaultValue, unit }: { id: string; defaultValue: number; unit: string }) {
  const [val, setVal] = useState(defaultValue);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <input
        id={id}
        type="number"
        value={val}
        onChange={(e) => setVal(Number(e.target.value))}
        style={{
          width: "90px",
          padding: "8px 12px",
          background: "rgba(6, 26, 54, 0.8)",
          border: "1px solid rgba(0, 212, 255, 0.2)",
          borderRadius: "8px",
          color: "#00d4ff",
          fontSize: "13px",
          fontFamily: "Orbitron, sans-serif",
          fontWeight: 700,
          textAlign: "right",
          outline: "none",
        }}
        onFocus={(e) => ((e.target as HTMLInputElement).style.borderColor = "rgba(0, 212, 255, 0.5)")}
        onBlur={(e) => ((e.target as HTMLInputElement).style.borderColor = "rgba(0, 212, 255, 0.2)")}
      />
      <span style={{ fontSize: "12px", color: "rgba(107, 143, 168, 0.7)" }}>{unit}</span>
    </div>
  );
}

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div style={{ padding: "28px", maxWidth: "900px" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px" }}>
        <div>
          <h1 style={{ fontSize: "22px", fontWeight: 800, color: "#e2f4ff", marginBottom: "4px" }}>Settings</h1>
          <p style={{ fontSize: "13px", color: "rgba(107, 143, 168, 0.7)" }}>
            Configure alerts, preferences, and device connections
          </p>
        </div>
        <button
          id="save-settings-btn"
          onClick={handleSave}
          style={{
            background: saved ? "linear-gradient(135deg, #00ff88, #00d4ff)" : "linear-gradient(135deg, #00d4ff, #0060cc)",
            border: "none",
            borderRadius: "10px",
            padding: "10px 20px",
            color: "white",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "13px",
            fontWeight: 600,
            transition: "all 0.4s",
            boxShadow: saved ? "0 4px 20px rgba(0, 255, 136, 0.4)" : "0 4px 20px rgba(0, 212, 255, 0.3)",
          }}
        >
          <Save size={14} /> {saved ? "Saved! ✓" : "Save Changes"}
        </button>
      </div>

      {/* Profile */}
      <Section title="User Profile" icon={<User size={16} color="#00d4ff" />}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          {[
            { label: "Full Name", id: "profile-name", value: "Arjun Kumar", type: "text" },
            { label: "Email Address", id: "profile-email", value: "arjun@energyiq.in", type: "email" },
            { label: "Phone Number", id: "profile-phone", value: "+91 98765 43210", type: "tel" },
            { label: "Location", id: "profile-location", value: "Mumbai, Maharashtra", type: "text" },
          ].map((f) => (
            <div key={f.id}>
              <label style={{ fontSize: "12px", color: "rgba(107, 143, 168, 0.8)", fontWeight: 500, display: "block", marginBottom: "6px" }}>
                {f.label}
              </label>
              <input
                id={f.id}
                type={f.type}
                defaultValue={f.value}
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  background: "rgba(6, 26, 54, 0.8)",
                  border: "1px solid rgba(0, 212, 255, 0.15)",
                  borderRadius: "8px",
                  color: "#e2f4ff",
                  fontSize: "13px",
                  outline: "none",
                }}
                onFocus={(e) => ((e.target as HTMLInputElement).style.borderColor = "rgba(0, 212, 255, 0.4)")}
                onBlur={(e) => ((e.target as HTMLInputElement).style.borderColor = "rgba(0, 212, 255, 0.15)")}
              />
            </div>
          ))}
        </div>
      </Section>

      {/* Alert Thresholds */}
      <Section title="Alert Thresholds" icon={<Zap size={16} color="#ff6b35" />}>
        <SettingRow label="Power Overload Threshold" description="Send alert when total power exceeds this">
          <NumberInput id="threshold-power" defaultValue={3500} unit="W" />
        </SettingRow>
        <SettingRow label="Daily Usage Limit" description="Alert when daily usage exceeds target">
          <NumberInput id="threshold-daily" defaultValue={25} unit="kWh" />
        </SettingRow>
        <SettingRow label="Monthly Bill Alert" description="Notify when estimated bill exceeds budget">
          <NumberInput id="threshold-bill" defaultValue={2500} unit="₹" />
        </SettingRow>
        <SettingRow label="Idle Device Timeout" description="Alert when device is idle for this duration">
          <NumberInput id="threshold-idle" defaultValue={30} unit="min" />
        </SettingRow>
        <SettingRow label="Temperature Threshold" description="Alert when ambient temp exceeds value">
          <NumberInput id="threshold-temp" defaultValue={32} unit="°C" />
        </SettingRow>
      </Section>

      {/* Notifications */}
      <Section title="Notifications" icon={<Bell size={16} color="#a855f7" />}>
        <SettingRow label="Push Notifications" description="In-app alerts for all events">
          <ToggleOption id="notif-push" defaultChecked={true} />
        </SettingRow>
        <SettingRow label="Email Alerts" description="Daily summary and critical alerts via email">
          <ToggleOption id="notif-email" defaultChecked={true} />
        </SettingRow>
        <SettingRow label="SMS Alerts" description="Critical notifications via SMS">
          <ToggleOption id="notif-sms" defaultChecked={false} />
        </SettingRow>
        <SettingRow label="Weekly Report" description="Comprehensive energy report every Monday">
          <ToggleOption id="notif-weekly" defaultChecked={true} />
        </SettingRow>
        <SettingRow label="Anomaly Detection Alerts" description="Alert on unusual consumption patterns">
          <ToggleOption id="notif-anomaly" defaultChecked={true} />
        </SettingRow>
        <SettingRow label="Solar Surplus Alert" description="Notify when solar generates excess energy">
          <ToggleOption id="notif-solar" defaultChecked={false} />
        </SettingRow>
      </Section>

      {/* IoT Connection */}
      <Section title="IoT Gateway" icon={<Wifi size={16} color="#00ff88" />}>
        <SettingRow label="MQTT Broker URL" description="Connection endpoint for IoT devices">
          <input
            id="mqtt-url"
            defaultValue="mqtt://broker.energyiq.in:1883"
            style={{
              padding: "8px 14px",
              background: "rgba(6, 26, 54, 0.8)",
              border: "1px solid rgba(0, 212, 255, 0.15)",
              borderRadius: "8px",
              color: "#00d4ff",
              fontSize: "12px",
              fontFamily: "monospace",
              outline: "none",
              width: "280px",
            }}
          />
        </SettingRow>
        <SettingRow label="Auto-discover Devices" description="Automatically scan for new IoT devices">
          <ToggleOption id="iot-autodiscover" defaultChecked={true} />
        </SettingRow>
        <SettingRow label="Data Sync Interval" description="How often to pull IoT sensor readings">
          <select
            id="iot-sync-interval"
            defaultValue="5 seconds"
            style={{
              padding: "8px 14px",
              background: "rgba(6, 26, 54, 0.8)",
              border: "1px solid rgba(0, 212, 255, 0.15)",
              borderRadius: "8px",
              color: "#e2f4ff",
              fontSize: "13px",
              outline: "none",
              cursor: "pointer",
            }}
          >
            {["1 second", "5 seconds", "10 seconds", "30 seconds", "1 minute"].map((opt) => (
              <option key={opt} value={opt} style={{ background: "#051225" }}>{opt}</option>
            ))}
          </select>
        </SettingRow>
        <SettingRow label="Encrypt Data Transmission" description="SSL/TLS for IoT data security">
          <ToggleOption id="iot-ssl" defaultChecked={true} />
        </SettingRow>
      </Section>

      {/* Security */}
      <Section title="Security" icon={<Shield size={16} color="#facc15" />}>
        <SettingRow label="Two-Factor Authentication" description="Add an extra layer of account security">
          <ToggleOption id="security-2fa" defaultChecked={false} />
        </SettingRow>
        <SettingRow label="Session Timeout" description="Auto-logout after inactivity">
          <select
            id="security-timeout"
            defaultValue="1 hour"
            style={{
              padding: "8px 14px",
              background: "rgba(6, 26, 54, 0.8)",
              border: "1px solid rgba(0, 212, 255, 0.15)",
              borderRadius: "8px",
              color: "#e2f4ff",
              fontSize: "13px",
              outline: "none",
              cursor: "pointer",
            }}
          >
            {["15 minutes", "30 minutes", "1 hour", "4 hours", "Never"].map((opt) => (
              <option key={opt} value={opt} style={{ background: "#051225" }}>{opt}</option>
            ))}
          </select>
        </SettingRow>
        <SettingRow label="API Access" description="Allow third-party integrations via API key">
          <ToggleOption id="security-api" defaultChecked={false} />
        </SettingRow>
      </Section>
    </div>
  );
}
