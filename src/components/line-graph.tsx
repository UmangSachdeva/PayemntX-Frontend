import { LineConfig } from "@/types/graph";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type LineGraphProps = {
  data: object[];
  xAxisKey: string;
  yAxisFormatter?: (value: number) => string;
  tooltipFormatter?: (value: number | string) => [string, string];
  labelFormatter?: (label: string) => string;
  lines: LineConfig[];
  showGrid?: boolean;
  height?: string | number;
  width?: string | number;
};

export const LineGraph = ({
  data,
  xAxisKey,
  yAxisFormatter = (value: number) => value.toString(),
  tooltipFormatter,
  labelFormatter,
  lines,
  showGrid = true,
  height = "100%",
  width = "100%",
}: LineGraphProps) => {
  return (
    <ResponsiveContainer width={width} height={height}>
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 20,
          left: 20,
          bottom: 5,
        }}
      >
        {showGrid && <CartesianGrid strokeDasharray="3 3" vertical={false} />}
        <XAxis dataKey={xAxisKey} />
        <YAxis tickFormatter={yAxisFormatter} />
        <Tooltip formatter={tooltipFormatter} labelFormatter={labelFormatter} />
        {lines.map((line, i) => (
          <Line
            key={line.dataKey + i}
            type={line.type || "monotone"}
            dataKey={line.dataKey}
            stroke={line.stroke || "hsl(var(--heroui-primary-500))"}
            strokeWidth={line.strokeWidth || 2}
            dot={
              line.dot ?? {
                r: 4,
                fill: line.stroke || "hsl(var(--heroui-primary-500))",
              }
            }
            activeDot={line.activeDot ?? { r: 6 }}
            animationDuration={line.animationDuration || 1500}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};
