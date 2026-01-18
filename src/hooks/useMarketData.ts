import { useState, useEffect, useCallback } from "react";

// Comprehensive Indian market stocks organized by sector
const stocksBySector = {
  "IT & Technology": [
    { symbol: "TCS", name: "Tata Consultancy Services", basePrice: 4125 },
    { symbol: "INFY", name: "Infosys Ltd", basePrice: 1892 },
    { symbol: "WIPRO", name: "Wipro Ltd", basePrice: 465 },
    { symbol: "HCLTECH", name: "HCL Technologies", basePrice: 1678 },
    { symbol: "TECHM", name: "Tech Mahindra", basePrice: 1425 },
    { symbol: "LTIM", name: "LTIMindtree Ltd", basePrice: 5890 },
    { symbol: "PERSISTENT", name: "Persistent Systems", basePrice: 4250 },
    { symbol: "COFORGE", name: "Coforge Ltd", basePrice: 6780 },
  ],
  "Banking & Finance": [
    { symbol: "HDFCBANK", name: "HDFC Bank Ltd", basePrice: 1678 },
    { symbol: "ICICIBANK", name: "ICICI Bank Ltd", basePrice: 1245 },
    { symbol: "SBIN", name: "State Bank of India", basePrice: 845 },
    { symbol: "KOTAKBANK", name: "Kotak Mahindra Bank", basePrice: 1834 },
    { symbol: "AXISBANK", name: "Axis Bank Ltd", basePrice: 1156 },
    { symbol: "INDUSINDBK", name: "IndusInd Bank", basePrice: 1420 },
    { symbol: "BAJFINANCE", name: "Bajaj Finance", basePrice: 7250 },
    { symbol: "BAJAJFINSV", name: "Bajaj Finserv", basePrice: 1680 },
    { symbol: "HDFC", name: "HDFC Ltd", basePrice: 2890 },
    { symbol: "PNB", name: "Punjab National Bank", basePrice: 125 },
  ],
  "Oil & Energy": [
    { symbol: "RELIANCE", name: "Reliance Industries", basePrice: 2945 },
    { symbol: "ONGC", name: "Oil & Natural Gas Corp", basePrice: 285 },
    { symbol: "IOC", name: "Indian Oil Corporation", basePrice: 165 },
    { symbol: "BPCL", name: "Bharat Petroleum", basePrice: 345 },
    { symbol: "GAIL", name: "GAIL India Ltd", basePrice: 195 },
    { symbol: "POWERGRID", name: "Power Grid Corp", basePrice: 315 },
    { symbol: "NTPC", name: "NTPC Ltd", basePrice: 385 },
    { symbol: "ADANIGREEN", name: "Adani Green Energy", basePrice: 1890 },
  ],
  "Automobile": [
    { symbol: "TATAMOTORS", name: "Tata Motors", basePrice: 1025 },
    { symbol: "MARUTI", name: "Maruti Suzuki", basePrice: 12450 },
    { symbol: "M&M", name: "Mahindra & Mahindra", basePrice: 2890 },
    { symbol: "BAJAJ-AUTO", name: "Bajaj Auto", basePrice: 9450 },
    { symbol: "HEROMOTOCO", name: "Hero MotoCorp", basePrice: 4560 },
    { symbol: "EICHERMOT", name: "Eicher Motors", basePrice: 4890 },
    { symbol: "ASHOKLEY", name: "Ashok Leyland", basePrice: 225 },
    { symbol: "TVSMOTOR", name: "TVS Motor Company", basePrice: 2450 },
  ],
  "Pharma & Healthcare": [
    { symbol: "SUNPHARMA", name: "Sun Pharmaceutical", basePrice: 1785 },
    { symbol: "DRREDDY", name: "Dr. Reddy's Labs", basePrice: 6450 },
    { symbol: "CIPLA", name: "Cipla Ltd", basePrice: 1520 },
    { symbol: "DIVISLAB", name: "Divi's Laboratories", basePrice: 4890 },
    { symbol: "APOLLOHOSP", name: "Apollo Hospitals", basePrice: 6780 },
    { symbol: "BIOCON", name: "Biocon Ltd", basePrice: 285 },
    { symbol: "LUPIN", name: "Lupin Ltd", basePrice: 1890 },
    { symbol: "TORNTPHARM", name: "Torrent Pharma", basePrice: 2890 },
  ],
  "FMCG & Consumer": [
    { symbol: "HINDUNILVR", name: "Hindustan Unilever", basePrice: 2456 },
    { symbol: "ITC", name: "ITC Ltd", basePrice: 485 },
    { symbol: "NESTLEIND", name: "Nestle India", basePrice: 2890 },
    { symbol: "BRITANNIA", name: "Britannia Industries", basePrice: 5450 },
    { symbol: "DABUR", name: "Dabur India", basePrice: 565 },
    { symbol: "MARICO", name: "Marico Ltd", basePrice: 625 },
    { symbol: "GODREJCP", name: "Godrej Consumer", basePrice: 1245 },
    { symbol: "COLPAL", name: "Colgate-Palmolive", basePrice: 2780 },
  ],
  "Metals & Mining": [
    { symbol: "TATASTEEL", name: "Tata Steel", basePrice: 165 },
    { symbol: "JSWSTEEL", name: "JSW Steel", basePrice: 945 },
    { symbol: "HINDALCO", name: "Hindalco Industries", basePrice: 645 },
    { symbol: "VEDL", name: "Vedanta Ltd", basePrice: 485 },
    { symbol: "COALINDIA", name: "Coal India", basePrice: 485 },
    { symbol: "NMDC", name: "NMDC Ltd", basePrice: 245 },
    { symbol: "SAIL", name: "Steel Authority", basePrice: 125 },
    { symbol: "JINDALSTEL", name: "Jindal Steel", basePrice: 985 },
  ],
  "Telecom & Media": [
    { symbol: "BHARTIARTL", name: "Bharti Airtel", basePrice: 1567 },
    { symbol: "IDEA", name: "Vodafone Idea", basePrice: 15.5 },
    { symbol: "ZEEL", name: "Zee Entertainment", basePrice: 145 },
    { symbol: "TATACOMM", name: "Tata Communications", basePrice: 1890 },
  ],
  "Infrastructure & Realty": [
    { symbol: "LT", name: "Larsen & Toubro", basePrice: 3560 },
    { symbol: "ADANIPORTS", name: "Adani Ports", basePrice: 1456 },
    { symbol: "ULTRACEMCO", name: "UltraTech Cement", basePrice: 11250 },
    { symbol: "GRASIM", name: "Grasim Industries", basePrice: 2560 },
    { symbol: "DLF", name: "DLF Ltd", basePrice: 890 },
    { symbol: "GODREJPROP", name: "Godrej Properties", basePrice: 2780 },
    { symbol: "OBEROIRLTY", name: "Oberoi Realty", basePrice: 1890 },
    { symbol: "ACC", name: "ACC Ltd", basePrice: 2450 },
  ],
  "Adani Group": [
    { symbol: "ADANIENT", name: "Adani Enterprises", basePrice: 2890 },
    { symbol: "ADANIPOWER", name: "Adani Power", basePrice: 645 },
    { symbol: "ADANITRANS", name: "Adani Transmission", basePrice: 890 },
    { symbol: "ADANIGREEN", name: "Adani Green Energy", basePrice: 1890 },
    { symbol: "ADANIPORTS", name: "Adani Ports & SEZ", basePrice: 1456 },
    { symbol: "ATGL", name: "Adani Total Gas", basePrice: 785 },
  ],
  "Tata Group": [
    { symbol: "TCS", name: "TCS", basePrice: 4125 },
    { symbol: "TATAMOTORS", name: "Tata Motors", basePrice: 1025 },
    { symbol: "TATASTEEL", name: "Tata Steel", basePrice: 165 },
    { symbol: "TATAPOWER", name: "Tata Power", basePrice: 445 },
    { symbol: "TITAN", name: "Titan Company", basePrice: 3560 },
    { symbol: "TATACONSUM", name: "Tata Consumer", basePrice: 1125 },
    { symbol: "TATACHEM", name: "Tata Chemicals", basePrice: 1090 },
  ],
};

const generateStockData = (basePrice: number) => {
  const change = (Math.random() - 0.5) * basePrice * 0.04;
  const changePercent = (change / basePrice) * 100;
  const volume = `${(Math.random() * 20 + 1).toFixed(1)}M`;
  return {
    price: basePrice + change,
    change,
    changePercent,
    volume
  };
};

const generateMockData = () => {
  // Generate sector stocks
  const sectorsWithStocks: Record<string, any[]> = {};
  Object.entries(stocksBySector).forEach(([sector, stocks]) => {
    sectorsWithStocks[sector] = stocks.map(stock => ({
      ...stock,
      ...generateStockData(stock.basePrice)
    }));
  });

  // Top gainers and losers
  const allStocks = Object.values(sectorsWithStocks).flat();
  const sortedByChange = [...allStocks].sort((a, b) => b.changePercent - a.changePercent);
  const topGainers = sortedByChange.slice(0, 5);
  const topLosers = sortedByChange.slice(-5).reverse();

  return {
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
      },
      {
        name: "NIFTY MIDCAP",
        value: 52180.00 + (Math.random() - 0.5) * 250,
        change: (Math.random() - 0.5) * 450,
        changePercent: (Math.random() - 0.5) * 1.6
      },
      {
        name: "NIFTY SMALLCAP",
        value: 17450.00 + (Math.random() - 0.5) * 150,
        change: (Math.random() - 0.5) * 280,
        changePercent: (Math.random() - 0.5) * 2.2
      }
    ],
    sectorsWithStocks,
    topGainers,
    topLosers,
    currencies: [
      { pair: "USD/INR", rate: 83.45 + (Math.random() - 0.5) * 0.2, change: (Math.random() - 0.5) * 0.5, flag: "🇺🇸" },
      { pair: "EUR/INR", rate: 90.82 + (Math.random() - 0.5) * 0.3, change: (Math.random() - 0.5) * 0.6, flag: "🇪🇺" },
      { pair: "GBP/INR", rate: 106.25 + (Math.random() - 0.5) * 0.4, change: (Math.random() - 0.5) * 0.7, flag: "🇬🇧" },
      { pair: "JPY/INR", rate: 0.5425 + (Math.random() - 0.5) * 0.01, change: (Math.random() - 0.5) * 0.4, flag: "🇯🇵" },
      { pair: "CNY/INR", rate: 11.52 + (Math.random() - 0.5) * 0.05, change: (Math.random() - 0.5) * 0.3, flag: "🇨🇳" },
      { pair: "AED/INR", rate: 22.72 + (Math.random() - 0.5) * 0.05, change: (Math.random() - 0.5) * 0.2, flag: "🇦🇪" }
    ],
    commodities: [
      { name: "Gold", price: 73250 + (Math.random() - 0.5) * 500, unit: "per 10g", change: (Math.random() - 0.5) * 1.5, icon: "🥇" },
      { name: "Silver", price: 89500 + (Math.random() - 0.5) * 1000, unit: "per kg", change: (Math.random() - 0.5) * 2, icon: "🥈" },
      { name: "Crude Oil", price: 6850 + (Math.random() - 0.5) * 100, unit: "per barrel", change: (Math.random() - 0.5) * 2.5, icon: "🛢️" },
      { name: "Natural Gas", price: 245 + (Math.random() - 0.5) * 10, unit: "per MMBtu", change: (Math.random() - 0.5) * 3, icon: "🔥" },
      { name: "Copper", price: 785 + (Math.random() - 0.5) * 20, unit: "per kg", change: (Math.random() - 0.5) * 2, icon: "🔶" },
      { name: "Aluminium", price: 225 + (Math.random() - 0.5) * 8, unit: "per kg", change: (Math.random() - 0.5) * 1.8, icon: "⬜" }
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
      { name: "Infra", change: (Math.random() - 0.5) * 3.5 },
      { name: "Media", change: (Math.random() - 0.5) * 4.5 },
      { name: "PSU Bank", change: (Math.random() - 0.5) * 3.5 },
      { name: "Pvt Bank", change: (Math.random() - 0.5) * 2.8 }
    ],
    news: [
      { id: "1", headline: "RBI keeps repo rate unchanged at 6.5%, maintains accommodative stance for FY25", source: "Economic Times", time: "2 min ago", isBreaking: true },
      { id: "2", headline: "Nifty 50 hits all-time high as FIIs turn net buyers after 3 weeks", source: "Moneycontrol", time: "15 min ago", isBreaking: true },
      { id: "3", headline: "Reliance Industries announces $10B investment in green energy by 2030", source: "Business Standard", time: "32 min ago" },
      { id: "4", headline: "IT sector gains momentum on strong Q3 guidance from TCS and Infosys", source: "LiveMint", time: "45 min ago" },
      { id: "5", headline: "Auto sales surge 18% YoY in December driven by festive demand", source: "Hindu BusinessLine", time: "1 hr ago" },
      { id: "6", headline: "Gold prices touch record high amid global uncertainty and weak dollar", source: "Reuters India", time: "1.5 hr ago" },
      { id: "7", headline: "Adani Group stocks rally after fresh FII inflows worth ₹5,000 crore", source: "CNBC TV18", time: "2 hr ago" },
      { id: "8", headline: "SEBI introduces new margin rules for F&O trading from January 2025", source: "NSE India", time: "2.5 hr ago" }
    ],
    tickerItems: allStocks.slice(0, 20).map(s => ({
      symbol: s.symbol,
      price: s.price,
      change: s.changePercent
    }))
  };
};

export function useMarketData() {
  const [data, setData] = useState(generateMockData());
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSector, setSelectedSector] = useState<string>("IT & Technology");

  const refreshData = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      setData(generateMockData());
      setLastUpdated(new Date());
      setIsLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    const interval = setInterval(refreshData, 30000);
    return () => clearInterval(interval);
  }, [refreshData]);

  return {
    ...data,
    lastUpdated,
    isLoading,
    refreshData,
    selectedSector,
    setSelectedSector
  };
}
