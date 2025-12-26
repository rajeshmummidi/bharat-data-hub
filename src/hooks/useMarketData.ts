import { useState, useEffect, useCallback } from "react";

// Simulated market data - In production, replace with real API calls
const generateMockData = () => ({
  indices: [
    {
      name: "NIFTY 50",
      value: 24850.25 + (Math.random() - 0.5) * 100,
      change: (Math.random() - 0.5) * 200,
      changePercent: (Math.random() - 0.5) * 1.5
    },
    {
      name: "SENSEX",
      value: 81450.75 + (Math.random() - 0.5) * 300,
      change: (Math.random() - 0.5) * 600,
      changePercent: (Math.random() - 0.5) * 1.2
    },
    {
      name: "BANK NIFTY",
      value: 52750.50 + (Math.random() - 0.5) * 150,
      change: (Math.random() - 0.5) * 400,
      changePercent: (Math.random() - 0.5) * 1.8
    },
    {
      name: "NIFTY IT",
      value: 41250.00 + (Math.random() - 0.5) * 200,
      change: (Math.random() - 0.5) * 350,
      changePercent: (Math.random() - 0.5) * 2.0
    }
  ],
  stocks: [
    { symbol: "RELIANCE", name: "Reliance Industries Ltd", price: 2945.50 + (Math.random() - 0.5) * 50, change: (Math.random() - 0.5) * 60, changePercent: (Math.random() - 0.5) * 2, volume: "12.5M" },
    { symbol: "TCS", name: "Tata Consultancy Services", price: 4125.75 + (Math.random() - 0.5) * 40, change: (Math.random() - 0.5) * 80, changePercent: (Math.random() - 0.5) * 2, volume: "8.2M" },
    { symbol: "HDFCBANK", name: "HDFC Bank Ltd", price: 1678.25 + (Math.random() - 0.5) * 20, change: (Math.random() - 0.5) * 30, changePercent: (Math.random() - 0.5) * 1.5, volume: "15.8M" },
    { symbol: "INFY", name: "Infosys Ltd", price: 1892.00 + (Math.random() - 0.5) * 30, change: (Math.random() - 0.5) * 40, changePercent: (Math.random() - 0.5) * 2.5, volume: "10.1M" },
    { symbol: "ICICIBANK", name: "ICICI Bank Ltd", price: 1245.50 + (Math.random() - 0.5) * 15, change: (Math.random() - 0.5) * 25, changePercent: (Math.random() - 0.5) * 1.8, volume: "18.3M" },
    { symbol: "HINDUNILVR", name: "Hindustan Unilever", price: 2456.75 + (Math.random() - 0.5) * 25, change: (Math.random() - 0.5) * 35, changePercent: (Math.random() - 0.5) * 1.2, volume: "5.6M" },
    { symbol: "BHARTIARTL", name: "Bharti Airtel Ltd", price: 1567.25 + (Math.random() - 0.5) * 20, change: (Math.random() - 0.5) * 30, changePercent: (Math.random() - 0.5) * 1.6, volume: "7.9M" },
    { symbol: "KOTAKBANK", name: "Kotak Mahindra Bank", price: 1834.00 + (Math.random() - 0.5) * 25, change: (Math.random() - 0.5) * 40, changePercent: (Math.random() - 0.5) * 2.0, volume: "6.4M" }
  ],
  currencies: [
    { pair: "USD/INR", rate: 83.45 + (Math.random() - 0.5) * 0.2, change: (Math.random() - 0.5) * 0.5, flag: "🇺🇸" },
    { pair: "EUR/INR", rate: 90.82 + (Math.random() - 0.5) * 0.3, change: (Math.random() - 0.5) * 0.6, flag: "🇪🇺" },
    { pair: "GBP/INR", rate: 106.25 + (Math.random() - 0.5) * 0.4, change: (Math.random() - 0.5) * 0.7, flag: "🇬🇧" },
    { pair: "JPY/INR", rate: 0.5425 + (Math.random() - 0.5) * 0.01, change: (Math.random() - 0.5) * 0.4, flag: "🇯🇵" },
    { pair: "CNY/INR", rate: 11.52 + (Math.random() - 0.5) * 0.05, change: (Math.random() - 0.5) * 0.3, flag: "🇨🇳" }
  ],
  commodities: [
    { name: "Gold", price: 73250 + (Math.random() - 0.5) * 500, unit: "per 10g", change: (Math.random() - 0.5) * 1.5, icon: "🥇" },
    { name: "Silver", price: 89500 + (Math.random() - 0.5) * 1000, unit: "per kg", change: (Math.random() - 0.5) * 2, icon: "🥈" },
    { name: "Crude Oil", price: 6850 + (Math.random() - 0.5) * 100, unit: "per barrel", change: (Math.random() - 0.5) * 2.5, icon: "🛢️" },
    { name: "Natural Gas", price: 245 + (Math.random() - 0.5) * 10, unit: "per MMBtu", change: (Math.random() - 0.5) * 3, icon: "🔥" }
  ],
  sectors: [
    { name: "IT", change: (Math.random() - 0.5) * 4 },
    { name: "Banking", change: (Math.random() - 0.5) * 3 },
    { name: "Pharma", change: (Math.random() - 0.5) * 3.5 },
    { name: "Auto", change: (Math.random() - 0.5) * 4 },
    { name: "FMCG", change: (Math.random() - 0.5) * 2.5 },
    { name: "Metal", change: (Math.random() - 0.5) * 5 },
    { name: "Energy", change: (Math.random() - 0.5) * 4 },
    { name: "Realty", change: (Math.random() - 0.5) * 5 },
    { name: "Infra", change: (Math.random() - 0.5) * 3.5 }
  ],
  news: [
    { id: "1", headline: "RBI keeps repo rate unchanged at 6.5%, maintains accommodative stance for FY25", source: "Economic Times", time: "2 min ago", isBreaking: true },
    { id: "2", headline: "Nifty 50 hits all-time high as FIIs turn net buyers after 3 weeks", source: "Moneycontrol", time: "15 min ago" },
    { id: "3", headline: "Reliance Industries announces $10B investment in green energy by 2030", source: "Business Standard", time: "32 min ago" },
    { id: "4", headline: "IT sector gains momentum on strong Q3 guidance from TCS and Infosys", source: "LiveMint", time: "45 min ago" },
    { id: "5", headline: "Auto sales surge 18% YoY in December driven by festive demand", source: "Hindu BusinessLine", time: "1 hr ago" },
    { id: "6", headline: "Gold prices touch record high amid global uncertainty and weak dollar", source: "Reuters India", time: "1.5 hr ago" }
  ],
  tickerItems: [
    { symbol: "RELIANCE", price: 2945.50, change: 1.25 },
    { symbol: "TCS", price: 4125.75, change: -0.85 },
    { symbol: "HDFCBANK", price: 1678.25, change: 0.45 },
    { symbol: "INFY", price: 1892.00, change: 2.15 },
    { symbol: "ICICIBANK", price: 1245.50, change: -0.35 },
    { symbol: "SBIN", price: 845.25, change: 1.75 },
    { symbol: "TATAMOTORS", price: 1025.50, change: -1.25 },
    { symbol: "WIPRO", price: 465.75, change: 0.95 }
  ]
});

export function useMarketData() {
  const [data, setData] = useState(generateMockData());
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);

  const refreshData = useCallback(() => {
    setIsLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      setData(generateMockData());
      setLastUpdated(new Date());
      setIsLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    // Auto-refresh every 30 seconds
    const interval = setInterval(refreshData, 30000);
    return () => clearInterval(interval);
  }, [refreshData]);

  return {
    ...data,
    lastUpdated,
    isLoading,
    refreshData
  };
}
