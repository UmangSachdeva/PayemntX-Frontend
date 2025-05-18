export type GradientConfig = {
  id: string;
  color: string;
  stops?: { offset: string; opacity: number }[];
};

export type AreaConfig = {
  dataKey: string;
  stroke: string;
  fill: string; // should match gradient id
  fillOpacity?: number;
  type?: "monotone" | "basis" | "linear" | "step" | "stepBefore" | "stepAfter";
};

export type LineChartProps = {
  data: object[];
  gradients?: GradientConfig[];
  areas: AreaConfig[];
  xAxisKey?: string;
  showGrid?: boolean;
  height?: string | number;
  width?: string | number;
};

export type BarConfig = {
  dataKey: string;
  name?: string;
  fill?: string;
  radius?: [number, number, number, number];
  animationDuration?: number;
};

export type LineConfig = {
  dataKey: string;
  stroke?: string;
  strokeWidth?: number;
  dot?: object | boolean;
  activeDot?: object | boolean;
  animationDuration?: number;
  type?: "monotone" | "linear" | "basis" | "step" | "stepBefore" | "stepAfter";
};
