import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface PointsChartProps {
  data: Array<{
    gameweek: number;
    points: number;
  }>;
}

export default function PointsChart({ data }: PointsChartProps) {
  const chartData = data.map((d) => ({
    gw: `GW${d.gameweek}`,
    points: d.points,
  }));

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-surface border border-aux rounded-lg p-3 shadow-lg">
          <p className="text-primary font-semibold">{`Gameweek: ${label}`}</p>
          <p className="text-greenAccent">
            {`Points: ${payload[0].value}`}
          </p>
        </div>
      );
    }
    return null;
  };

  // Color bars based on performance (green for high, yellow for medium, red for low)
  const getBarColor = (points: number) => {
    if (points >= 80) return "var(--color-greenAccent)";
    if (points >= 50) return "var(--color-accent)";
    return "var(--color-warning)";
  };

  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4 text-primary flex items-center gap-2">
        ⚽ Points Performance
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <defs>
            <linearGradient id="pointsGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-greenAccent)" stopOpacity={0.8}/>
              <stop offset="100%" stopColor="var(--color-greenAccent)" stopOpacity={0.4}/>
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
            stroke="var(--color-neutral)"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey="points"
            radius={[4, 4, 0, 0]}
            animationDuration={800}
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={getBarColor(entry.points)}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
