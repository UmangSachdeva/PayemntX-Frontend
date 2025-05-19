import { AverageMonthlySpend } from "@/components/average-monthly-spend";
import { DebitVsCredit } from "@/components/debit-vs-credit";
import { MonthlySpends } from "@/components/monthly-spends";
import { TimeSpending } from "@/components/time-spending";
import { WeeklySpendPattern } from "@/components/weekly-spend-pattern";

function Analysis() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div className="sm:col-span-2 col-span-1">
        <MonthlySpends />
      </div>
      <div>
        <AverageMonthlySpend />
      </div>
      <div>
        <TimeSpending />
      </div>
      <div className="sm:col-span-2 col-span-1">
        <WeeklySpendPattern />
      </div>
      <div className="col-span-1 sm:col-span-2 lg:col-span-3">
        <DebitVsCredit />
      </div>
    </div>
  );
}

export default Analysis;
