import { Card, CardBody, CardHeader } from "@heroui/card";
import { ScatterGraph } from "./scatter-graph";
import { useGetUserTimeSpending } from "@/api/queries/payment";

export const TimeSpending = () => {
  const { data: timeSpending } = useGetUserTimeSpending();

  const timedata = timeSpending?.map((item) => ({
    ...item,
    amount: Math.abs(item.amount),
  }));

  return (
    <Card className="w-full h-full">
      <CardHeader>
        <h1>Spending Time Analysis</h1>
      </CardHeader>
      <CardBody className="w-full h-full">
        <ScatterGraph
          data={timedata || ([] as object[])}
          xAxisKey="hour"
          yAxisKey="amount"
          scatterFill="#1DCD9F"
        />
      </CardBody>
    </Card>
  );
};
