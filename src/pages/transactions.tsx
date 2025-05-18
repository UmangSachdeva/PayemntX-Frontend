import { Divider } from "@heroui/divider";
import { Input } from "@heroui/input";
import { Skeleton } from "@heroui/skeleton";
import { Search } from "lucide-react";
import TransactionTable from "@/components/transaction-table";
import { useGetUserTransactions } from "@/api/queries/payment";
import { Pagination } from "@heroui/pagination";
import { useState } from "react";

function Transactions() {
  const [page, setPage] = useState<number>(1);

  const { data: analysis, isLoading: transactionLoading } =
    useGetUserTransactions({
      page: page,
      limit: 10,
    });

  return (
    <div>
      {/* Topbar for transaction - Title, search bar and filters */}
      <div className="flex flex-col gap-4">
        <div>
          <p className="text-2xl">Transactions</p>
        </div>
        <div>
          {/* Search Bar and filter */}

          <Input
            labelPlacement="outside"
            placeholder="Search"
            radius="full"
            startContent={
              <Search className="flex-shrink-0 text-2xl pointer-events-none text-default-400" />
            }
            type="search"
            variant="bordered"
          />
        </div>

        <Divider />

        {transactionLoading ? (
          <Skeleton className="rounded-lg">
            <div className="h-[400px] rounded-lg bg-default-300" />
          </Skeleton>
        ) : (
          <TransactionTable analysis={analysis?.data || []} />
        )}

        <div className="flex justify-center items-center mt-4 w-full">
          <Pagination
            showControls
            initialPage={page}
            total={Math.ceil((analysis?.total || 0) / (analysis?.limit || 1))}
            // total={10}
            onChange={(page) => setPage(page)}
          />
        </div>
      </div>
    </div>
  );
}

export default Transactions;
