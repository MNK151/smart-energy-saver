"use client";
import { useEffect, useRef, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import { weeklyData, monthlyData, categoryData } from "@/lib/mockData";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const chartDefaults = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        color: "rgba(107, 143, 168, 0.9)",
        font: { family: "Inter", size: 11 },
        boxWidth: 10,
        padding: 16,
      },
    },
    tooltip: {
      backgroundColor: "rgba(5, 18, 37, 0.95)",
      borderColor: "rgba(0, 212, 255, 0.3)",
      borderWidth: 1,
      titleColor: "#e2f4ff",
      bodyColor: "rgba(107, 143, 168, 0.9)",
      padding: 12,
    },
  },
  scales: {
    x: {
      grid: { color: "rgba(0, 212, 255, 0.05)", drawBorder: false },
      ticks: { color: "rgba(107, 143, 168, 0.7)", font: { family: "Inter", size: 11 } },
    },
    y: {
      grid: { color: "rgba(0, 212, 255, 0.05)", drawBorder: false },
      ticks: { color: "rgba(107, 143, 168, 0.7)", font: { family: "Inter", size: 11 } },
    },
  },
};

// Real-time line chart
export function RealtimeChart() {
  const [dataPoints, setDataPoints] = useState<number[]>(
    Array.from({ length: 30 }, () => 1800 + Math.random() * 600)
  );
  const [labels, setLabels] = useState<string[]>(
    Array.from({ length: 30 }, (_, i) => `${i}s`)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const newVal = 1800 + Math.sin(Date.now() * 0.0004) * 300 + Math.random() * 60;
      setDataPoints((prev) => [...prev.slice(1), newVal]);
      setLabels((prev) => [...prev.slice(1), "now"]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const data = {
    labels,
    datasets: [
      {
        label: "Power (W)",
        data: dataPoints,
        borderColor: "#00d4ff",
        backgroundColor: "rgba(0, 212, 255, 0.08)",
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 2,
      },
    ],
  };

  return (
    <Line
      data={data}
      options={{
        ...chartDefaults,
        animation: { duration: 0 },
        plugins: { ...chartDefaults.plugins, legend: { display: false } },
        scales: {
          ...chartDefaults.scales,
          y: {
            ...chartDefaults.scales.y,
            min: 1000,
            max: 3000,
          },
        },
      }}
    />
  );
}

// Weekly energy line chart
export function WeeklyChart() {
  const data = {
    labels: weeklyData.labels,
    datasets: [
      {
        label: "Consumption (kWh)",
        data: weeklyData.consumption,
        borderColor: "#00d4ff",
        backgroundColor: "rgba(0, 212, 255, 0.1)",
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "#00d4ff",
        pointRadius: 4,
        borderWidth: 2,
      },
      {
        label: "Solar (kWh)",
        data: weeklyData.solar,
        borderColor: "#00ff88",
        backgroundColor: "rgba(0, 255, 136, 0.08)",
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "#00ff88",
        pointRadius: 4,
        borderWidth: 2,
      },
      {
        label: "Savings (kWh)",
        data: weeklyData.savings,
        borderColor: "#a855f7",
        backgroundColor: "rgba(168, 85, 247, 0.08)",
        fill: false,
        tension: 0.4,
        pointBackgroundColor: "#a855f7",
        pointRadius: 4,
        borderWidth: 2,
        borderDash: [4, 3],
      },
    ],
  };
  return (
    <Line
      data={data}
      options={{
        ...chartDefaults,
        scales: {
          ...chartDefaults.scales,
          y: { ...chartDefaults.scales.y, beginAtZero: true },
        },
      }}
    />
  );
}

// Monthly bar chart
export function MonthlyBarChart() {
  const data = {
    labels: monthlyData.labels,
    datasets: [
      {
        label: "Consumption (kWh)",
        data: monthlyData.consumption,
        backgroundColor: "rgba(0, 212, 255, 0.5)",
        borderColor: "#00d4ff",
        borderWidth: 1,
        borderRadius: 6,
      },
      {
        label: "Bill (₹)",
        data: monthlyData.bill.map((b) => b / 10),
        backgroundColor: "rgba(168, 85, 247, 0.5)",
        borderColor: "#a855f7",
        borderWidth: 1,
        borderRadius: 6,
      },
    ],
  };
  return (
    <Bar
      data={data}
      options={{
        ...chartDefaults,
        scales: {
          ...chartDefaults.scales,
          y: { ...chartDefaults.scales.y, beginAtZero: true },
        },
      }}
    />
  );
}

// Doughnut chart for device categories
export function CategoryDoughnut() {
  const positiveValues = categoryData.values.map((v) => Math.max(v, 0));
  const data = {
    labels: categoryData.labels,
    datasets: [
      {
        data: positiveValues,
        backgroundColor: categoryData.colors.map((c) => c + "99"),
        borderColor: categoryData.colors,
        borderWidth: 2,
        hoverOffset: 8,
      },
    ],
  };
  return (
    <Doughnut
      data={data}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "right",
            labels: {
              color: "rgba(107, 143, 168, 0.9)",
              font: { family: "Inter", size: 11 },
              boxWidth: 10,
              padding: 12,
            },
          },
          tooltip: {
            backgroundColor: "rgba(5, 18, 37, 0.95)",
            borderColor: "rgba(0, 212, 255, 0.3)",
            borderWidth: 1,
            titleColor: "#e2f4ff",
            bodyColor: "rgba(107, 143, 168, 0.9)",
            padding: 12,
          },
        },
        cutout: "68%",
      }}
    />
  );
}
