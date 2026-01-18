import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TerminalCardProps {
  title: string;
  children: ReactNode;
  className?: string;
  headerAction?: ReactNode;
}

export function TerminalCard({ title, children, className, headerAction }: TerminalCardProps) {
  return (
    <div className={cn("terminal-card flex flex-col", className)}>
      <div className="terminal-header">
        <h3 className="terminal-title">{title}</h3>
        {headerAction}
      </div>
      <div className="flex-1 p-3">
        {children}
      </div>
    </div>
  );
}
