import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StockRowProps {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume?: string;
}

export function StockRow({ symbol, name, price, change, changePercent, volume }: StockRowProps) {
  const isPositive = change > 0;
  const isNegative = change < 0;

  return (
    <div className="flex items-center py-2.5 px-2 hover:bg-muted/30 transition-colors rounded-sm border-b border-border/50 last:border-0">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-mono font-semibold text-primary text-sm">{symbol}</span>
          <span className={cn(
            "w-2 h-2 rounded-full pulse-dot",
            isPositive && "bg-success",
            isNegative && "bg-destructive",
            !isPositive && !isNegative && "bg-muted-foreground"
          )} />
        </div>
        <span className="text-xs text-muted-foreground truncate block">{name}</span>
      </div>

      <div className="text-right flex-shrink-0 min-w-[80px]">
        <div className="font-mono font-medium text-foreground text-sm">
          ₹{price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
        </div>
        {volume && (
          <div className="text-xs text-muted-foreground font-mono">{volume}</div>
        )}
      </div>

      <div className={cn(
        "text-right flex-shrink-0 min-w-[90px] ml-3 flex items-center justify-end gap-1",
        isPositive && "text-success",
        isNegative && "text-destructive",
        !isPositive && !isNegative && "text-muted-foreground"
      )}>
        {isPositive && <TrendingUp className="w-3 h-3" />}
        {isNegative && <TrendingDown className="w-3 h-3" />}
        <div className="font-mono text-sm">
          <span>{isPositive && "+"}{changePercent.toFixed(2)}%</span>
        </div>
      </div>
    </div>
  );
}
