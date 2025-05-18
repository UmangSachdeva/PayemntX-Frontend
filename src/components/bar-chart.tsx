import { BarConfig } from "@/types/graph";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

type BarChartProps = {
  data: object[];
  xAxisKey: string;
  yAxisFormatter?: (value: number) => string;
  tooltipFormatter?: (value: number | string) => [string, string];
  labelFormatter?: (label: string) => string;
  bars: BarConfig[];
  showGrid?: boolean;
  height?: string | number;
  width?: string | number;
};

// Custom Legend Renderer
const CustomLegend = (props: any) => {
  const { payload } = props;
  return (
    <ul
      style={{
        display: "flex",
        gap: 16,
        listStyle: "none",
        margin: 0,
        padding: 0,
      }}
    >
      {payload.map((entry: any, index: number) => (
        <li
          key={`item-${index}`}
          style={{
            display: "flex",
            alignItems: "center",
            fontWeight: 600,
            color: "white",
            fontSize: 14,
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: 12,
              height: 12,
              backgroundColor: entry.color,
              borderRadius: 3,
              marginRight: 8,
            }}
            className="text-white"
          />
          {entry.value}
        </li>
      ))}
    </ul>
  );
};

// Custom Bar hover style
const activeBar = {
  style: {
    background: "black",
    filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.15))",
    opacity: 1,
  },
  background: "white",
};

export const BarChartComponent = ({
  data,
  xAxisKey,
  yAxisFormatter = (value: number) => value.toString(),
  tooltipFormatter,
  labelFormatter,
  bars,
  showGrid = false,
  height = "100%",
  width = "100%",
}: BarChartProps) => {
  return (
    <ResponsiveContainer width={width} height={height}>
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        {showGrid && <CartesianGrid strokeDasharray="3 3" vertical={false} />}
        <XAxis dataKey={xAxisKey} />
        <YAxis tickFormatter={yAxisFormatter} />
        <Tooltip
          labelStyle={{
            color: "black",
          }}
          formatter={tooltipFormatter}
          cursor={{ fill: "#222222", style: { transition: "fill 1s ease" } }}
          labelFormatter={labelFormatter}
        />
        <Legend content={<CustomLegend />} />
        {bars.map((bar, i) => (
          <Bar
            key={bar.dataKey + i}
            dataKey={bar.dataKey}
            name={bar.name}
            fill={bar.fill || "hsl(var(--heroui-primary-500))"}
            radius={bar.radius || [4, 4, 0, 0]}
            animationDuration={bar.animationDuration || 1500}
            activeBar={activeBar}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};
