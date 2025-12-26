import { MarketHeader } from "@/components/terminal/MarketHeader";
import { TickerStrip } from "@/components/terminal/TickerStrip";
import { MarketIndex } from "@/components/terminal/MarketIndex";
import { TerminalCard } from "@/components/terminal/TerminalCard";
import { StockRow } from "@/components/terminal/StockRow";
import { NewsTicker } from "@/components/terminal/NewsTicker";
import { CurrencyRate } from "@/components/terminal/CurrencyRate";
import { CommodityPrice } from "@/components/terminal/CommodityPrice";
import { SectorHeatmap } from "@/components/terminal/SectorHeatmap";
import { MiniChart } from "@/components/terminal/MiniChart";
import { useMarketData } from "@/hooks/useMarketData";
import { RefreshCw, TrendingUp, Newspaper, DollarSign, BarChart3, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

// Generate mock chart data
const generateChartData = (trend: "up" | "down" | "mixed") => {
  const base = 100;
  let current = base;
  return Array.from({ length: 24 }, (_, i) => {
    const change = trend === "up" 
      ? Math.random() * 3 - 0.5
      : trend === "down"
        ? Math.random() * -3 + 0.5
        : Math.random() * 4 - 2;
    current += change;
    return { value: current };
  });
};

export default function Index() {
  const {
    indices,
    stocks,
    currencies,
    commodities,
    sectors,
    news,
    tickerItems,
    lastUpdated,
    isLoading,
    refreshData
  } = useMarketData();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* SEO */}
      <title>India Terminal - Live Indian Stock Market Data & Financial News</title>
      <meta name="description" content="Real-time Indian stock market terminal with live NSE/BSE data, Nifty 50, Sensex, currency rates, and financial news. Your Bloomberg-style dashboard for Indian markets." />
      
      {/* Header */}
      <MarketHeader />
      
      {/* Ticker Strip */}
      <TickerStrip items={tickerItems} />
      
      {/* Main Content */}
      <main className="flex-1 p-3 md:p-4 overflow-auto">
        <div className="max-w-[1800px] mx-auto space-y-4">
          {/* Top Bar with Refresh */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
              <span>Last updated: {lastUpdated.toLocaleTimeString('en-IN')}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={refreshData}
              disabled={isLoading}
              className="gap-2 font-mono text-xs"
            >
              <RefreshCw className={`w-3 h-3 ${isLoading ? 'animate-spin' : ''}`} />
              REFRESH
            </Button>
          </div>

          {/* Indices Grid */}
          <section className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {indices.map((index) => (
              <MarketIndex
                key={index.name}
                name={index.name}
                value={index.value}
                change={index.change}
                changePercent={index.changePercent}
              />
            ))}
          </section>

          {/* Main Grid */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            {/* Stocks Watchlist */}
            <TerminalCard
              title="TOP STOCKS"
              className="lg:col-span-2"
              headerAction={
                <TrendingUp className="w-4 h-4 text-muted-foreground" />
              }
            >
              <ScrollArea className="h-[320px]">
                {stocks.map((stock) => (
                  <StockRow
                    key={stock.symbol}
                    symbol={stock.symbol}
                    name={stock.name}
                    price={stock.price}
                    change={stock.change}
                    changePercent={stock.changePercent}
                    volume={stock.volume}
                  />
                ))}
              </ScrollArea>
            </TerminalCard>

            {/* Market News */}
            <TerminalCard
              title="MARKET NEWS"
              headerAction={
                <Newspaper className="w-4 h-4 text-muted-foreground" />
              }
            >
              <ScrollArea className="h-[320px]">
                <NewsTicker news={news} />
              </ScrollArea>
            </TerminalCard>
          </section>

          {/* Second Row */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Currency Rates */}
            <TerminalCard
              title="FOREX"
              headerAction={
                <DollarSign className="w-4 h-4 text-muted-foreground" />
              }
            >
              <div className="space-y-1">
                {currencies.map((currency) => (
                  <CurrencyRate
                    key={currency.pair}
                    pair={currency.pair}
                    rate={currency.rate}
                    change={currency.change}
                    flag={currency.flag}
                  />
                ))}
              </div>
            </TerminalCard>

            {/* Commodities */}
            <TerminalCard
              title="COMMODITIES"
              headerAction={
                <BarChart3 className="w-4 h-4 text-muted-foreground" />
              }
            >
              <div className="space-y-1">
                {commodities.map((commodity) => (
                  <CommodityPrice
                    key={commodity.name}
                    name={commodity.name}
                    price={commodity.price}
                    unit={commodity.unit}
                    change={commodity.change}
                    icon={commodity.icon}
                  />
                ))}
              </div>
            </TerminalCard>

            {/* Sector Heatmap */}
            <TerminalCard
              title="SECTOR PERFORMANCE"
              className="md:col-span-2"
              headerAction={
                <Layers className="w-4 h-4 text-muted-foreground" />
              }
            >
              <SectorHeatmap sectors={sectors} />
            </TerminalCard>
          </section>

          {/* Charts Row */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <TerminalCard title="NIFTY 50 - 24H">
              <div className="flex flex-col gap-2">
                <MiniChart 
                  data={generateChartData(indices[0]?.changePercent > 0 ? "up" : "down")} 
                  color={indices[0]?.changePercent > 0 ? "success" : "destructive"}
                  height={100}
                />
                <div className="flex justify-between text-xs font-mono text-muted-foreground">
                  <span>Open</span>
                  <span>Close</span>
                </div>
              </div>
            </TerminalCard>

            <TerminalCard title="SENSEX - 24H">
              <div className="flex flex-col gap-2">
                <MiniChart 
                  data={generateChartData(indices[1]?.changePercent > 0 ? "up" : "down")} 
                  color={indices[1]?.changePercent > 0 ? "success" : "destructive"}
                  height={100}
                />
                <div className="flex justify-between text-xs font-mono text-muted-foreground">
                  <span>Open</span>
                  <span>Close</span>
                </div>
              </div>
            </TerminalCard>

            <TerminalCard title="BANK NIFTY - 24H">
              <div className="flex flex-col gap-2">
                <MiniChart 
                  data={generateChartData(indices[2]?.changePercent > 0 ? "up" : "down")} 
                  color={indices[2]?.changePercent > 0 ? "success" : "destructive"}
                  height={100}
                />
                <div className="flex justify-between text-xs font-mono text-muted-foreground">
                  <span>Open</span>
                  <span>Close</span>
                </div>
              </div>
            </TerminalCard>
          </section>

          {/* Footer */}
          <footer className="text-center py-4 border-t border-border">
            <p className="text-xs font-mono text-muted-foreground">
              INDIA TERMINAL • Market data for informational purposes only • {new Date().getFullYear()}
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
}
