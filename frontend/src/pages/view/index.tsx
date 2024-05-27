// Dependencies
import { FC, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Spin } from "antd";
import useResizeObserver from "use-resize-observer";

// Dependency Styles
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";

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
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const { ref, width = 1, height = 1 } = useResizeObserver<HTMLDivElement>();

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  /**
   * Go to the previous page of the PDF
   * @returns {void}
   */
  const onPrevPage = (): void => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  /**
   * Go to the next page of the PDF
   * @returns {void}
   */
  const onNextPage = (): void => {
    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  return (
    <div
      ref={ref}
      className="w-full h-[calc(100vh-3.5rem)] md:h-screen flex flex-col items-center justify-start overflow-y-scroll overflow-x-hidden"
    >
      <Document
        loading={<Spin />}
        noData={<Spin />}
        file={{ url: "http://localhost:3000/book/the_joy_of_intimacy.pdf" }}
        onLoadSuccess={onDocumentLoadSuccess}
        className="relative"
      >
        <Page
          loading={<Spin />}
          pageNumber={pageNumber}
          height={width >= 625 ? height : undefined}
          width={
            width < 625 ? (width > 600 ? width - 120 : width) : undefined || 600
          }
          renderAnnotationLayer={true}
        />
        <div className="absolute z-[10] bottom-3.5 left-0 right-0 flex justify-center items-center text-n-1/85 text-xs font-light p-1">
          <div className="w-3/5 flex flex-row">
            <button
              type="button"
              className="w-full border-n-6/90 border-l border-t border-b text-base rounded-l-md bg-n-7/90 text-white px-4 py-1 cursor-pointer"
              onClick={onPrevPage}
            >
              <ArrowLeftOutlined />
            </button>
            <button
              type="button"
              className="w-full border-n-6/90 border text-sm font-medium bg-n-7/90 flex-grow text-white px-4 py-1"
            >
              {pageNumber} / {numPages}
            </button>
            <button
              type="button"
              className="w-full border-n-6/90 border-t border-b border-r text-base rounded-r-md bg-n-7/90 text-white px-4 py-1 cursor-pointer"
              onClick={onNextPage}
            >
              <ArrowRightOutlined />
            </button>
          </div>
        </div>
      </Document>
    </div>
  );
};
