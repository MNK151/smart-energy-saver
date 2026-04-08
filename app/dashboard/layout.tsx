import Sidebar from "@/components/Sidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard — EnergyIQ",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#020b18" }}>
      <Sidebar />
      <main
        style={{
          flex: 1,
          overflowX: "hidden",
          background: "radial-gradient(ellipse at 0% 0%, rgba(0, 212, 255, 0.04) 0%, transparent 50%), #020b18",
        }}
      >
        {children}
      </main>
    </div>
  );
}
