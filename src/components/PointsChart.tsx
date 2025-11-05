import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
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

  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4 text-primary">Points Per Gameweek</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-aux)" />
          <XAxis dataKey="gw" stroke="var(--color-primary)" />
          <YAxis stroke="var(--color-primary)" />
          <Tooltip contentStyle={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-aux)', color: 'var(--color-primary)' }} />
          <Bar dataKey="points" fill="var(--color-accent)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
