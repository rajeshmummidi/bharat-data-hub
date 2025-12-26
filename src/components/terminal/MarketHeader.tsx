import { Activity, Clock, Wifi } from "lucide-react";
import { useEffect, useState } from "react";

export function MarketHeader() {
  const [time, setTime] = useState(new Date());
  const [isMarketOpen, setIsMarketOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTime(now);
      
      // Indian market hours: 9:15 AM - 3:30 PM IST, Mon-Fri
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const day = now.getDay();
      const timeInMinutes = hours * 60 + minutes;
      const isWeekday = day >= 1 && day <= 5;
      const marketOpenMinutes = 9 * 60 + 15; // 9:15 AM
      const marketCloseMinutes = 15 * 60 + 30; // 3:30 PM
      
      setIsMarketOpen(isWeekday && timeInMinutes >= marketOpenMinutes && timeInMinutes < marketCloseMinutes);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <header className="bg-card border-b border-border px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Activity className="w-6 h-6 text-primary" />
            <h1 className="text-xl font-bold text-foreground">
              <span className="text-primary">INDIA</span>
              <span className="text-accent">TERMINAL</span>
            </h1>
          </div>
          <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-muted rounded-sm">
            <div className={`w-2 h-2 rounded-full ${isMarketOpen ? 'bg-success pulse-dot' : 'bg-destructive'}`} />
            <span className="text-xs font-mono text-muted-foreground">
              NSE/BSE: {isMarketOpen ? 'OPEN' : 'CLOSED'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden sm:flex items-center gap-2 text-muted-foreground">
            <Wifi className="w-4 h-4 text-success" />
            <span className="text-xs font-mono">LIVE</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span className="font-mono text-sm text-foreground">
              {time.toLocaleTimeString('en-IN', { 
                hour: '2-digit', 
                minute: '2-digit',
                second: '2-digit',
                hour12: false 
              })}
            </span>
            <span className="text-xs text-muted-foreground font-mono">IST</span>
          </div>
        </div>
      </div>
    </header>
  );
}
