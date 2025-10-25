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
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Points Per Gameweek</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="gw" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="points" fill="#10b981" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
