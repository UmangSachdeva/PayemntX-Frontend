import { useGetMonthlySpends } from "@/api/queries/payment";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { BarChartComponent } from "./bar-chart";
import { useState } from "react";

export const MonthlySpends = () => {
  const [type, setType] = useState<"DEBIT" | "CREDIT">("DEBIT");

  const { data: debittransactions } = useGetMonthlySpends({
    type: type,
  });

  // Month number to short name
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const labelFormatter = (label: string | number) => {
    const monthIndex = Number(label) - 1;
    return monthIndex >= 0 && monthIndex < 12
      ? monthNames[monthIndex]
      : String(label);
  };

  // Ensure all amounts are absolute values
  const chartData = debittransactions?.map((item: any) => ({
    ...item,
    month: labelFormatter(item.month),
    total_spend:
      type == "DEBIT"
        ? Math.abs(item.total_spend.toFixed(2))
        : item.total_spend.toFixed(2),
  }));

  return (
    <Card>
      <CardHeader>
        <h1>Monthly Spends</h1>
      </CardHeader>
      <CardBody className="h-[400px] w-full">
        <BarChartComponent
          xAxisKey="month"
          key=""
          bars={[
            {
              dataKey: "total_spend",
              name: "Monthly Expense",
              fill: "#1DCD9F",
              radius: [4, 4, 0, 0],
              animationDuration: 1500,
            },
          ]}
          data={chartData || []}
          labelFormatter={labelFormatter}
        />
      </CardBody>
    </Card>
  );
};
