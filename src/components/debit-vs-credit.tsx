import { Card, CardBody, CardHeader } from "@heroui/card";
import { BarChartComponent } from "./bar-chart";
import { useGetUserDebitVsCredit } from "@/api/queries/payment";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "April",
  "May",
  "Jun",
  "Jul",
  "Sep",
  "Oct",
  "Nov",
];

export const DebitVsCredit = () => {
  const { data: debitvscredit, isPending } = useGetUserDebitVsCredit({});

  const debitvscreditparsed = debitvscredit?.results.map((item) => ({
    ...item,
    debit: Math.abs(item.debit),
    month: months[item.month - 1],
  }));

  return (
    <Card className="w-full h-full">
      <CardHeader>
        <h1>Monthly Debit Vs Credit</h1>
      </CardHeader>
      <CardBody className="w-full h-80">
        {isPending ? (
          <></>
        ) : (
          <BarChartComponent
            xAxisKey="month"
            data={(debitvscreditparsed || []) as object[]}
            bars={[
              {
                dataKey: "debit",
                name: "Debits",
                fill: "hsl(var(--heroui-danger-500))",
                radius: [4, 4, 0, 0],
                animationDuration: 1500,
              },
              {
                dataKey: "credit",
                name: "Credits",
                fill: "hsl(var(--heroui-success-500))",
                radius: [4, 4, 0, 0],
                animationDuration: 1500,
              },
            ]}
          />
        )}
      </CardBody>
    </Card>
  );
};
