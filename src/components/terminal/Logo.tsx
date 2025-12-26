import { TrendingUp } from "lucide-react";

export function Logo() {
  return (
    <div className="flex items-center gap-3">
      {/* Logo Icon */}
      <div className="relative">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary via-terminal-cyan to-terminal-blue flex items-center justify-center shadow-lg glow-primary">
          <TrendingUp className="w-6 h-6 text-background" strokeWidth={2.5} />
        </div>
        {/* Animated pulse ring */}
        <div className="absolute inset-0 rounded-lg bg-primary/30 animate-ping opacity-75" style={{ animationDuration: '3s' }} />
      </div>
      
      {/* Logo Text */}
      <div className="flex flex-col">
        <div className="flex items-baseline gap-0.5">
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-primary via-terminal-cyan to-primary bg-clip-text text-transparent">
            BHARAT
          </span>
          <span className="text-xl font-bold tracking-tight text-accent">
            TERMINAL
          </span>
        </div>
        <span className="text-[9px] font-mono text-muted-foreground tracking-[0.2em] uppercase">
          Indian Markets • Live Data
        </span>
      </div>
    </div>
  );
}
