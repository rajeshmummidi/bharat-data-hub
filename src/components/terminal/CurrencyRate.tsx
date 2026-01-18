import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

interface CurrencyRateProps {
  pair: string;
  rate: number;
  change: number;
  flag?: string;
}

export function CurrencyRate({ pair, rate, change, flag }: CurrencyRateProps) {
  const isPositive = change > 0;
  const isNegative = change < 0;

  return (
    <div className="flex items-center justify-between py-2 px-2 hover:bg-muted/30 transition-colors rounded-sm">
      <div className="flex items-center gap-2">
        {flag && <span className="text-lg">{flag}</span>}
        <span className="font-mono text-sm text-foreground">{pair}</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="font-mono text-sm font-medium text-foreground">
          {rate.toFixed(4)}
        </span>
        <span className={cn(
          "flex items-center gap-1 text-xs font-mono",
          isPositive && "text-success",
          isNegative && "text-destructive",
          !isPositive && !isNegative && "text-muted-foreground"
        )}>
          {isPositive && <TrendingUp className="w-3 h-3" />}
          {isNegative && <TrendingDown className="w-3 h-3" />}
          {isPositive && "+"}{change.toFixed(2)}%
        </span>
      </div>
    </div>
  );
}
