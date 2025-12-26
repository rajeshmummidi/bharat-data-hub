import { MarketHeader } from "@/components/terminal/MarketHeader";
import { TickerStrip } from "@/components/terminal/TickerStrip";
import { MarketIndex } from "@/components/terminal/MarketIndex";
import { TerminalCard } from "@/components/terminal/TerminalCard";
import { StockRow } from "@/components/terminal/StockRow";
import { NewsTicker } from "@/components/terminal/NewsTicker";
import { CurrencyRate } from "@/components/terminal/CurrencyRate";
import { CommodityPrice } from "@/components/terminal/CommodityPrice";
import { SectorHeatmap } from "@/components/terminal/SectorHeatmap";
import { SectorTabs } from "@/components/terminal/SectorTabs";
import { GainerLoserCard } from "@/components/terminal/GainerLoserCard";
import { MiniChart } from "@/components/terminal/MiniChart";
import { useMarketData } from "@/hooks/useMarketData";
import { RefreshCw, TrendingUp, Newspaper, DollarSign, BarChart3, Layers, Zap, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const generateChartData = (trend: "up" | "down" | "mixed") => {
  const base = 100;
  let current = base;
  return Array.from({ length: 30 }, (_, i) => {
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
    sectorsWithStocks,
    topGainers,
    topLosers,
    currencies,
    commodities,
    sectors,
    news,
    tickerItems,
    lastUpdated,
    isLoading,
    refreshData,
    selectedSector,
    setSelectedSector
  } = useMarketData();

  const sectorNames = Object.keys(sectorsWithStocks);
  const currentSectorStocks = sectorsWithStocks[selectedSector] || [];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <title>Bharat Terminal - Live Indian Stock Market Data & Financial Dashboard</title>
      <meta name="description" content="Real-time Indian stock market terminal with live NSE/BSE data, Nifty 50, Sensex, sector-wise stocks, currency rates, and financial news. Your Bloomberg-style dashboard for Indian markets." />
      
      {/* Header */}
      <MarketHeader />
      
      {/* Ticker Strip */}
      <TickerStrip items={tickerItems} />
      
      {/* Main Content */}
      <main className="flex-1 p-3 md:p-4 overflow-auto">
        <div className="max-w-[1920px] mx-auto space-y-4">
          {/* Top Bar */}
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
                <Activity className="w-3 h-3 text-primary" />
                <span>Updated: {lastUpdated.toLocaleTimeString('en-IN')}</span>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={refreshData}
              disabled={isLoading}
              className="gap-2 font-mono text-xs border-primary/30 hover:border-primary hover:bg-primary/10"
            >
              <RefreshCw className={`w-3 h-3 ${isLoading ? 'animate-spin' : ''}`} />
              REFRESH DATA
            </Button>
          </div>

          {/* Main Indices */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-4 h-4 text-accent" />
              <h2 className="text-sm font-mono font-bold text-accent uppercase tracking-wider">Market Indices</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {indices.map((index, i) => (
                <MarketIndex
                  key={index.name}
                  name={index.name}
                  value={index.value}
                  change={index.change}
                  changePercent={index.changePercent}
                  compact={i > 3}
                />
              ))}
            </div>
          </section>

          {/* Top Gainers & Losers + Charts Row */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            <GainerLoserCard 
              title="Top Gainers" 
              stocks={topGainers} 
              type="gainer" 
            />
            <GainerLoserCard 
              title="Top Losers" 
              stocks={topLosers} 
              type="loser" 
            />
            
            {/* Mini Charts */}
            <TerminalCard title="NIFTY 50 TREND" className="border-primary/20">
              <MiniChart 
                data={generateChartData(indices[0]?.changePercent > 0 ? "up" : "down")} 
                color={indices[0]?.changePercent > 0 ? "success" : "destructive"}
                height={120}
              />
            </TerminalCard>
            <TerminalCard title="SENSEX TREND" className="border-primary/20">
              <MiniChart 
                data={generateChartData(indices[1]?.changePercent > 0 ? "up" : "down")} 
                color={indices[1]?.changePercent > 0 ? "success" : "destructive"}
                height={120}
              />
            </TerminalCard>
          </section>

          {/* Sector Stocks Section */}
          <section className="terminal-card p-4">
            <div className="flex items-center gap-2 mb-3">
              <Layers className="w-4 h-4 text-primary" />
              <h2 className="text-sm font-mono font-bold text-primary uppercase tracking-wider">Stocks by Sector</h2>
              <span className="text-xs text-muted-foreground font-mono ml-2">({currentSectorStocks.length} stocks)</span>
            </div>
            
            <SectorTabs 
              sectors={sectorNames} 
              selectedSector={selectedSector}
              onSelectSector={setSelectedSector}
            />
            
            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4">
              {currentSectorStocks.map((stock, index) => (
                <div key={stock.symbol} className="animate-fade-in" style={{ animationDelay: `${index * 30}ms` }}>
                  <StockRow
                    symbol={stock.symbol}
                    name={stock.name}
                    price={stock.price}
                    change={stock.change}
                    changePercent={stock.changePercent}
                    volume={stock.volume}
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Second Row: News, Forex, Commodities, Heatmap */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            {/* Market News */}
            <TerminalCard
              title="BREAKING NEWS"
              className="lg:row-span-2"
              headerAction={
                <Newspaper className="w-4 h-4 text-accent" />
              }
            >
              <ScrollArea className="h-[380px]">
                <NewsTicker news={news} />
              </ScrollArea>
            </TerminalCard>

            {/* Currency Rates */}
            <TerminalCard
              title="FOREX RATES"
              headerAction={
                <DollarSign className="w-4 h-4 text-terminal-blue" />
              }
            >
              <div className="space-y-0.5">
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
                <BarChart3 className="w-4 h-4 text-terminal-amber" />
              }
            >
              <div className="space-y-0.5">
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
              className="lg:col-span-2"
              headerAction={
                <TrendingUp className="w-4 h-4 text-success" />
              }
            >
              <SectorHeatmap sectors={sectors} />
            </TerminalCard>
          </section>

          {/* Footer */}
          <footer className="text-center py-6 border-t border-border mt-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-primary pulse-dot" />
              <span className="text-xs font-mono text-primary uppercase tracking-wider">Live Market Data</span>
            </div>
            <p className="text-xs font-mono text-muted-foreground">
              BHARAT TERMINAL © {new Date().getFullYear()} • Indian Stock Market Dashboard • Data for informational purposes only
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
}
