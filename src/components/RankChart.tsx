import {
  Area,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface RankChartProps {
  data: Array<{
    gameweek: number;
    overall_rank: number;
  }>;
}

export default function RankChart({ data }: RankChartProps) {
  const chartData = data.map((d) => ({
    gw: `GW${d.gameweek}`,
    rank: d.overall_rank,
  }));

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-surface border border-aux rounded-lg p-3 shadow-lg">
          <p className="text-primary font-semibold">{`Gameweek: ${label}`}</p>
          <p className="text-accent">
            {`Overall Rank: ${payload[0].value.toLocaleString()}`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4 text-primary flex items-center gap-2">
        📈 Rank Progression
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={chartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="rankGradient" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="var(--color-accent)"
                stopOpacity={0.3}
              />
              <stop
                offset="95%"
                stopColor="var(--color-accent)"
                stopOpacity={0.1}
              />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="var(--color-aux)"
            strokeOpacity={0.3}
          />
          <XAxis
            dataKey="gw"
            stroke="var(--color-neutral)"
            fontSize={12}
            tickLine={false}
          />
          <YAxis
            reversed
            stroke="var(--color-neutral)"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="rank"
            stroke="var(--color-accent)"
            strokeWidth={3}
            fill="url(#rankGradient)"
            dot={{
              fill: "var(--color-accent)",
              strokeWidth: 2,
              stroke: "var(--color-surface)",
              r: 4,
            }}
            activeDot={{
              r: 6,
              fill: "var(--color-accent)",
              stroke: "var(--color-surface)",
              strokeWidth: 2,
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
