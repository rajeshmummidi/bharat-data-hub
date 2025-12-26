import { Area, AreaChart, ResponsiveContainer } from "recharts";

interface MiniChartProps {
  data: { value: number }[];
  color: "success" | "destructive" | "primary";
  height?: number;
}

export function MiniChart({ data, color, height = 60 }: MiniChartProps) {
  const colorMap = {
    success: "#22c55e",
    destructive: "#ef4444",
    primary: "#00ffff"
  };

  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={colorMap[color]} stopOpacity={0.3} />
            <stop offset="100%" stopColor={colorMap[color]} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="value"
          stroke={colorMap[color]}
          strokeWidth={1.5}
          fill={`url(#gradient-${color})`}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
