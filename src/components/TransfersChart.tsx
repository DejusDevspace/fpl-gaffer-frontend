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
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Transfers Per Gameweek</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="gw" />
          <YAxis />
          <Tooltip />
          <Line
            type="stepAfter"
            dataKey="transfers"
            stroke="#f59e0b"
            strokeWidth={2}
            dot={{ fill: "#f59e0b" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
