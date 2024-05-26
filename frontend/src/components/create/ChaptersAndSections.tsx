// Dependencies
import { Dispatch, FC, SetStateAction } from "react";
import { Col, Row } from "antd";
import { BarsOutlined, BookFilled } from "@ant-design/icons";

// Components
import { CounterInput } from "./CounterInput";

// Interfaces
interface ChaptersAndSectionsProps {
  chapters: [number, Dispatch<SetStateAction<number>>];
  sections: [number, Dispatch<SetStateAction<number>>];
}

/**
 * ChaptersAndSections Component
 *
 * @interface ChaptersAndSectionsProps
 * @returns {JSX.Element} - ChaptersAndSections Component
 * @exports ChaptersAndSections
 */
export const ChaptersAndSections: FC<ChaptersAndSectionsProps> = ({
  chapters,
  sections,
}): JSX.Element => {
  return (
    <div className="w-full flex flex-col gap-1 mt-2 mb-2">
      <label htmlFor="bedrooms-input">Chapters and Sections</label>
      <Row gutter={[8, 8]}>
        <Col xs={24} sm={12} xl={12}>
          <CounterInput
            name="chapter"
            Icon={BookFilled}
            items={chapters[0]}
            setItems={chapters[1]}
          />
        </Col>
        <Col xs={24} sm={12} xl={12}>
          <CounterInput
            name="section"
            Icon={BarsOutlined}
            items={sections[0]}
            setItems={sections[1]}
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
