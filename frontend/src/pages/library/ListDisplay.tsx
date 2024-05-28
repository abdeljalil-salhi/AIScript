// Dependencies
import { FC } from "react";
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
  } = useCustom<GetBooksByUserIdQuery>({
    url: API_URL,
    method: "post",
    meta: {
      gqlQuery: QUERY_GET_BOOKS_BY_USER_ID,
      variables: {
        userId: identity?.user.id,
      },
    },
  });

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
            <div className="min-w-[70px] min-h-[70px] h-[70px] w-[70px] rounded-lg overflow-hidden shadow-md bg-n-9/35">
              <img
                src={book.cover}
                alt={book.title}
                className="w-full h-full object-cover rounded-lg"
                draggable={false}
              />
            </div>
            <div className="w-2/3">
              <h3
                className="font-normal text-ellipsis whitespace-nowrap overflow-hidden text-n-1"
                title={book.title}
              >
                {book.title}
              </h3>
              <p
                className="text-xs text-n-4 text-ellipsis whitespace-nowrap overflow-hidden"
                title={book.topic}
              >
                {book.topic}
              </p>
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
