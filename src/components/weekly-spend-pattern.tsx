import { useGetWeeklyMonthlyPattern } from "@/api/queries/payment";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { LineGraph } from "./line-graph";

const weeks = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const WeeklySpendPattern = () => {
  const { data: weeklyPattern } = useGetWeeklyMonthlyPattern({});

  const patterns = weeklyPattern?.map((item: any) => ({
    ...item,
    dayOfWeek: weeks[item.day_of_week - 1],
    total_spend: Math.abs(item?.total_spend),
  }));

  return (
    <Card className="w-full h-full">
      <CardHeader>
        <h1>Monthly Spending Pattern</h1>
      </CardHeader>
      <CardBody className="w-full h-80">
        <LineGraph
          width="100%"
          height="100%"
          data={patterns}
          xAxisKey="dayOfWeek"
          lines={[{ dataKey: "total_spend", stroke: "#1DCD9F" }]}
        />
      </CardBody>
    </Card>
  );
};
