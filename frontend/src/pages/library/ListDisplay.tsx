// Dependencies
import { FC, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCustom, useGetIdentity } from "@refinedev/core";

// Assets
import EmptyBox from "@/assets/create/empty-box.png";
// GraphQL Queries
import { QUERY_GET_BOOKS_BY_USER_ID } from "@/graphql/queries/getBooksByUserId";
// GraphQL Types
import { GetBooksByUserIdQuery } from "@/graphql/types";
import { Book, MeResponse } from "@/graphql/schema.types";
// Providers
import { API_URL } from "@/providers";
import { EyeFilled } from "@ant-design/icons";
import { ws } from "@/sockets";

// Interfaces
interface ListDisplayProps {}

/**
 * ListDisplay Component
 *
 * @interface ListDisplayProps
 * @returns {JSX.Element} - ListDisplay Component
 * @exports ListDisplay
 */
export const ListDisplay: FC<ListDisplayProps> = (): JSX.Element => {
  /**
   * Get the user's identity
   * @type {MeResponse}
   */
  const { data: identity } = useGetIdentity<MeResponse>();

  /**
   * Get the books of the user
   * @type {GetBooksByUserIdQuery}
   */
  const {
    data: books,
    isLoading: isBooksLoading,
    isError: isBooksError,
    refetch: refetchBooks,
  } = useCustom<GetBooksByUserIdQuery>({
    url: API_URL,
    method: "post",
    meta: {
      gqlQuery: QUERY_GET_BOOKS_BY_USER_ID,
      variables: {
        userId: identity?.user.id,
      },
    },
    queryOptions: {
      enabled: !!identity,
    },
  });

  /**
   * Listen for book creation and refetch the books
   */
  useEffect(() => {
    ws.on("bookCreated", () => {
      refetchBooks();
    });
  }, [refetchBooks]);

  return (
    <div className="w-full h-full flex flex-col font-['Poppins']">
      {books && books.data.getBooksByUserId.length > 0 ? (
        books?.data.getBooksByUserId.map((book: Book) => (
          <Link
            key={book.id}
            to={`/view/${book.id}`}
            className="w-full flex flex-row items-center justify-start gap-3 bg-n-8 hover:bg-n-7 transition-all duration-200 p-2 cursor-pointer"
            draggable={false}
          >
            <div className="w-[70px] min-w-[70px] aspect-square rounded-lg overflow-hidden shadow-md bg-n-9/35">
              <img
                src={book.cover}
                alt={book.title}
                className="w-full h-full object-cover rounded-lg"
                draggable={false}
              />
            </div>
            <div className="flex-grow">
              <h3
                className="font-normal break-all overflow-hidden text-n-1"
                title={book.title}
              >
                {book.title}
              </h3>
              <p
                className="text-xs text-n-4 break-all overflow-hidden"
                title={book.topic}
              >
                {book.topic.length > 70 ? (
                  <>
                    {book.topic.slice(0, 70)}...
                    <span className="ml-1 text-[11px] text-n-4/60 cursor-pointer">
                      Read More
                    </span>
                  </>
                ) : (
                  book.topic
                )}
              </p>
            </div>
            <div className="flex items-center justify-center flex-row mx-3">
              <button className="flex items-center justify-center w-8 h-8 rounded-full bg-n-9/20 hover:bg-n-9/30 transition-all duration-200">
                <EyeFilled className="text-n-4 text-lg" />
              </button>
            </div>
          </Link>
        ))
      ) : (
        <div className="w-full h-full flex flex-col sm:flex-row items-center justify-center gap-3">
          <img
            src={EmptyBox}
            className="w-full max-w-15 aspect-square"
            alt="Empty Box"
            draggable={false}
          />
          <p className="text-start text-n-3/80 text-sm">
            {isBooksLoading
              ? "Loading your books..."
              : isBooksError
              ? "Something went wrong. Please try refreshing the page"
              : "It seems you haven't added any books yet."}
          </p>
        </div>
      )}
    </div>
  );
};
