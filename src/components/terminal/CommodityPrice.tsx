import { cn } from "@/lib/utils";

interface CommodityPriceProps {
  name: string;
  price: number;
  unit: string;
  change: number;
  icon?: string;
}

export function CommodityPrice({ name, price, unit, change, icon }: CommodityPriceProps) {
  const isPositive = change > 0;
  const isNegative = change < 0;

  return (
    <div className="flex items-center justify-between py-2 px-2 hover:bg-muted/30 transition-colors rounded-sm">
      <div className="flex items-center gap-2">
        {icon && <span className="text-lg">{icon}</span>}
        <div>
          <span className="font-mono text-sm text-foreground block">{name}</span>
          <span className="text-xs text-muted-foreground">{unit}</span>
        </div>
      </div>
      <div className="text-right">
        <span className="font-mono text-sm font-medium text-foreground block">
          ₹{price.toLocaleString('en-IN')}
        </span>
        <span className={cn(
          "text-xs font-mono",
          isPositive && "text-success",
          isNegative && "text-destructive",
          !isPositive && !isNegative && "text-muted-foreground"
        )}>
          {isPositive && "+"}{change.toFixed(2)}%
        </span>
      </div>
    </div>
  );
}
