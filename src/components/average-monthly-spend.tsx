import { useGetMonthlyAverageSpend } from "@/api/queries/payment";
import { Card, CardBody } from "@heroui/card";
import { Progress } from "@heroui/progress";
import { Icon } from "@iconify/react/dist/iconify.js";

export const AverageMonthlySpend = () => {
  const { data: monthlyAverage } = useGetMonthlyAverageSpend({});

  const isIncrease =
    monthlyAverage?.average_daily_spend || -1 > 0 ? true : false;

  return (
    <Card className="w-full h-full">
      <CardBody className="w-full h-full">
        <div className="flex flex-col h-full justify-center">
          <div className="flex flex-col items-center mb-3">
            <span className="text-default-500 text-sm mb-1">
              Average Daily Spend
            </span>
            <div className="text-4xl font-bold">
              ${Math.abs(monthlyAverage?.average_daily_spend || 0).toFixed(2)}
            </div>
            <div
              className={`flex items-center mt-2 ${isIncrease ? "text-danger" : "text-success"}`}
            >
              <Icon
                icon={
                  isIncrease ? "lucide:trending-up" : "lucide:trending-down"
                }
                className="mr-1"
              />
              <span className="text-sm font-medium">
                {Math.abs(monthlyAverage?.percentage_change || 0).toFixed(1)}%{" "}
                {isIncrease ? "increase" : "decrease"}
              </span>
            </div>
          </div>

          {/* <div className="mb-2 flex justify-between items-center">
            <span className="text-sm text-default-500">
              Budget Target: 124/day
            </span>
            <span className="text-sm font-medium">{23}%</span>
          </div> */}

          <Progress
            aria-label="Budget progress"
            value={Math.abs(monthlyAverage?.percentage_change || 0)}
            color={
              monthlyAverage?.percentage_change || 0 > 100
                ? "danger"
                : monthlyAverage?.percentage_change || 0 > 80
                  ? "warning"
                  : "success"
            }
            className="mb-4"
          />

          <div className="text-center text-sm text-default-500">
            Based on last 30 days
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
