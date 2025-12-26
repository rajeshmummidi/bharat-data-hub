import { Clock } from "lucide-react";

interface NewsItem {
  id: string;
  headline: string;
  source: string;
  time: string;
  isBreaking?: boolean;
}

interface NewsTickerProps {
  news: NewsItem[];
}

export function NewsTicker({ news }: NewsTickerProps) {
  return (
    <div className="overflow-hidden">
      <div className="space-y-1">
        {news.map((item, index) => (
          <div
            key={item.id}
            className="py-2 px-2 hover:bg-muted/30 transition-colors rounded-sm border-b border-border/50 last:border-0 animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-start gap-2">
              {item.isBreaking && (
                <span className="px-1.5 py-0.5 bg-destructive text-destructive-foreground text-[10px] font-mono font-bold rounded uppercase flex-shrink-0">
                  Breaking
                </span>
              )}
              <p className="text-sm text-foreground font-medium leading-tight line-clamp-2">
                {item.headline}
              </p>
            </div>
            <div className="flex items-center gap-2 mt-1.5 text-xs text-muted-foreground font-mono">
              <span className="text-primary">{item.source}</span>
              <span>•</span>
              <Clock className="w-3 h-3" />
              <span>{item.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
