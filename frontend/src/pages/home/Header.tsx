// Dependencies
import { ChangeEvent, FC, useState } from "react";
import { Col, Row } from "antd";
import { ArrowDownOutlined } from "@ant-design/icons";

// Constants
import { suggestions } from "@/constants/home";
import { Suggestion } from "@/constants/types";

// Interfaces
interface HeaderProps {}

/**
 * Header Component
 *
 * @interface HeaderProps
 * @returns {JSX.Element} - Header Component
 * @exports Header
 */
export const Header: FC<HeaderProps> = (): JSX.Element => {
  const [topic, setTopic] = useState<string>("");

  return (
    <header className="w-full">
      <h2 className="font-semibold text-2xl mb-5">
        Make an e-book about anything
      </h2>
      <Row gutter={[32, 0]}>
        {suggestions.map((suggestion: Suggestion) => (
          <Col
            key={suggestion.id}
            xs={24}
            sm={24}
            xl={8}
            className="px-4 py-1.5"
          >
            <div
              className="flex flex-row gap-3 items-center justify-between bg-gradient-to-b from-n-7 to-n-9/35 hover:bg-gradient-to-r rounded-lg w-full h-full p-4 shadow-md cursor-pointer hover:shadow-lg transition duration-300 ease-in-out hover:-translate-y-1"
              onClick={() => setTopic(suggestion.content)}
            >
              <div className="text-base">{suggestion.content}</div>
              <ArrowDownOutlined className="text-n-4 text-2xl" />
            </div>
          </Col>
        ))}
      </Row>
      <Row gutter={[32, 0]} className="">
        <Col xs={24} sm={24} xl={24} className="py-4">
          <div className="flex flex-row gap-3 items-center justify-between bg-n-7 rounded-lg w-full h-full p-2 shadow-md">
            <input
              type="text"
              placeholder={suggestions[0].content}
              className="w-full outline-none px-3 py-2 text-lg bg-transparent"
              value={topic}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setTopic(e.target.value)
              }
            />
            <button
              type="button"
              className="text-base bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-lg px-5 py-2.5 text-center transition-all duration-300 ease-in-out transform"
            >
              Create
            </button>
          </div>
        </Col>
      </Row>
    </header>
  );
};
