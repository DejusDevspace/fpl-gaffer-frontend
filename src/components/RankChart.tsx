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
    <div className="bg-aux rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Rank Over Gameweeks</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="gw" />
          <YAxis reversed />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="rank"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ fill: "#3b82f6" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
