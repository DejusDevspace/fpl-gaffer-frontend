import {
  LineChart,
  Line,
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

  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4 text-primary">Rank Over Gameweeks</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-aux)" />
          <XAxis dataKey="gw" stroke="var(--color-primary)" />
          <YAxis reversed stroke="var(--color-primary)" />
          <Tooltip contentStyle={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-aux)', color: 'var(--color-primary)' }} />
          <Line
            type="monotone"
            dataKey="rank"
            stroke="var(--color-accent)"
            strokeWidth={2}
            dot={{ fill: "var(--color-accent)" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
