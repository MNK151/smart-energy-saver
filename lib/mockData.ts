// Mock data for simulated IoT devices and energy readings

export const devices = [
  { id: 1, name: "Air Conditioner", type: "HVAC", icon: "❄️", status: true, power: 1500, room: "Living Room", category: "cooling" },
  { id: 2, name: "Smart TV", type: "Entertainment", icon: "📺", status: true, power: 200, room: "Living Room", category: "entertainment" },
  { id: 3, name: "Kitchen Lights", type: "Lighting", icon: "💡", status: false, power: 0, room: "Kitchen", category: "lighting" },
  { id: 4, name: "Refrigerator", type: "Appliance", icon: "🧊", status: true, power: 150, room: "Kitchen", category: "appliance" },
  { id: 5, name: "Washing Machine", type: "Appliance", icon: "🫧", status: false, power: 0, room: "Utility", category: "appliance" },
  { id: 6, name: "Ceiling Fan", type: "HVAC", icon: "🌀", status: true, power: 75, room: "Bedroom", category: "cooling" },
  { id: 7, name: "Bedroom Lights", type: "Lighting", icon: "🔆", status: true, power: 60, room: "Bedroom", category: "lighting" },
  { id: 8, name: "EV Charger", type: "Charging", icon: "🔌", status: false, power: 0, room: "Garage", category: "charging" },
  { id: 9, name: "Solar Inverter", type: "Solar", icon: "☀️", status: true, power: -800, room: "Roof", category: "solar" },
  { id: 10, name: "Water Heater", type: "Appliance", icon: "🚿", status: false, power: 0, room: "Bathroom", category: "appliance" },
];

export const automationRules = [
  {
    id: 1,
    name: "Empty Room Lights Off",
    condition: "Room unoccupied > 10 minutes",
    action: "Turn OFF all lights",
    active: true,
    triggered: 12,
    saved: "2.4 kWh",
  },
  {
    id: 2,
    name: "Peak Hour AC Limit",
    condition: "Time between 6 PM – 10 PM",
    action: "Set AC to 26°C",
    active: true,
    triggered: 8,
    saved: "5.1 kWh",
  },
  {
    id: 3,
    name: "Solar Surplus Charging",
    condition: "Solar generation > 1000W AND EV not charging",
    action: "Start EV Charger",
    active: false,
    triggered: 3,
    saved: "8.7 kWh",
  },
  {
    id: 4,
    name: "Over-Consumption Alert",
    condition: "Total power > 3500W",
    action: "Turn OFF Washing Machine",
    active: true,
    triggered: 2,
    saved: "1.2 kWh",
  },
  {
    id: 5,
    name: "Night Mode",
    condition: "Time after 11 PM",
    action: "Dim all lights to 20%",
    active: true,
    triggered: 18,
    saved: "3.8 kWh",
  },
];

export const weeklyData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  consumption: [22.4, 18.6, 24.1, 19.8, 21.3, 28.7, 16.2],
  solar: [5.2, 6.8, 4.1, 7.3, 6.5, 8.1, 3.2],
  savings: [3.1, 4.2, 2.8, 5.1, 3.8, 6.2, 2.4],
};

export const monthlyData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  consumption: [280, 260, 240, 220, 210, 290, 310, 300, 250, 230, 220, 270],
  bill: [2800, 2600, 2400, 2200, 2100, 2900, 3100, 3000, 2500, 2300, 2200, 2700],
};

export const alerts = [
  {
    id: 1,
    type: "warning",
    message: "AC running in empty living room for 15 minutes",
    time: "2 min ago",
    device: "Air Conditioner",
    icon: "⚠️",
  },
  {
    id: 2,
    type: "info",
    message: "Solar generation peak: 1.2 kW surplus available",
    time: "18 min ago",
    device: "Solar Inverter",
    icon: "ℹ️",
  },
  {
    id: 3,
    type: "success",
    message: "Night Mode activated – lights dimmed automatically",
    time: "2 hrs ago",
    device: "All Lights",
    icon: "✅",
  },
  {
    id: 4,
    type: "warning",
    message: "Power consumption exceeded 3000W threshold",
    time: "3 hrs ago",
    device: "System",
    icon: "🔔",
  },
];

export const metrics = {
  currentPower: 1985,
  todayUsage: 14.7,
  monthlyBill: 1840,
  co2Saved: 42.3,
  solarGeneration: 800,
  gridUsage: 1185,
  efficiency: 78,
  savingsThisMonth: 420,
};

export const categoryData = {
  labels: ["Cooling", "Lighting", "Appliances", "Entertainment", "Charging", "Solar"],
  values: [45, 12, 22, 8, 0, -13],
  colors: ["#00d4ff", "#a855f7", "#ff6b35", "#facc15", "#00ff88", "#f97316"],
};

export const realtimePoints = Array.from({ length: 60 }, (_, i) => ({
  x: i,
  y: 1800 + Math.sin(i * 0.3) * 400 + Math.random() * 200,
}));
