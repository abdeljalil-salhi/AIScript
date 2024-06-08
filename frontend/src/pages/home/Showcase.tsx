// Dependencies
import { FC } from "react";
import { Col, Row } from "antd";
import { UserOutlined } from "@ant-design/icons";

// Constants
import { showcaseItems } from "@/constants/home";
import { ShowcaseItem } from "@/constants/types";

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
  return (
    <section className="w-full">
      <h2 className="font-semibold text-2xl mb-5 font-['Poppins']">AIScript Showcase</h2>
      <Row gutter={[32, 0]}>
        {showcaseItems.map((showcaseItem: ShowcaseItem) => (
          <Col
            key={showcaseItem.id}
            xs={24}
            sm={24}
            xl={12}
            className="px-4 py-1.5"
          >
            <div className="flex flex-row items-center justify-start gap-3 bg-gradient-to-b from-n-7 to-n-9/35 hover:bg-gradient-to-r rounded-lg w-full h-full p-2 shadow-md cursor-pointer">
              <div className="min-w-[70px] min-h-[70px] h-[70px] w-[70px] rounded-lg overflow-hidden shadow-md">
                <img
                  src={showcaseItem.imageUrl}
                  alt={showcaseItem.title}
                  className="w-full h-full object-cover rounded-lg"
                  draggable={false}
                />
              </div>
              <div className="w-2/3 font-['Poppins']">
                <h3
                  className="font-normal text-base text-ellipsis whitespace-nowrap overflow-hidden"
                  title={showcaseItem.title}
                >
                  {showcaseItem.title}
                </h3>
                <h4 className="text-sm">
                    <UserOutlined className="mr-1" />
                    {showcaseItem.author}</h4>
                <p
                  className="text-sm text-n-4 text-ellipsis whitespace-nowrap overflow-hidden"
                  title={showcaseItem.description}
                >
                  {showcaseItem.description}
                </p>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </section>
  );
};
