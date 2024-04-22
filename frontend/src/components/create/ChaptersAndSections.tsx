// Dependencies
import { FC, useState } from "react";
import { Col, Row } from "antd";
import { BarsOutlined, BookFilled } from "@ant-design/icons";

// Components
import { CounterInput } from "./CounterInput";

// Interfaces
interface ChaptersAndSectionsProps {}

/**
 * ChaptersAndSections Component
 *
 * @interface ChaptersAndSectionsProps
 * @returns {JSX.Element} - ChaptersAndSections Component
 * @exports ChaptersAndSections
 */
export const ChaptersAndSections: FC<
  ChaptersAndSectionsProps
> = (): JSX.Element => {
  const [chapters, setChapters] = useState<number>(3);
  const [sections, setSections] = useState<number>(3);

  return (
    <div className="w-full flex flex-col gap-1 mt-2 mb-2">
      <label htmlFor="bedrooms-input">Chapters and Sections</label>
      <Row gutter={[8, 8]}>
        <Col xs={24} sm={24} xl={12}>
          <CounterInput
            name="chapter"
            Icon={BookFilled}
            items={chapters}
            setItems={setChapters}
          />
        </Col>
        <Col xs={24} sm={24} xl={12}>
          <CounterInput
            name="section"
            Icon={BarsOutlined}
            items={sections}
            setItems={setSections}
            width="3"
            min={2}
            max={10}
          />
        </Col>
      </Row>
      <p id="helper-text-explanation" className="text-xs text-gray-500">
        Set the number of chapters and sections for your book.
      </p>
    </div>
  );
};
