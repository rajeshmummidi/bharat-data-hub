import { Clock, Wifi, Bell, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";

export function MarketHeader() {
  const [time, setTime] = useState(new Date());
  const [isMarketOpen, setIsMarketOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTime(now);
      
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const day = now.getDay();
      const timeInMinutes = hours * 60 + minutes;
      const isWeekday = day >= 1 && day <= 5;
      const marketOpenMinutes = 9 * 60 + 15;
      const marketCloseMinutes = 15 * 60 + 30;
      
      setIsMarketOpen(isWeekday && timeInMinutes >= marketOpenMinutes && timeInMinutes < marketCloseMinutes);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <header className="bg-gradient-to-r from-card via-card to-muted/30 border-b border-border px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Logo />
          
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-muted/50 rounded border border-border/50">
            <div className={`w-2 h-2 rounded-full ${isMarketOpen ? 'bg-success pulse-dot' : 'bg-destructive'}`} />
            <span className="text-xs font-mono text-muted-foreground">
              NSE/BSE: <span className={isMarketOpen ? 'text-success' : 'text-destructive'}>{isMarketOpen ? 'OPEN' : 'CLOSED'}</span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Search */}
          <Button variant="ghost" size="icon" className="hidden md:flex text-muted-foreground hover:text-primary">
            <Search className="w-4 h-4" />
          </Button>
          
          {/* Notifications */}
          <Button variant="ghost" size="icon" className="hidden md:flex text-muted-foreground hover:text-primary relative">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
          </Button>

          {/* Live indicator */}
          <div className="hidden sm:flex items-center gap-2 px-2 py-1 bg-success/10 rounded border border-success/30">
            <Wifi className="w-3 h-3 text-success" />
            <span className="text-xs font-mono text-success">LIVE</span>
          </div>
          
          {/* Time */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-muted/50 rounded border border-border/50">
            <Clock className="w-4 h-4 text-primary" />
            <span className="font-mono text-sm text-foreground font-medium">
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
