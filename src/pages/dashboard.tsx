// import React from "react";
import { useDropzone } from "react-dropzone";
import {
  FileUp,
  PieChart,
  DollarSign,
  TrendingUp,
  FileText,
} from "lucide-react";
import { useCallback, useState } from "react";
import PDFViewer from "@/components/pdf-viewer";
import ExtractedText from "@/components/extracted-text";
import { Card } from "@heroui/card";

function Dashboard() {
  const [file, setFile] = useState<File | null>(null);
  const [_, setIsAnalyzing] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles[0]) {
      setFile(acceptedFiles[0]);
      setIsAnalyzing(true);
      // Simulate analysis
      setTimeout(() => setIsAnalyzing(false), 2000);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
  });

  return (
    <main className="flex-1 p-4 sm:p-6 lg:p-8">
      {!file ? (
        <div className="text-center">
          <div className="space-y-6">
            <div className="flex justify-center">
              <FileUp className="w-12 h-12 text-primary" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-primary">
                Upload Your Bank Statement
              </h2>
              <p className="text-textSecondary">
                Upload your PDF bank statement to get detailed insights
              </p>
            </div>
            <div
              {...getRootProps()}
              className={`bg-bgSecondary max-w-xl mx-auto border-2 border-dashed rounded-lg p-12 cursor-pointer transition-colors ${
                isDragActive
                  ? "border-primary hover:border-primaryDark"
                  : "border-primary hover:border-primaryDark"
              }`}
            >
              <input {...getInputProps()} />
              <div className="space-y-4">
                <div className="flex justify-center">
                  <FileText className="w-8 h-8 text-textPrimary" />
                </div>
                <p className="text-center text-textPrimary ">
                  {isDragActive
                    ? "Drop your PDF here"
                    : "Drag & drop your PDF here, or click to select"}
                </p>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 gap-8 mt-16 sm:grid-cols-3">
            <Card className="p-6 bg-bgSecondary">
              <DollarSign className="w-8 h-8 text-primary" />
              <h3 className="mt-4 text-lg font-medium text-textPrimary">
                Expense Tracking
              </h3>
              <p className="mt-2 text-textSecondary">
                Automatically categorize and track your expenses
              </p>
            </Card>
            <Card className="p-6 bg-bgSecondary">
              <PieChart className="w-8 h-8 text-primary" />
              <h3 className="mt-4 text-lg font-medium text-Primary">
                Visual Analytics
              </h3>
              <p className="mt-2 text-textSecondary">
                Get insights through interactive charts and graphs
              </p>
            </Card>
            <Card className="p-6 bg-bgSecondary">
              <TrendingUp className="w-8 h-8 text-primary" />
              <h3 className="mt-4 text-lg font-medium text-textPrimary">
                Spending Patterns
              </h3>
              <p className="mt-2 text-textSecondary">
                Identify trends and optimize your spending
              </p>
            </Card>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center w-full h-full gap-4">
          <PDFViewer file={file} />
          <ExtractedText setFile={setFile} file={file} />
          {/* <AnalysisPanel isAnalyzing={isAnalyzing} /> */}
        </div>
      )}
    </main>
  );
}

export default Dashboard;
