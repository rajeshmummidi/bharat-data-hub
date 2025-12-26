import { cn } from "@/lib/utils";

interface Sector {
  name: string;
  change: number;
}

interface SectorHeatmapProps {
  sectors: Sector[];
}

export function SectorHeatmap({ sectors }: SectorHeatmapProps) {
  const getColorClass = (change: number) => {
    if (change >= 2) return "bg-success text-success-foreground";
    if (change >= 1) return "bg-success/70 text-success-foreground";
    if (change > 0) return "bg-success/40 text-foreground";
    if (change <= -2) return "bg-destructive text-destructive-foreground";
    if (change <= -1) return "bg-destructive/70 text-destructive-foreground";
    if (change < 0) return "bg-destructive/40 text-foreground";
    return "bg-muted text-muted-foreground";
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
      {sectors.map((sector) => (
        <div
          key={sector.name}
          className={cn(
            "p-2 rounded-sm text-center transition-all hover:scale-105",
            getColorClass(sector.change)
          )}
        >
          <span className="text-xs font-mono font-medium block truncate">{sector.name}</span>
          <span className="text-sm font-mono font-bold">
            {sector.change > 0 && "+"}{sector.change.toFixed(1)}%
          </span>
        </div>
      ))}
    </div>
  );
}
