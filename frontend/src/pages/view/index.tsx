// Dependencies
import { FC, useMemo, useState } from "react";
import { Spin } from "antd";
import { Document, Page, pdfjs } from "react-pdf";
import useResizeObserver from "use-resize-observer";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  FilePdfFilled,
  FileWordFilled,
  PrinterFilled,
} from "@ant-design/icons";

// Dependency Styles
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

  function downloadFile(url) {
    // Create a new anchor element
    const link = document.createElement("a");
    link.href = url;

    // Extract the file name from the URL
    const fileName = url.substring(url.lastIndexOf("/") + 1);

    // Set the download attribute with the file name
    link.download = fileName;

    // Set the target attribute to "_blank" to open the file in a new tab
    link.target = "_blank";

    // Append the anchor element to the document body
    document.body.appendChild(link);

    // Programmatically click the anchor element to trigger the download
    link.click();

    // Remove the anchor element from the document body
    document.body.removeChild(link);
  }

  const memoizedFile = useMemo(
    () => ({
      url: "http://localhost:3000/book/the_joy_of_intimacy.pdf",
    }),
    []
  );

  return (
    <div
      ref={ref}
      className="w-full h-[calc(100vh-3.5rem)] md:h-screen flex flex-col items-center justify-start overflow-y-scroll overflow-x-hidden"
    >
      <div className="w-full bg-n-7 flex flex-col font-['Poppins']">
        <div className="w-full border-n-6/90 border border-l-0">
          <h3 className="text-white text-start text-2xl font-medium px-2 pt-2">
            The Joy of Intimacy
          </h3>
          <p
            className="hidden sm:block text-xs text-n-1/85 text-start font-light p-2 pt-0"
            title="The Joy of Intimacy is a book that explores the importance of intimacy in relationships. It is a guide to help couples build stronger connections and improve their relationships. The book covers topics such as communication, trust, and emotional intimacy. It also provides practical tips and exercises to help couples deepen their connection and create a more fulfilling relationship."
          >
            {"The Joy of Intimacy is a book that explores the importance of intimacy in relationships. It is a guide to help couples build stronger connections and improve their relationships. The book covers topics such as communication, trust, and emotional intimacy. It also provides practical tips and exercises to help couples deepen their connection and create a more fulfilling relationship.".slice(
              0,
              100
            ) + "..."}
          </p>
          <p className="block sm:hidden text-xs text-n-1/85 font-light p-2 pt-0 text-justify">
            The Joy of Intimacy is a book that explores the importance of
            intimacy in relationships. It is a guide to help couples build
            stronger connections and improve their relationships. The book
            covers topics such as communication, trust, and emotional intimacy.
            It also provides practical tips and exercises to help couples deepen
            their connection and create a more fulfilling relationship.
          </p>
        </div>
        <div className="w-full flex flex-row">
          <div className="w-1/2 flex flex-row">
            <button
              type="button"
              className="w-1/4 border-n-6/90 border-b border-r text-base bg-n-7/90 hover:bg-n-6/60 transition-all ease-in-out duration-300 text-white px-4 py-1 cursor-pointer"
              onClick={onPrevPage}
            >
              <ArrowLeftOutlined />
            </button>
            <button
              type="button"
              className="w-2/4 border-n-6/90 border-b text-sm font-medium bg-n-7/90 text-white px-4 py-1 cursor-default"
            >
              {pageNumber} / {numPages}
            </button>
            <button
              type="button"
              className="w-1/4 border-n-6/90 border-l border-b border-r text-base bg-n-7/90 hover:bg-n-6/60 transition-all ease-in-out duration-300 text-white px-4 py-1 cursor-pointer"
              onClick={onNextPage}
            >
              <ArrowRightOutlined />
            </button>
          </div>
          <div className="w-1/2 flex flex-row border-r border-n-6/90">
            <button
              className="flex flex-row items-center justify-center gap-1.5 flex-grow border-r border-n-6/90 hover:bg-n-6/60 transition-all ease-in-out duration-300"
              title="Download the book in PDF format"
              onClick={() =>
                downloadFile(
                  "http://localhost:3000/book/the_joy_of_intimacy.pdf"
                )
              }
            >
              <FilePdfFilled className="text-lg -mt-0.5" />
              Get PDF
            </button>
            <button
              className="flex flex-row items-center justify-center gap-1.5 flex-grow border-r border-n-6/90 hover:bg-n-6/60 transition-all ease-in-out duration-300"
              title="Download the book in DOCX format"
              onClick={() =>
                downloadFile(
                  "http://localhost:8000/media/docs/the_joy_of_intimacy.docx"
                )
              }
            >
              <FileWordFilled className="text-lg -mt-0.5" />
              Get DOCX
            </button>
            <button
              className="flex flex-row items-center justify-center gap-1.5 flex-grow hover:bg-n-6/60 transition-all ease-in-out duration-300"
              onClick={() => {}}
            >
              <PrinterFilled className="text-lg" />
              Print
            </button>
          </div>
        </div>
      </div>
      <Document
        loading={<Spin />}
        noData={<Spin />}
        file={memoizedFile}
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
        <div className="hidden sm:flex absolute z-[10] bottom-3.5 left-0 right-0 justify-center items-center text-n-1/85 text-xs font-light p-1">
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
