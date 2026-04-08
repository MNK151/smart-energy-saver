"use client";
import { DeviceGrid } from "@/components/DeviceCard";
import { Plus, Search } from "lucide-react";
import { useState } from "react";

const FILTERS = ["All", "Online", "HVAC", "Lighting", "Appliance"] as const;
type FilterType = typeof FILTERS[number];

export default function DevicesPage() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div style={{ padding: "28px" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h1 style={{ fontSize: "22px", fontWeight: 800, color: "#e2f4ff", marginBottom: "4px" }}>Device Management</h1>
          <p style={{ fontSize: "13px", color: "rgba(107, 143, 168, 0.7)" }}>Control and monitor all connected IoT devices</p>
        </div>
        <button
          id="add-device-btn"
          onClick={() => setShowAddModal(true)}
          style={{
            background: "linear-gradient(135deg, #00d4ff, #0060cc)",
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
            boxShadow: "0 4px 20px rgba(0, 212, 255, 0.3)",
            transition: "all 0.3s",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)")}
        >
          <Plus size={16} /> Add Device
        </button>
      </div>

      {/* Search + filter bar */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "24px", flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 260px", position: "relative" }}>
          <Search
            size={14}
            style={{
              position: "absolute",
              left: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "rgba(107, 143, 168, 0.5)",
            }}
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search devices..."
            id="device-search"
            style={{
              width: "100%",
              padding: "10px 12px 10px 36px",
              background: "rgba(6, 26, 54, 0.6)",
              border: "1px solid rgba(0, 212, 255, 0.15)",
              borderRadius: "10px",
              color: "#e2f4ff",
              fontSize: "13px",
              outline: "none",
              transition: "border-color 0.2s",
            }}
            onFocus={(e) => ((e.target as HTMLInputElement).style.borderColor = "rgba(0, 212, 255, 0.4)")}
            onBlur={(e) => ((e.target as HTMLInputElement).style.borderColor = "rgba(0, 212, 255, 0.15)")}
          />
        </div>

        {FILTERS.map((filter) => {
          const isActive = activeFilter === filter;
          return (
            <button
              key={filter}
              id={`filter-${filter.toLowerCase()}`}
              onClick={() => setActiveFilter(filter)}
              style={{
                padding: "9px 16px",
                background: isActive ? "rgba(0, 212, 255, 0.15)" : "rgba(6, 26, 54, 0.6)",
                border: `1px solid ${isActive ? "rgba(0, 212, 255, 0.4)" : "rgba(0, 212, 255, 0.1)"}`,
                borderRadius: "8px",
                color: isActive ? "#00d4ff" : "rgba(107, 143, 168, 0.8)",
                fontSize: "12px",
                fontWeight: isActive ? 600 : 500,
                cursor: "pointer",
                transition: "all 0.2s",
                boxShadow: isActive ? "0 0 12px rgba(0, 212, 255, 0.15)" : "none",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLButtonElement).style.background = "rgba(0, 212, 255, 0.08)";
                  (e.currentTarget as HTMLButtonElement).style.color = "#00d4ff";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLButtonElement).style.background = "rgba(6, 26, 54, 0.6)";
                  (e.currentTarget as HTMLButtonElement).style.color = "rgba(107, 143, 168, 0.8)";
                }
              }}
            >
              {filter}
            </button>
          );
        })}
      </div>

      {/* Device Grid */}
      <DeviceGrid filter={activeFilter} search={search} />

      {/* Add Device Modal */}
      {showAddModal && (
        <div
          id="add-device-modal"
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(2, 11, 24, 0.85)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 999,
          }}
          onClick={(e) => e.target === e.currentTarget && setShowAddModal(false)}
        >
          <div
            className="glass-card"
            style={{
              padding: "32px",
              width: "100%",
              maxWidth: "460px",
              margin: "0 20px",
              border: "1px solid rgba(0, 212, 255, 0.2)",
              boxShadow: "0 0 60px rgba(0, 212, 255, 0.15)",
            }}
          >
            <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#e2f4ff", marginBottom: "8px" }}>Add New Device</h2>
            <p style={{ fontSize: "12px", color: "rgba(107, 143, 168, 0.7)", marginBottom: "24px" }}>
              Connect a new IoT device to your energy network
            </p>

            {[
              { label: "Device Name", placeholder: "e.g. Living Room AC", id: "new-device-name" },
              { label: "Device Type", placeholder: "e.g. HVAC, Lighting", id: "new-device-type" },
              { label: "Room / Location", placeholder: "e.g. Bedroom", id: "new-device-room" },
              { label: "MAC Address / ID", placeholder: "e.g. AA:BB:CC:DD:EE:FF", id: "new-device-mac" },
            ].map((f) => (
              <div key={f.id} style={{ marginBottom: "16px" }}>
                <label style={{ fontSize: "12px", color: "rgba(107, 143, 168, 0.8)", fontWeight: 500, display: "block", marginBottom: "6px" }}>
                  {f.label}
                </label>
                <input
                  id={f.id}
                  placeholder={f.placeholder}
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

            <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
              <button
                onClick={() => setShowAddModal(false)}
                style={{
                  flex: 1,
                  padding: "11px",
                  background: "transparent",
                  border: "1px solid rgba(0, 212, 255, 0.2)",
                  borderRadius: "8px",
                  color: "rgba(107, 143, 168, 0.8)",
                  cursor: "pointer",
                  fontSize: "13px",
                  fontWeight: 500,
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(0, 212, 255, 0.4)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(0, 212, 255, 0.2)")}
              >
                Cancel
              </button>
              <button
                id="confirm-add-device"
                onClick={() => setShowAddModal(false)}
                style={{
                  flex: 1,
                  padding: "11px",
                  background: "linear-gradient(135deg, #00d4ff, #0060cc)",
                  border: "none",
                  borderRadius: "8px",
                  color: "white",
                  cursor: "pointer",
                  fontSize: "13px",
                  fontWeight: 600,
                  transition: "all 0.3s",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "0.9")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "1")}
              >
                Add Device
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
