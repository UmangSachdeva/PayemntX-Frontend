import {
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export type ScatterCellConfig = {
  getColor?: (entry: any, index: number) => string;
};

type ScatterGraphProps = {
  data: object[];
  xAxisKey: string;
  yAxisKey: string;
  xAxisProps?: object;
  yAxisProps?: object;
  tooltipFormatter?: (value: any, name: string, props: any) => [string, string];
  labelFormatter?: (label: string) => string;
  scatterName?: string;
  scatterFill?: string;
  scatterAnimationDuration?: number;
  scatterCellConfig?: ScatterCellConfig;
  showGrid?: boolean;
  height?: string | number;
  width?: string | number;
};

export const ScatterGraph = ({
  data,
  xAxisKey,
  yAxisKey,
  xAxisProps = {},
  yAxisProps = {},
  tooltipFormatter,
  labelFormatter,
  scatterName = "Spending Time",
  scatterFill = "#8884d8",
  scatterAnimationDuration = 1500,
  scatterCellConfig = {},
  showGrid = true,
  height = "100%",
  width = "100%",
}: ScatterGraphProps) => {
  const getColor = scatterCellConfig.getColor || (() => scatterFill);
  return (
    <ResponsiveContainer width={width} height={height}>
      <ScatterChart
        margin={{
          top: 10,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        {showGrid && <CartesianGrid strokeDasharray="3 3" />}
        <XAxis
          type="number"
          dataKey={xAxisKey}
          name={xAxisKey}
          {...xAxisProps}
        />
        <YAxis
          type="number"
          dataKey={yAxisKey}
          name={yAxisKey}
          {...yAxisProps}
        />
        <Tooltip
          formatter={tooltipFormatter}
          labelFormatter={labelFormatter}
          cursor={{ strokeDasharray: "3 3" }}
        />
        <Scatter
          name={scatterName}
          data={data}
          fill={scatterFill}
          animationDuration={scatterAnimationDuration}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={getColor(entry, index)} />
          ))}
        </Scatter>
      </ScatterChart>
    </ResponsiveContainer>
  );
};
