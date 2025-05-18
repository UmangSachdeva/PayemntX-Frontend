import { AverageMonthlySpend } from "@/components/average-monthly-spend";
import { DebitVsCredit } from "@/components/debit-vs-credit";
import { MonthlySpends } from "@/components/monthly-spends";
import { TimeSpending } from "@/components/time-spending";
import { WeeklySpendPattern } from "@/components/weekly-spend-pattern";

function Analysis() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="col-span-1 md:col-span-2">
        <MonthlySpends />
      </div>
      <div>
        <AverageMonthlySpend />
      </div>
      <div>
        <TimeSpending />
      </div>
      <div className="col-span-2">
        <WeeklySpendPattern />
      </div>
      <div className="col-span-3">
        <DebitVsCredit />
      </div>
    </div>
  );
}

export default Analysis;
