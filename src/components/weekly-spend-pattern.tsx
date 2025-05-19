import { useGetWeeklyMonthlyPattern } from "@/api/queries/payment";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { LineGraph } from "./line-graph";
import { Skeleton } from "@heroui/skeleton";

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
  const { data: weeklyPattern, isPending } = useGetWeeklyMonthlyPattern({});

  const patterns = weeklyPattern?.map((item: any) => ({
    ...item,
    dayOfWeek: weeks[item.day_of_week - 1],
    total_spend: Math.abs(item?.total_spend),
  }));

  if (isPending) {
    return (
      <Card>
        <CardBody>
          <Skeleton className="h-[400px] w-full rounded-xl"></Skeleton>
        </CardBody>
      </Card>
    );
  }

  if (!patterns || patterns.length === 0) {
    return (
      <Card className="w-full h-full">
        <CardHeader>
          <h1>Monthly Spending Pattern</h1>
        </CardHeader>
        <CardBody className="flex items-center justify-center h-80">
          <span className="text-gray-500">
            No spending data available for this week.
          </span>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card className="w-full h-full">
      <CardHeader>
        <h1>Monthly Spending Pattern</h1>
      </CardHeader>
      <CardBody className="w-full h-80">
        <LineGraph
          width="100%"
          height="100%"
          data={patterns || []}
          xAxisKey="dayOfWeek"
          lines={[{ dataKey: "total_spend", stroke: "#1DCD9F" }]}
        />
      </CardBody>
    </Card>
  );
};
