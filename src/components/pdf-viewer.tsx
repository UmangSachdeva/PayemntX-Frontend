import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { ChevronLeft, ChevronRight, Landmark } from "lucide-react";
import { Card, CardBody } from "@heroui/card";

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PDFViewerProps {
  file: File;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ file }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  return (
    <Card className="w-full h-full shadow-sm rounded-2xl bg-bgSecondary">
      <CardBody>
        <div className="flex justify-between mb-4">
          <h2 className="flex items-center gap-2 text-xl font-semibold">
            <Landmark className="inline text-xl text-primary" /> Bank Statement
          </h2>
          <div className="flex items-center space-x-4">
            <button
              disabled={pageNumber <= 1}
              title="next"
              className="p-1 rounded hover:bg-gray-700 disabled:opacity-50"
              onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-sm text-textSecondary">
              Page {pageNumber} of {numPages || "--"}
            </span>
            <button
              disabled={pageNumber >= (numPages || 1)}
              title="prev"
              className="p-1 rounded hover:bg-gray-700 disabled:opacity-50"
              onClick={() =>
                setPageNumber((prev) => Math.min(prev + 1, numPages || prev))
              }
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="flex justify-center overflow-auto border shadow border-primary bg-bg rounded-xl">
          <Document
            file={file}
            className="max-w-full"
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page
              className="max-w-full"
              pageNumber={pageNumber}
              renderAnnotationLayer={false}
              renderTextLayer={false}
            />
          </Document>
        </div>
      </CardBody>
    </Card>
  );
};

export default PDFViewer;
