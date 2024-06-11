// Dependencies
import { FC } from "react";
import { Col, Row, Spin } from "antd";
import { Link } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { useCustom } from "@refinedev/core";

// GraphQL Queries
import { QUERY_GET_SHOWCASE_BOOKS } from "@/graphql/queries/getShowcaseBooks";
// GraphQL Types
import { GetShowcaseBooksQuery } from "@/graphql/types";
// Providers
import { API_URL } from "@/providers";

// Interfaces
interface ShowcaseProps {}

/**
 * Showcase Component
 *
 * @interface ShowcaseProps
 * @returns {JSX.Element} - Showcase Component
 * @exports Showcase
 */
export const Showcase: FC<ShowcaseProps> = (): JSX.Element => {
  const {
    data: showcaseItems,
    isLoading: isShowcaseLoading,
    isError: isShowcaseError,
  } = useCustom<GetShowcaseBooksQuery>({
    url: API_URL,
    method: "post",
    meta: {
      gqlQuery: QUERY_GET_SHOWCASE_BOOKS,
    },
  });

  return (
    <section className="w-full">
      <h2 className="font-semibold text-2xl mb-5 font-['Poppins']">
        AIScript Showcase
      </h2>
      <Row gutter={[32, 0]}>
        {isShowcaseLoading ? (
          <Col xs={24} className="px-4 py-1.5">
            <Spin />
          </Col>
        ) : isShowcaseError ? (
          <Col xs={24} className="px-4 py-1.5">
            <div className="flex items-center justify-center w-full h-full p-2 bg-n-7/10 text-n-7 rounded-lg">
              <p>Failed to load showcase items.</p>
            </div>
          </Col>
        ) : (
          showcaseItems?.data.getShowcaseBooks.map((showcaseItem) => (
            <Col
              key={showcaseItem.id}
              xs={24}
              sm={24}
              xl={12}
              className="px-4 py-1.5"
            >
              <Link
                to={`/view/${showcaseItem.id}`}
                className="flex flex-row items-center justify-start gap-3 bg-gradient-to-b from-n-7 to-n-9/35 hover:bg-gradient-to-r rounded-lg w-full h-full p-2 shadow-md cursor-pointer"
                draggable={false}
              >
                <div className="min-w-[70px] min-h-[70px] h-[70px] w-[70px] rounded-lg overflow-hidden shadow-md">
                  <img
                    src={showcaseItem.cover}
                    alt={showcaseItem.title}
                    className="w-full h-full object-cover rounded-lg"
                    referrerPolicy="no-referrer"
                    draggable={false}
                  />
                </div>
                <div className="w-2/3 font-['Poppins']">
                  <h3
                    className="font-normal text-n-1/90 text-base text-ellipsis whitespace-nowrap overflow-hidden"
                    title={showcaseItem.title}
                  >
                    {showcaseItem.title}
                  </h3>
                  <h4 className="text-sm text-n-1/90">
                    <UserOutlined className="mr-1" />
                    {showcaseItem.author}
                  </h4>
                  <p
                    className="text-sm text-n-4 text-ellipsis whitespace-nowrap overflow-hidden"
                    title={showcaseItem.topic}
                  >
                    {showcaseItem.topic}
                  </p>
                </div>
              </Link>
            </Col>
          ))
        )}
      </Row>
    </section>
  );
};
