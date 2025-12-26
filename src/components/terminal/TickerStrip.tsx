import { cn } from "@/lib/utils";

interface TickerItem {
  symbol: string;
  price: number;
  change: number;
}

interface TickerStripProps {
  items: TickerItem[];
}

export function TickerStrip({ items }: TickerStripProps) {
  const duplicatedItems = [...items, ...items];

  return (
    <div className="bg-muted/50 border-b border-border overflow-hidden">
      <div className="ticker-scroll flex whitespace-nowrap">
        {duplicatedItems.map((item, index) => (
          <div
            key={`${item.symbol}-${index}`}
            className="flex items-center gap-2 px-4 py-1.5"
          >
            <span className="font-mono text-xs text-primary font-semibold">{item.symbol}</span>
            <span className="font-mono text-xs text-foreground">
              ₹{item.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </span>
            <span className={cn(
              "font-mono text-xs",
              item.change > 0 && "text-success",
              item.change < 0 && "text-destructive",
              item.change === 0 && "text-muted-foreground"
            )}>
              {item.change > 0 && "+"}{item.change.toFixed(2)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
