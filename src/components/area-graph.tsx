import { LineChartProps } from "@/types/graph";
import {
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  ResponsiveContainer,
} from "recharts";

function AreaGraph({
  data,
  gradients = [
    {
      id: "colorUv",
      color: "#8884d8",
      stops: [
        { offset: "5%", opacity: 0.8 },
        { offset: "95%", opacity: 0 },
      ],
    },
    {
      id: "colorPv",
      color: "#82ca9d",
      stops: [
        { offset: "5%", opacity: 0.8 },
        { offset: "95%", opacity: 0 },
      ],
    },
  ],
  areas = [
    {
      dataKey: "uv",
      stroke: "#8884d8",
      fill: "url(#colorUv)",
      fillOpacity: 1,
      type: "monotone",
    },
    {
      dataKey: "pv",
      stroke: "#82ca9d",
      fill: "url(#colorPv)",
      fillOpacity: 1,
      type: "monotone",
    },
  ],
  xAxisKey = "name",
  showGrid = false,
  height = "100%",
  width = "100%",
}: LineChartProps) {
  return (
    <ResponsiveContainer height={height} width={width}>
      <AreaChart
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          {gradients.map((g) => (
            <linearGradient key={g.id} id={g.id} x1="0" y1="0" x2="0" y2="1">
              {(
                g.stops || [
                  { offset: "5%", opacity: 0.8 },
                  { offset: "95%", opacity: 0 },
                ]
              ).map((stop, i) => (
                <stop
                  key={i}
                  offset={stop.offset}
                  stopColor={g.color}
                  stopOpacity={stop.opacity}
                />
              ))}
            </linearGradient>
          ))}
        </defs>
        <XAxis dataKey={xAxisKey} />
        <YAxis />
        {showGrid && <CartesianGrid strokeDasharray="3 3" />}
        <Tooltip />
        {areas.map((area, i) => (
          <Area
            key={area.dataKey + i}
            type={area.type ?? "monotone"}
            dataKey={area.dataKey}
            stroke={area.stroke}
            fill={area.fill}
            fillOpacity={area.fillOpacity ?? 1}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default AreaGraph;
