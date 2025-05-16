import {
  //   extractTransactions,
  parseKotakStatement,
  Transaction,
} from "@/utils/parseTransactions";
import React, { useEffect } from "react";
import { pdfjs } from "react-pdf";
import TransactionTable from "./transaction-table";
import { Button } from "@heroui/button";
import { Database, UploadCloud } from "lucide-react";
import { useAddTransaction } from "@/api/mutations/payment";
import { CircularProgress } from "@heroui/progress";
import { addToast } from "@heroui/toast";
import { Card, CardBody } from "@heroui/card";
import { Icon } from "@iconify/react/dist/iconify.js";

interface ExtractedTextProps {
  file: File;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
}

const ExtractedText: React.FC<ExtractedTextProps> = ({ file, setFile }) => {
  const [extractedText, setExtractedText] = React.useState<string | null>(null);
  const [transactions, setTransactions] = React.useState<Transaction[]>([]);
  const {
    mutate: addTransaction,
    isPending: additionPending,
    isSuccess: additionSuccess,
  } = useAddTransaction();

  const extractTextAndUpload = async () => {
    try {
      // 1. Read PDF as ArrayBuffer
      const arrayBuffer = await file.arrayBuffer();

      // 2. Extract Text
      const pdf = await pdfjs.getDocument(arrayBuffer).promise;
      let fullText = "";

      // Extract text from each page
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();

        fullText += content.items
          .map((item) => ("str" in item ? item.str : ""))
          .join(" ");
      }

      setExtractedText(fullText);

      // 3. (Optional) Parse Transactions
      const transactionParse: Transaction[] = parseKotakStatement(fullText);

      setTransactions(transactionParse);
    } catch (error) {
      console.error("Error parsing PDF:", error);
    }
  };

  const handleUploadToDatabase = () => {
    if (!additionPending) {
      addTransaction(transactions);
    }
  };

  const handleReset = () => {
    setExtractedText(null);
    setTransactions([]);
    setFile(null);
  };

  useEffect(() => {
    if (file && !extractedText) {
      extractTextAndUpload();
    }
  }, [file]);

  useEffect(() => {
    if (additionSuccess) {
      addToast({
        title: "Transaction Saved !!",
        description: "Transaction saved successfully",
        color: "success",
      });
      handleReset();
    }
  }, [additionSuccess]);

  return (
    <div>
      <Card className="bg-bgSecondary ">
        <CardBody className="gap-4">
          <h2 className="flex items-center gap-2 text-xl font-semibold">
            <Icon icon="lucide:list" className="text-2xl text-primary" />
            Recent Transactions
          </h2>
          <TransactionTable analysis={transactions} />
        </CardBody>
      </Card>

      <div className="flex justify-center gap-4 mt-4">
        <Button className="bg-primary text-bg" onPress={handleUploadToDatabase}>
          {" "}
          {additionPending ? (
            <CircularProgress size="sm" />
          ) : (
            <Database className="text-lg" />
          )}{" "}
          Upload to Database
        </Button>
        <Button
          className="border-primary hover:border-primaryDark"
          variant="bordered"
          onPress={handleReset}
        >
          {" "}
          <UploadCloud className="text-lg" /> Upload another Statement
        </Button>
      </div>
    </div>
  );
};

export default ExtractedText;
