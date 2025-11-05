import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface TransfersChartProps {
  data: Array<{
    gameweek: number;
    event_transfers: number;
  }>;
}

export default function TransfersChart({ data }: TransfersChartProps) {
  const chartData = data.map((d) => ({
    gw: `GW${d.gameweek}`,
    transfers: d.event_transfers,
  }));

  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4 text-primary">Transfers Per Gameweek</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-aux)" />
          <XAxis dataKey="gw" stroke="var(--color-primary)" />
          <YAxis stroke="var(--color-primary)" />
          <Tooltip contentStyle={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-aux)', color: 'var(--color-primary)' }} />
          <Line
            type="stepAfter"
            dataKey="transfers"
            stroke="var(--color-warning)"
            strokeWidth={2}
            dot={{ fill: "var(--color-warning)" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
