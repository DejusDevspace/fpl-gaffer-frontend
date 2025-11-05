import {
  ComposedChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
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

  // Calculate average transfers for reference line
  const avgTransfers = chartData.reduce((sum, d) => sum + d.transfers, 0) / chartData.length;

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const transfers = payload[0].value;
      const isAboveAvg = transfers > avgTransfers;
      return (
        <div className="bg-surface border border-aux rounded-lg p-3 shadow-lg">
          <p className="text-primary font-semibold">{`Gameweek: ${label}`}</p>
          <p className="text-warning">
            {`Transfers: ${transfers}`}
          </p>
          <p className={`text-sm ${isAboveAvg ? 'text-greenAccent' : 'text-neutral'}`}>
            {isAboveAvg ? 'Above average' : 'Below average'}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4 text-primary flex items-center gap-2">
        🔄 Transfer Activity
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="transfersGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-warning)" stopOpacity={0.4}/>
              <stop offset="95%" stopColor="var(--color-warning)" stopOpacity={0.1}/>
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
          <ReferenceLine
            y={avgTransfers}
            stroke="var(--color-neutral)"
            strokeDasharray="5 5"
            label={{
              value: `Avg: ${Math.round(avgTransfers)}`,
              position: "insideTopRight",
              fill: "var(--color-neutral)",
              fontSize: 10
            }}
          />
          <Area
            type="stepAfter"
            dataKey="transfers"
            stroke="var(--color-warning)"
            strokeWidth={3}
            fill="url(#transfersGradient)"
            dot={{
              fill: "var(--color-warning)",
              strokeWidth: 2,
              stroke: "var(--color-surface)",
              r: 4
            }}
            activeDot={{
              r: 6,
              fill: "var(--color-warning)",
              stroke: "var(--color-surface)",
              strokeWidth: 2
            }}
            animationDuration={1000}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
