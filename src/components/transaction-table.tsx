import { Transaction } from "@/utils/parseTransactions";
import { Card, CardBody } from "@heroui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@heroui/table";
import { Icon } from "@iconify/react/dist/iconify.js";

interface TransactionTableProps {
  analysis: Transaction[];
}

function TransactionTable({ analysis }: TransactionTableProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    }).format(date);
  };

  return (
    <Card className="bg-bgSecondary ">
      <CardBody className="gap-4">
        <h2 className="flex items-center gap-2 text-xl font-semibold">
          <Icon icon="lucide:list" className="text-2xl text-primary" />
          Recent Transactions
        </h2>

        <Table
          aria-label="Transactions table"
          classNames={{
            wrapper: "max-h-[400px] bg-bg shadow-primaryDark",
          }}
        >
          <TableHeader className="bg-primary">
            <TableColumn className="bg-bgSecondary text-textSecondary">
              DATE
            </TableColumn>
            <TableColumn className="bg-bgSecondary">DESCRIPTION</TableColumn>
            <TableColumn className="bg-bgSecondary" align="end">
              AMOUNT
            </TableColumn>
            <TableColumn className="bg-bgSecondary" align="end">
              BALANCE
            </TableColumn>
          </TableHeader>
          <TableBody>
            {analysis.map((transaction) => (
              <TableRow key={transaction.transaction_no}>
                <TableCell>
                  {formatDate(String(transaction.transaction_date))}
                </TableCell>
                <TableCell>{transaction.details}</TableCell>
                {/* <TableCell>{transaction.category}</TableCell> */}
                <TableCell
                  className={`text-right ${
                    transaction.type === "CREDIT"
                      ? "text-success-500"
                      : "text-danger-500"
                  }`}
                >
                  {transaction.type === "CREDIT" ? "+" : "-"}
                  {Math.abs(transaction.amount).toFixed(2)}
                </TableCell>
                <TableCell>
                  {Math.abs(transaction.balance).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardBody>
    </Card>
  );
}

export default TransactionTable;
