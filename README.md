# ⚡ EnergyIQ — Smart Energy Saver Platform

<div align="center">

![EnergyIQ Banner](https://img.shields.io/badge/EnergyIQ-Smart%20Energy%20Platform-00d4ff?style=for-the-badge&logo=leaf&logoColor=white)

[![Live Demo](https://img.shields.io/badge/🚀%20Live%20Demo-smart--energy--saver--rouge.vercel.app-00ff88?style=for-the-badge)](https://smart-energy-saver-rouge.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/)

**A full-featured IoT + AI Smart Energy Management Web App**

[🌐 Live Demo](https://smart-energy-saver-rouge.vercel.app/) • [📊 Dashboard](https://smart-energy-saver-rouge.vercel.app/dashboard) • [⭐ Star this repo](#)

</div>

---

## 🖥️ Live Preview

> 🔗 **[https://smart-energy-saver-rouge.vercel.app/](https://smart-energy-saver-rouge.vercel.app/)**

---

## 📖 About

**EnergyIQ** is a Smart Energy Saver platform that monitors electricity usage and automatically optimizes energy consumption using simulated IoT sensors, data analytics, and intelligent automation.

The system can:
- 📡 **Track energy usage in real-time** — Live power data updated every few seconds
- 🚨 **Detect waste** — Smart alerts for idle or inefficient devices
- 🤖 **Predict future consumption** — AI-powered forecasting for next-day usage and monthly bills
- ⚡ **Automate device control** — IF/THEN rule engine for smart home automation
- ☀️ **Track renewable energy** — Solar generation and grid consumption monitoring

---

## ✨ Features

| Feature | Description |
|---|---|
| 📊 **Real-Time Dashboard** | Live power draw, solar generation, grid usage, CO₂ savings |
| ⚡ **Live Power Feed** | Real-time waveform chart updating every 3 seconds |
| 🔌 **Device Management** | Toggle devices ON/OFF, filter by type, search by name/room |
| 🤖 **Automation Rules** | Visual IF/THEN rule builder — create, enable/disable, delete rules |
| 📈 **Energy Analytics** | Weekly trends, monthly comparisons, category breakdown, AI predictions |
| 🌱 **Eco Impact Tracker** | CO₂ reduction, tree equivalents, solar export stats |
| 🔔 **Smart Alerts** | Dismissible real-time alerts for wastage and anomalies |
| 🔄 **Refresh Button** | Instantly pulls fresh simulated IoT readings across all metrics |
| ⚙️ **Settings** | Alert thresholds, notifications, IoT gateway config, security |
| 🌙 **Dark Mode UI** | Full glassmorphism dark theme with cyan/green accent palette |

---

## 🖼️ Pages

```
/                          → Landing Page (hero, features, pricing, CTA)
/dashboard                 → Main Dashboard (live metrics, chart, alerts, top consumers)
/dashboard/devices         → Device Management (filter, search, toggle, add device)
/dashboard/automation      → Automation Rules (IF/THEN builder)
/dashboard/analytics       → Energy Analytics (charts, AI predictions, eco stats)
/dashboard/settings        → Settings (profile, thresholds, notifications, IoT, security)
```

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS v4 + Custom CSS (Glassmorphism) |
| **Charts** | Chart.js + react-chartjs-2 |
| **Icons** | Lucide React |
| **Fonts** | Inter + Orbitron (Google Fonts) |
| **Deployment** | Vercel |

---

## 📡 Live Data Simulation

The app simulates a realistic IoT data stream:

| Signal | Update Frequency | Behaviour |
|---|---|---|
| ⚡ Current Power Draw | Every 6s | Drifts ±20W around baseline |
| ☀️ Solar Generation | Every 8s | Sine-curve sun cycle by time of day |
| 📊 Today's Usage (kWh) | Every 2 min | Slowly ticks up (realistic accumulation) |
| 💰 Monthly Bill | Derived | Auto-calculated from kWh × tariff |
| 🌱 CO₂ Saved | Every 2 min | Increments alongside usage |
| ⚙️ Efficiency Score | Every 20s | Small ±2% fluctuations |
| 🔌 Device power | Every 7–10s | Each device drifts ±5% independently |
| 🔄 Refresh Button | On demand | All metrics update instantly |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/MNK151/smart-energy-saver.git

# Navigate to the project
cd smart-energy-saver

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
smart-energy-saver/
├── app/
│   ├── layout.tsx                    # Root layout + metadata
│   ├── page.tsx                      # Landing page
│   ├── globals.css                   # Global styles + design system
│   └── dashboard/
│       ├── layout.tsx                # Dashboard layout with sidebar
│       ├── page.tsx                  # Main dashboard (live metrics)
│       ├── devices/page.tsx          # Device management
│       ├── automation/page.tsx       # Automation rules
│       ├── analytics/page.tsx        # Energy analytics
│       └── settings/page.tsx         # Settings
├── components/
│   ├── Sidebar.tsx                   # Collapsible navigation sidebar
│   ├── MetricCard.tsx                # Animated metric card component
│   ├── EnergyCharts.tsx              # Chart.js chart components
│   ├── DeviceCard.tsx                # Device card + filterable grid
│   └── AlertPanel.tsx                # Dismissible alert notifications
└── lib/
    ├── mockData.ts                   # Simulated IoT device & energy data
    └── useLiveData.ts                # Live data hooks (real-time intervals)
```

---

## 🎨 Design System

- **Color Palette**: Electric Cyan `#00d4ff` · Neon Green `#00ff88` · Sunset Orange `#ff6b35` · Purple `#a855f7`
- **Background**: Deep Navy `#020b18` with radial gradient overlays
- **Cards**: Glassmorphism with `backdrop-filter: blur(12px)`
- **Typography**: Inter (body) + Orbitron (numbers/headings)
- **Animations**: CSS keyframes for wave, pulse, float, and number counters

---

## 🌐 Deployment

This project is deployed on **Vercel** with automatic CI/CD from GitHub.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/MNK151/smart-energy-saver)

---

## 📊 System Architecture

```
IoT Sensors (Simulated)
        ↓
  useLiveData Hook (React)   ←──── Refresh Button
        ↓
  State Management (useState + setInterval)
        ↓
  Dashboard Components
  ├── MetricCard (Power, kWh, Bill, CO₂)
  ├── RealtimeChart (Live waveform)
  ├── DeviceGrid (10 IoT devices)
  ├── AlertPanel (Smart notifications)
  └── Analytics (Charts + AI predictions)
```

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push to branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

MIT License — feel free to use this project for learning, hackathons, or portfolios.

---

<div align="center">

Made with ❤️ and ⚡ by [MNK151](https://github.com/MNK151)

**[🌐 View Live Demo →](https://smart-energy-saver-rouge.vercel.app/)**

</div>
