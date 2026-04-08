import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EnergyIQ — Smart Energy Saver Platform",
  description: "Monitor, control, and optimize your energy consumption with AI-powered insights, real-time IoT monitoring, and intelligent automation.",
  keywords: "smart energy, IoT, energy monitoring, home automation, electricity savings, AI energy prediction",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Orbitron:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
