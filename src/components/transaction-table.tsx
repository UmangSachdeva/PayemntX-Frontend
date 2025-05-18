import { Transaction } from "@/utils/parseTransactions";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@heroui/table";

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
    <Table
      aria-label="Transactions table"
      classNames={{
        wrapper: "bg-bg shadow-primaryDark",
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
            <TableCell>{Math.abs(transaction.balance).toFixed(2)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default TransactionTable;
