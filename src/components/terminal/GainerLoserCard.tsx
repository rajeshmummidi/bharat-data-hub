import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

interface Stock {
  symbol: string;
  name: string;
  price: number;
  changePercent: number;
}

interface GainerLoserCardProps {
  title: string;
  stocks: Stock[];
  type: "gainer" | "loser";
}

export function GainerLoserCard({ title, stocks, type }: GainerLoserCardProps) {
  const isGainer = type === "gainer";
  
  return (
    <div className={cn(
      "terminal-card overflow-hidden",
      isGainer ? "border-success/30" : "border-destructive/30"
    )}>
      <div className={cn(
        "px-3 py-2 flex items-center gap-2",
        isGainer ? "bg-success/10" : "bg-destructive/10"
      )}>
        {isGainer ? (
          <TrendingUp className="w-4 h-4 text-success" />
        ) : (
          <TrendingDown className="w-4 h-4 text-destructive" />
        )}
        <span className={cn(
          "text-xs font-mono font-semibold uppercase tracking-wider",
          isGainer ? "text-success" : "text-destructive"
        )}>
          {title}
        </span>
      </div>
      <div className="p-2">
        {stocks.map((stock, index) => (
          <div
            key={stock.symbol}
            className="flex items-center justify-between py-1.5 px-2 hover:bg-muted/30 rounded-sm animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground font-mono w-4">{index + 1}.</span>
              <div>
                <span className="text-sm font-mono font-semibold text-primary">{stock.symbol}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-mono text-foreground">
                ₹{stock.price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              <span className={cn(
                "text-xs font-mono font-semibold px-1.5 py-0.5 rounded",
                isGainer ? "bg-success/20 text-success" : "bg-destructive/20 text-destructive"
              )}>
                {stock.changePercent > 0 && "+"}{stock.changePercent.toFixed(2)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
