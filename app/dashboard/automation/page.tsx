"use client";
import { useState } from "react";
import { automationRules } from "@/lib/mockData";
import { Plus, Zap, Trash2, ToggleLeft, ToggleRight, ChevronRight } from "lucide-react";

type Rule = typeof automationRules[0];

const conditionOptions = [
  "Room unoccupied > 10 minutes",
  "Total power > 3000W",
  "Total power > 3500W",
  "Solar generation > 1000W",
  "Time between 6 PM – 10 PM",
  "Time after 11 PM",
  "Temperature > 30°C",
  "Device idle > 30 minutes",
];

const actionOptions = [
  "Turn OFF all lights",
  "Turn OFF Air Conditioner",
  "Turn OFF Washing Machine",
  "Set AC to 26°C",
  "Start EV Charger",
  "Dim all lights to 20%",
  "Send alert notification",
  "Turn OFF all non-essential devices",
];

export default function AutomationPage() {
  const [rules, setRules] = useState<Rule[]>(automationRules);
  const [showBuilder, setShowBuilder] = useState(false);
  const [newRule, setNewRule] = useState({ name: "", condition: "", action: "" });

  const toggleRule = (id: number) => {
    setRules((prev) => prev.map((r) => (r.id === id ? { ...r, active: !r.active } : r)));
  };

  const deleteRule = (id: number) => {
    setRules((prev) => prev.filter((r) => r.id !== id));
  };

  const addRule = () => {
    if (!newRule.name || !newRule.condition || !newRule.action) return;
    const rule: Rule = {
      id: Date.now(),
      name: newRule.name,
      condition: newRule.condition,
      action: newRule.action,
      active: true,
      triggered: 0,
      saved: "0 kWh",
    };
    setRules((prev) => [rule, ...prev]);
    setNewRule({ name: "", condition: "", action: "" });
    setShowBuilder(false);
  };

  const activeCount = rules.filter((r) => r.active).length;
  const totalSaved = "21.2 kWh";

  return (
    <div style={{ padding: "28px" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "28px", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h1 style={{ fontSize: "22px", fontWeight: 800, color: "#e2f4ff", marginBottom: "4px" }}>Automation Rules</h1>
          <p style={{ fontSize: "13px", color: "rgba(107, 143, 168, 0.7)" }}>
            Create IF/THEN rules to automatically optimize energy usage
          </p>
        </div>
        <button
          id="create-rule-btn"
          onClick={() => setShowBuilder(!showBuilder)}
          style={{
            background: "linear-gradient(135deg, #a855f7, #0060cc)",
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
            boxShadow: "0 4px 20px rgba(168, 85, 247, 0.3)",
            transition: "all 0.3s",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)")}
        >
          <Plus size={16} /> Create Rule
        </button>
      </div>

      {/* Stats bar */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "12px",
          marginBottom: "24px",
        }}
      >
        {[
          { label: "Active Rules", value: activeCount, color: "#00ff88", icon: "⚡" },
          { label: "Total Rules", value: rules.length, color: "#00d4ff", icon: "📋" },
          { label: "Energy Saved (Today)", value: totalSaved, color: "#a855f7", icon: "💾" },
          { label: "Times Triggered", value: rules.reduce((s, r) => s + r.triggered, 0), color: "#ff6b35", icon: "🔔" },
        ].map((s, i) => (
          <div
            key={i}
            className="glass-card"
            style={{ padding: "16px", display: "flex", alignItems: "center", gap: "12px", border: `1px solid ${s.color}22` }}
          >
            <span style={{ fontSize: "22px" }}>{s.icon}</span>
            <div>
              <p style={{ fontSize: "11px", color: "rgba(107, 143, 168, 0.7)" }}>{s.label}</p>
              <p className="font-orbitron" style={{ fontSize: "18px", fontWeight: 700, color: s.color }}>
                {s.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Rule Builder */}
      {showBuilder && (
        <div
          className="glass-card"
          style={{
            padding: "24px",
            marginBottom: "24px",
            border: "1px solid rgba(168, 85, 247, 0.3)",
            boxShadow: "0 0 40px rgba(168, 85, 247, 0.1)",
          }}
        >
          <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#e2f4ff", marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px" }}>
            <Zap size={16} color="#a855f7" /> Build Automation Rule
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px", marginBottom: "20px" }}>
            {/* Rule Name */}
            <div>
              <label style={{ fontSize: "12px", color: "rgba(107, 143, 168, 0.8)", fontWeight: 500, display: "block", marginBottom: "6px" }}>
                Rule Name
              </label>
              <input
                id="rule-name-input"
                value={newRule.name}
                onChange={(e) => setNewRule((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="e.g. Night Mode"
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
                onFocus={(e) => ((e.target as HTMLInputElement).style.borderColor = "rgba(168, 85, 247, 0.5)")}
                onBlur={(e) => ((e.target as HTMLInputElement).style.borderColor = "rgba(0, 212, 255, 0.15)")}
              />
            </div>

            {/* IF Condition */}
            <div>
              <label style={{ fontSize: "12px", color: "rgba(107, 143, 168, 0.8)", fontWeight: 500, display: "block", marginBottom: "6px" }}>
                🔵 IF Condition
              </label>
              <select
                id="rule-condition-select"
                value={newRule.condition}
                onChange={(e) => setNewRule((prev) => ({ ...prev, condition: e.target.value }))}
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  background: "rgba(6, 26, 54, 0.8)",
                  border: "1px solid rgba(0, 212, 255, 0.15)",
                  borderRadius: "8px",
                  color: "#e2f4ff",
                  fontSize: "13px",
                  outline: "none",
                  cursor: "pointer",
                }}
              >
                <option value="">Select condition...</option>
                {conditionOptions.map((c) => (
                  <option key={c} value={c} style={{ background: "#051225" }}>{c}</option>
                ))}
              </select>
            </div>

            {/* THEN Action */}
            <div>
              <label style={{ fontSize: "12px", color: "rgba(107, 143, 168, 0.8)", fontWeight: 500, display: "block", marginBottom: "6px" }}>
                🟢 THEN Action
              </label>
              <select
                id="rule-action-select"
                value={newRule.action}
                onChange={(e) => setNewRule((prev) => ({ ...prev, action: e.target.value }))}
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  background: "rgba(6, 26, 54, 0.8)",
                  border: "1px solid rgba(0, 212, 255, 0.15)",
                  borderRadius: "8px",
                  color: "#e2f4ff",
                  fontSize: "13px",
                  outline: "none",
                  cursor: "pointer",
                }}
              >
                <option value="">Select action...</option>
                {actionOptions.map((a) => (
                  <option key={a} value={a} style={{ background: "#051225" }}>{a}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Preview */}
          {newRule.condition && newRule.action && (
            <div
              style={{
                padding: "14px 18px",
                background: "rgba(168, 85, 247, 0.06)",
                border: "1px solid rgba(168, 85, 247, 0.2)",
                borderRadius: "10px",
                marginBottom: "16px",
                fontSize: "13px",
                color: "#e2f4ff",
                lineHeight: 1.7,
              }}
            >
              <span style={{ color: "#00d4ff", fontWeight: 600 }}>IF</span>{" "}
              <span style={{ color: "#a855f7" }}>{newRule.condition}</span>{" "}
              <ChevronRight size={14} style={{ display: "inline", verticalAlign: "middle", color: "rgba(107,143,168,0.5)" }} />{" "}
              <span style={{ color: "#00ff88", fontWeight: 600 }}>THEN</span>{" "}
              <span style={{ color: "#facc15" }}>{newRule.action}</span>
            </div>
          )}

          <div style={{ display: "flex", gap: "10px" }}>
            <button
              onClick={() => setShowBuilder(false)}
              style={{
                padding: "10px 20px",
                background: "transparent",
                border: "1px solid rgba(107, 143, 168, 0.2)",
                borderRadius: "8px",
                color: "rgba(107, 143, 168, 0.8)",
                cursor: "pointer",
                fontSize: "13px",
              }}
            >
              Cancel
            </button>
            <button
              id="save-rule-btn"
              onClick={addRule}
              style={{
                padding: "10px 24px",
                background: newRule.name && newRule.condition && newRule.action
                  ? "linear-gradient(135deg, #a855f7, #0060cc)"
                  : "rgba(107,143,168,0.1)",
                border: "none",
                borderRadius: "8px",
                color: "white",
                cursor: newRule.name && newRule.condition && newRule.action ? "pointer" : "not-allowed",
                fontSize: "13px",
                fontWeight: 600,
                opacity: newRule.name && newRule.condition && newRule.action ? 1 : 0.5,
              }}
            >
              Save Rule
            </button>
          </div>
        </div>
      )}

      {/* Rules list */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {rules.map((rule) => (
          <div
            key={rule.id}
            className="glass-card"
            style={{
              padding: "18px 20px",
              border: rule.active ? "1px solid rgba(0, 212, 255, 0.15)" : "1px solid rgba(107, 143, 168, 0.08)",
              opacity: rule.active ? 1 : 0.6,
              transition: "all 0.3s",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "16px" }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                  <span style={{ fontSize: "14px", fontWeight: 700, color: "#e2f4ff" }}>{rule.name}</span>
                  {rule.active && (
                    <span style={{
                      fontSize: "10px",
                      background: "rgba(0, 255, 136, 0.1)",
                      color: "#00ff88",
                      border: "1px solid rgba(0,255,136,0.25)",
                      padding: "2px 8px",
                      borderRadius: "999px",
                      fontWeight: 600,
                    }}>
                      ACTIVE
                    </span>
                  )}
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                  <span
                    style={{
                      fontSize: "12px",
                      background: "rgba(0, 212, 255, 0.08)",
                      border: "1px solid rgba(0, 212, 255, 0.2)",
                      color: "#00d4ff",
                      padding: "4px 12px",
                      borderRadius: "6px",
                      fontWeight: 500,
                    }}
                  >
                    IF: {rule.condition}
                  </span>
                  <ChevronRight size={14} color="rgba(107, 143, 168, 0.4)" />
                  <span
                    style={{
                      fontSize: "12px",
                      background: "rgba(0, 255, 136, 0.08)",
                      border: "1px solid rgba(0, 255, 136, 0.2)",
                      color: "#00ff88",
                      padding: "4px 12px",
                      borderRadius: "6px",
                      fontWeight: 500,
                    }}
                  >
                    THEN: {rule.action}
                  </span>
                </div>

                <div style={{ display: "flex", gap: "16px", marginTop: "8px" }}>
                  <span style={{ fontSize: "11px", color: "rgba(107, 143, 168, 0.6)" }}>
                    🔔 Triggered: <strong style={{ color: "#e2f4ff" }}>{rule.triggered}x</strong>
                  </span>
                  <span style={{ fontSize: "11px", color: "rgba(107, 143, 168, 0.6)" }}>
                    💾 Saved: <strong style={{ color: "#00ff88" }}>{rule.saved}</strong>
                  </span>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
                {/* Toggle */}
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={rule.active}
                    onChange={() => toggleRule(rule.id)}
                    id={`rule-toggle-${rule.id}`}
                  />
                  <span className="toggle-slider" />
                </label>
                {/* Delete */}
                <button
                  id={`delete-rule-${rule.id}`}
                  onClick={() => deleteRule(rule.id)}
                  style={{
                    background: "rgba(255, 107, 53, 0.08)",
                    border: "1px solid rgba(255, 107, 53, 0.2)",
                    borderRadius: "8px",
                    padding: "8px",
                    color: "#ff6b35",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "rgba(255, 107, 53, 0.15)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "rgba(255, 107, 53, 0.08)")}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {rules.length === 0 && (
        <div className="glass-card" style={{ padding: "48px", textAlign: "center" }}>
          <div style={{ fontSize: "40px", marginBottom: "12px" }}>⚡</div>
          <p style={{ color: "#e2f4ff", fontWeight: 600, marginBottom: "8px" }}>No automation rules yet</p>
          <p style={{ color: "rgba(107, 143, 168, 0.6)", fontSize: "13px", marginBottom: "20px" }}>
            Create your first rule to start saving energy automatically
          </p>
          <button
            onClick={() => setShowBuilder(true)}
            className="btn-primary"
            style={{ fontSize: "13px", padding: "10px 24px" }}
          >
            Create First Rule
          </button>
        </div>
      )}
    </div>
  );
}
