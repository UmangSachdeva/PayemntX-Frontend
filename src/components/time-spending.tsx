import { Card, CardBody, CardHeader } from "@heroui/card";
import { ScatterGraph } from "./scatter-graph";
import { useGetUserTimeSpending } from "@/api/queries/payment";
import { Skeleton } from "@heroui/skeleton";

export const TimeSpending = () => {
  const { data: timeSpending, isPending } = useGetUserTimeSpending();

  const timedata = timeSpending?.map((item) => ({
    ...item,
    amount: Math.abs(item.amount),
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

  if (!timedata || timedata.length === 0) {
    return (
      <Card>
        <CardHeader>
          <h1>Spending Time Analysis</h1>
        </CardHeader>
        <CardBody className="flex items-center justify-center h-[400px]">
          <span className="text-gray-500">No spending data available.</span>
        </CardBody>
      </Card>
    );
  }

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
