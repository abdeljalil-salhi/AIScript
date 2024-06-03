// Dependencies
import useResizeObserver from "use-resize-observer";
import { FC, useEffect, useMemo, useState } from "react";
import { Spin } from "antd";
import { Helmet } from "react-helmet-async";
import { Document, Page, pdfjs } from "react-pdf";
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CheckOutlined,
  CloseOutlined,
  DeleteFilled,
  FilePdfFilled,
  FileWordFilled,
  PrinterFilled,
} from "@ant-design/icons";
import { useCustom, useCustomMutation } from "@refinedev/core";
import { useDocumentTitle } from "@refinedev/react-router-v6";

// Dependency Styles
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

// GraphQL Queries
import { QUERY_GET_BOOK_BY_ID } from "@/graphql/queries/getBookById";
// GraphQL Types
import { DeleteBookByIdMutation, GetBookByIdQuery } from "@/graphql/types";
// Providers
import { API_URL } from "@/providers";
// Pages
import { LoadingPage } from "../loading";
import { MUTATION_DELETE_BOOK_BY_ID } from "@/graphql/mutations/deleteBookById";

// Interfaces
interface ViewPageProps {}

interface ViewPageParams {
  // Book ID from the URL
  bookId: string;
  // Allow for other params
  [key: string]: string | undefined;
}

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
  /**
   * The number of pages in the PDF
   * @type {number}
   * @default 1
   */
  const [numPages, setNumPages] = useState<number>(1);
  /**
   * The current page number
   * @type {number}
   * @default 1
   */
  const [pageNumber, setPageNumber] = useState<number>(1);
  /**
   * The confirmation state for deleting a book
   * @type {boolean}
   * @default false
   */
  const [isConfirmDelete, setIsConfirmDelete] = useState<boolean>(false);

  /**
   * Navigate function for redirecting to other pages
   * @type {NavigateFunction}
   * @function
   */
  const navigate: NavigateFunction = useNavigate();

  /**
   * Get the book ID from the URL
   */
  const { bookId }: Readonly<Partial<ViewPageParams>> =
    useParams<ViewPageParams>();

  /**
   * Get the book by its ID
   * @type {GetBookByIdQuery}
   */
  const {
    data: book,
    isLoading: isBookLoading,
    isError: isBookError,
  } = useCustom<GetBookByIdQuery>({
    url: API_URL,
    method: "post",
    meta: {
      gqlQuery: QUERY_GET_BOOK_BY_ID,
      variables: {
        bookId,
      },
    },
  });

  /**
   * Delete a book by its ID
   * @type {DeleteBookByIdMutation}
   */
  const {
    mutate: deleteBook,
    isLoading: isDeleteLoading,
    isError: isDeleteError,
    data: deleteBookData,
  } = useCustomMutation<DeleteBookByIdMutation>();

  /**
   * The reference to the PDF container element and its dimensions (width and height)
   * @type {RefObject<HTMLDivElement>}
   * @exports ref - The reference to the PDF container element
   * @exports width - The width of the PDF container element
   * @exports height - The height of the PDF container element
   */
  const { ref, width = 1, height = 1 } = useResizeObserver<HTMLDivElement>();

  /**
   * Set the number of pages in the PDF
   * @param {number} numPages - The number of pages in the PDF
   * @returns {void}
   */
  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }): void => {
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

  /**
   * Download a file from a URL
   * @param {string} url - The URL of the file to download
   * @returns {void}
   */
  const downloadFile = (url: string): void => {
    // Create a new anchor element
    const link: HTMLAnchorElement = document.createElement("a");
    link.href = url;

    // Extract the file name from the URL
    const fileName: string = url.substring(url.lastIndexOf("/") + 1);

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
  };

  /**
   * The memoized file object
   * @type {{ url: string }}
   * @default {url:"http://localhost:3000/book/the_joy_of_intimacy.pdf"}
   */
  const memoizedFile: { url: string } = useMemo(
    () => ({
      url: book && book.data.getBookById ? book.data.getBookById.pdf : "",
    }),
    [book]
  );

  /**
   * Delete the book
   * @returns {void}
   */
  const deleteFile = (): void => {
    if (isDeleteLoading || isBookLoading || !book || !book.data.getBookById)
      return;

    deleteBook({
      url: API_URL,
      method: "post",
      meta: {
        gqlMutation: MUTATION_DELETE_BOOK_BY_ID,
        variables: {
          bookId,
        },
      },
      values: {},
    });
  };

  /**
   * Effect to navigate to the 404 page if the book is not found
   * or if there is an error fetching the book
   * Effect to navigate to the library page if the book is deleted
   */
  useEffect(() => {
    // If the book is not found or there is an error fetching the book, navigate to the 404 page
    if (!isBookLoading && (isBookError || !book.data.getBookById))
      navigate("/404", { replace: true });

    // If the book is deleted, navigate to the library page
    if (!isDeleteError && deleteBookData)
      navigate("/library", { replace: true });
  }, [
    isBookLoading,
    isBookError,
    book,
    navigate,
    deleteBookData,
    isDeleteError,
  ]);

  useDocumentTitle(
    `AIScript - ${
      isBookLoading || !book || !book.data.getBookById
        ? "View Book"
        : book.data.getBookById.title
    }`
  );

  return (
    <>
      <Helmet>
        <title>
          AIScript -{" "}
          {isBookLoading || !book || !book.data.getBookById
            ? "View Book"
            : book.data.getBookById.title}
        </title>
        <meta
          name="description"
          content={
            isBookLoading || !book || !book.data.getBookById
              ? "View a book on AIScript"
              : book.data.getBookById.topic.length > 200
              ? book.data.getBookById.topic.slice(0, 200) + "..."
              : book.data.getBookById.topic
          }
        />
      </Helmet>

      {isBookLoading || !book || !book.data.getBookById ? (
        <LoadingPage />
      ) : (
        <div
          ref={ref}
          className="w-full h-[calc(100vh-3.5rem)] md:h-screen flex flex-col items-center justify-start overflow-y-scroll overflow-x-hidden"
        >
          <div className="w-full bg-n-7 flex flex-col font-['Poppins']">
            <div className="w-full border-n-6/90 border border-l-0">
              <h3 className="text-white text-start text-2xl font-medium px-2 pt-2">
                {book.data.getBookById.title}
              </h3>

              <p
                className="text-xs text-n-1/85 font-light p-2 pt-0 text-justify"
                title={
                  book.data.getBookById.topic.length >
                  (width < 625 ? 200 : width < 1024 ? 400 : 600)
                    ? book.data.getBookById.topic
                    : ""
                }
              >
                {book.data.getBookById.topic.slice(
                  0,
                  width < 625 ? 200 : width < 1024 ? 400 : 600
                )}
                {book.data.getBookById.topic.length >
                  (width < 625 ? 200 : width < 1024 ? 400 : 600) && "..."}
              </p>
            </div>

            <div className="w-full flex flex-col sm:flex-row">
              <div className="w-full sm:w-1/2 flex flex-row h-8 justify-center items-center">
                <button
                  type="button"
                  className="w-1/4 h-full border-n-6/90 border-b border-r text-base bg-n-7/90 hover:bg-n-6/60 transition-all ease-in-out duration-300 text-white px-4 cursor-pointer"
                  onClick={onPrevPage}
                >
                  <ArrowLeftOutlined />
                </button>

                <button
                  type="button"
                  className="w-2/4 h-full border-n-6/90 border-b text-sm font-medium bg-n-7/90 text-white px-4 cursor-default"
                >
                  {pageNumber} / {numPages}
                </button>

                <button
                  type="button"
                  className="w-1/4 h-full border-n-6/90 border-l border-b border-r text-base bg-n-7/90 hover:bg-n-6/60 transition-all ease-in-out duration-300 text-white px-4 cursor-pointer"
                  onClick={onNextPage}
                >
                  <ArrowRightOutlined />
                </button>
              </div>

              <div className="w-full sm:w-1/2 flex flex-row border-r border-b border-n-6/90 h-8 justify-center items-center">
                <button
                  className="flex h-full flex-row items-center justify-center gap-1.5 flex-grow border-r border-n-6/90 hover:bg-n-6/60 transition-all ease-in-out duration-300"
                  title="Download the book in PDF format"
                  onClick={() => downloadFile(book.data.getBookById!.pdf)}
                >
                  <FilePdfFilled className="text-lg -mt-0.5" />
                  Get PDF
                </button>

                <button
                  className="flex h-full flex-row items-center justify-center gap-1.5 flex-grow border-r border-n-6/90 hover:bg-n-6/60 transition-all ease-in-out duration-300"
                  title="Download the book in DOCX format"
                  onClick={() => downloadFile(book.data.getBookById!.document)}
                >
                  <FileWordFilled className="text-lg -mt-0.5" />
                  Get DOCX
                </button>

                <button
                  className="flex h-full flex-row items-center justify-center gap-1.5 flex-grow border-r border-n-6/90 hover:bg-n-6/60 transition-all ease-in-out duration-300"
                  onClick={() => window.print()}
                >
                  <PrinterFilled className="text-lg" />
                  Print
                </button>

                <div className="flex h-full flex-row items-center justify-center flex-grow">
                  {isConfirmDelete ? (
                    <>
                      <button
                        className="flex-grow h-full flex items-center justify-center hover:bg-green-500/20 transition-all ease-in-out duration-300"
                        onClick={deleteFile}
                      >
                        <CheckOutlined className="text-green-500" />
                      </button>
                      <button
                        className="flex-grow h-full flex items-center justify-center hover:bg-red-500/20 transition-all ease-in-out duration-300 border-l border-n-6/90"
                        onClick={() => setIsConfirmDelete(false)}
                      >
                        <CloseOutlined className="text-red-500" />
                      </button>
                    </>
                  ) : (
                    <button
                      className="w-full h-full flex items-center justify-center hover:bg-n-6/60 transition-all ease-in-out duration-300"
                      onClick={() => setIsConfirmDelete(true)}
                    >
                      <DeleteFilled className="text-lg" />
                    </button>
                  )}
                </div>
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
                width < 625
                  ? width > 600
                    ? width - 120
                    : width
                  : undefined || 600
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
      )}
    </>
  );
};
