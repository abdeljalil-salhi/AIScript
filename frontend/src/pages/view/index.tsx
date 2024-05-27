// Dependencies
import { FC, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Spin } from "antd";
import useResizeObserver from "use-resize-observer";

import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

// Interfaces
interface ViewPageProps {}

/**
 * Set the PDF worker source to the CDN
 * @type {string}
 */
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

/**
 * View Page Component
 *
 * @interface ViewPageProps
 * @returns {JSX.Element} - ViewPage Component
 * @exports ViewPage
 */
export const ViewPage: FC<ViewPageProps> = (): JSX.Element => {
  const [_, setNumPages] = useState<number>(0);
  const { ref, width = 1, height = 1 } = useResizeObserver<HTMLDivElement>();

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  console.log("width: ", width);

  console.log("height: ", height);

  return (
    <div
      ref={ref}
      className="w-full h-[calc(100vh-3.5rem)] md:h-screen flex flex-col items-center justify-start overflow-y-scroll overflow-x-hidden"
    >
      <Document
        loading={<Spin />}
        noData={<Spin />}
        file="https://www.abdel.codes/assets/cv_abdeljalilsalhi.pdf"
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page
          loading={<Spin />}
          pageNumber={1}
          height={width >= 625 ? height : undefined}
          width={
            width < 625 ? (width > 600 ? width - 120 : width) : undefined || 600
          }
          renderAnnotationLayer={false}
        />
      </Document>
    </div>
  );
};
