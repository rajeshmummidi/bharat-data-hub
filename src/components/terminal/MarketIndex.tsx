import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface MarketIndexProps {
  name: string;
  value: number;
  change: number;
  changePercent: number;
  className?: string;
  compact?: boolean;
}

export function MarketIndex({ name, value, change, changePercent, className, compact = false }: MarketIndexProps) {
  const isPositive = change > 0;
  const isNegative = change < 0;

  if (compact) {
    return (
      <div className={cn(
        "terminal-card p-3 flex items-center justify-between transition-all hover:border-primary/50",
        isPositive && "border-success/30",
        isNegative && "border-destructive/30",
        className
      )}>
        <div>
          <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider block">{name}</span>
          <span className="text-lg font-mono font-bold text-foreground">
            {value.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
          </span>
        </div>
        <div className={cn(
          "flex items-center gap-1 px-2 py-1 rounded text-xs font-mono font-semibold",
          isPositive && "bg-success/20 text-success",
          isNegative && "bg-destructive/20 text-destructive",
          !isPositive && !isNegative && "bg-muted text-muted-foreground"
        )}>
          {isPositive && <TrendingUp className="w-3 h-3" />}
          {isNegative && <TrendingDown className="w-3 h-3" />}
          {!isPositive && !isNegative && <Minus className="w-3 h-3" />}
          {isPositive && "+"}{changePercent.toFixed(2)}%
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      "terminal-card p-4 flex flex-col gap-2 transition-all hover:border-primary/50 relative overflow-hidden",
      isPositive && "glow-success border-success/30",
      isNegative && "glow-destructive border-destructive/30",
      className
    )}>
      {/* Background gradient effect */}
      <div className={cn(
        "absolute inset-0 opacity-5",
        isPositive && "bg-gradient-to-br from-success to-transparent",
        isNegative && "bg-gradient-to-br from-destructive to-transparent"
      )} />
      
      <div className="relative">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">{name}</span>
          <div className={cn(
            "flex items-center gap-1 text-xs font-mono",
            isPositive && "text-success",
            isNegative && "text-destructive",
            !isPositive && !isNegative && "text-muted-foreground"
          )}>
            {isPositive && <TrendingUp className="w-3 h-3" />}
            {isNegative && <TrendingDown className="w-3 h-3" />}
            {!isPositive && !isNegative && <Minus className="w-3 h-3" />}
          </div>
        </div>
        
        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-2xl font-mono font-bold text-foreground">
            {value.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
          </span>
        </div>

        <div className="flex items-center gap-3 text-sm font-mono mt-2">
          <span className={cn(
            isPositive && "text-success",
            isNegative && "text-destructive",
            !isPositive && !isNegative && "text-muted-foreground"
          )}>
            {isPositive && "+"}{change.toFixed(2)}
          </span>
          <span className={cn(
            "px-2 py-0.5 rounded text-xs font-semibold",
            isPositive && "bg-success/20 text-success",
            isNegative && "bg-destructive/20 text-destructive",
            !isPositive && !isNegative && "bg-muted text-muted-foreground"
          )}>
            {isPositive && "+"}{changePercent.toFixed(2)}%
          </span>
        </div>
      </div>
    </div>
  );
}
