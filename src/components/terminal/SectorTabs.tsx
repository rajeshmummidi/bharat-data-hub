import { cn } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface SectorTabsProps {
  sectors: string[];
  selectedSector: string;
  onSelectSector: (sector: string) => void;
}

export function SectorTabs({ sectors, selectedSector, onSelectSector }: SectorTabsProps) {
  return (
    <ScrollArea className="w-full">
      <div className="flex gap-1 pb-2">
        {sectors.map((sector) => (
          <button
            key={sector}
            onClick={() => onSelectSector(sector)}
            className={cn(
              "px-3 py-1.5 text-xs font-mono whitespace-nowrap rounded transition-all",
              selectedSector === sector
                ? "bg-primary text-primary-foreground shadow-lg glow-primary"
                : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground border border-border/50"
            )}
          >
            {sector}
          </button>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
