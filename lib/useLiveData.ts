"use client";
import { useEffect, useState } from "react";

// Simulates a realistic IoT live data stream for the whole app
export function useLiveData() {
  const [power, setPower] = useState(1985);          // Current grid draw (W)
  const [solar, setSolar] = useState(800);            // Solar generation (W)
  const [todayUsage, setTodayUsage] = useState(14.7); // kWh today
  const [co2Saved, setCo2Saved] = useState(42.3);    // kg CO2 saved
  const [efficiency, setEfficiency] = useState(78);   // 0–100%

  // Derived values
  const monthlyBill = Math.round(todayUsage * 8.3 * 30); // ₹ estimated
  const netPower = Math.max(0, power - solar);

  // Every 6s — grid power drifts slowly ±20W
  useEffect(() => {
    const id = setInterval(() => {
      setPower((prev) => {
        const delta = (Math.random() - 0.5) * 40;
        return Math.round(Math.max(1200, Math.min(2800, prev + delta)));
      });
    }, 6000);
    return () => clearInterval(id);
  }, []);

  // Every 8s — solar varies on a slow sine curve (sun position simulation)
  useEffect(() => {
    const id = setInterval(() => {
      const hour = new Date().getHours();
      const solarFactor = Math.max(0, Math.sin(((hour - 6) / 12) * Math.PI));
      const base = solarFactor * 1000;
      const noise = (Math.random() - 0.5) * 80;
      setSolar(Math.round(Math.max(0, base + noise)));
    }, 8000);
    return () => clearInterval(id);
  }, []);

  // Every 2 minutes — today's usage ticks up a tiny amount (realistic kWh accumulation)
  useEffect(() => {
    const id = setInterval(() => {
      setTodayUsage((prev) => parseFloat((prev + 0.001 + Math.random() * 0.001).toFixed(3)));
    }, 120000);
    return () => clearInterval(id);
  }, []);

  // Every 2 minutes — CO2 saved ticks up in line with usage
  useEffect(() => {
    const id = setInterval(() => {
      setCo2Saved((prev) => parseFloat((prev + 0.001 + Math.random() * 0.001).toFixed(2)));
    }, 120000);
    return () => clearInterval(id);
  }, []);

  // Every 20s — efficiency score small drift
  useEffect(() => {
    const id = setInterval(() => {
      setEfficiency((prev) => {
        const delta = Math.round((Math.random() - 0.5) * 4);
        return Math.max(60, Math.min(95, prev + delta));
      });
    }, 20000);
    return () => clearInterval(id);
  }, []);

  // Immediately refresh all values when user clicks Refresh
  const refresh = () => {
    const hour = new Date().getHours();
    const solarFactor = Math.max(0, Math.sin(((hour - 6) / 12) * Math.PI));
    setPower(Math.round(1400 + Math.random() * 1200));
    setSolar(Math.round(solarFactor * 900 + Math.random() * 100));
    setTodayUsage(parseFloat((12 + Math.random() * 8).toFixed(2)));
    setCo2Saved(parseFloat((30 + Math.random() * 20).toFixed(1)));
    setEfficiency(Math.round(65 + Math.random() * 25));
  };

  return { power, solar, netPower, todayUsage, monthlyBill, co2Saved, efficiency, refresh };
}

// Fluctuates individual device power slightly (±3–5% of rated wattage)
export function useDevicePower(basePower: number, isActive: boolean) {
  const [currentPower, setCurrentPower] = useState(basePower);

  useEffect(() => {
    if (!isActive || basePower <= 0) {
      setCurrentPower(isActive ? basePower : 0);
      return;
    }
    const id = setInterval(() => {
      const jitter = (Math.random() - 0.5) * (basePower * 0.06);
      setCurrentPower(Math.round(Math.max(basePower * 0.9, Math.min(basePower * 1.1, basePower + jitter))));
    }, 7000 + Math.random() * 3000); // every 7–10s, staggered per device
    return () => clearInterval(id);
  }, [isActive, basePower]);

  return currentPower;
}
