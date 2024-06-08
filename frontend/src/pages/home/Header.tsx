// Dependencies
import {
  ChangeEvent,
  FC,
  FormEvent,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Col, Row, Spin } from "antd";
import { ArrowDownOutlined, RightOutlined } from "@ant-design/icons";

// Constants
import { suggestions } from "@/constants/home";
import { Suggestion } from "@/constants/types";
// Utils
import { cn } from "@/utils/cn";
import { secureRandomIndexes } from "@/utils/secureRandomIndexes";

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
  /**
   * State to store the topic
   * @type {string}
   */
  const [topic, setTopic] = useState<string>("");
  /**
   * State to store the current placeholder index
   * @type {number}
   * @default 0
   */
  const [currentPlaceholder, setCurrentPlaceholder] = useState<number>(0);
  /**
   * State to store the typing status
   * @type {boolean}
   * @default false
   */
  const [typing, setTyping] = useState<boolean>(false);
  /**
   * State to store the 3 selected suggestions
   * @type {Suggestion[]}
   * @default []
   */
  const [selectedSuggestions, setSelectedSuggestions] = useState<Suggestion[]>(
    []
  );

  /**
   * Reference for the input element
   * @type {RefObject<HTMLInputElement>}
   */
  const inputRef: RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);

  /**
   * Navigate function for redirecting to other pages
   * @type {NavigateFunction}
   */
  const navigate: NavigateFunction = useNavigate();

  /**
   * Redirect to the create page with the topic stored in the state.
   *
   * @function
   * @param {FormEvent<HTMLFormElement>} e - Event
   */
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    navigate("/create", {
      state: {
        topic,
      },
    });
  };

  /**
   * Start the animation for the suggestions
   */
  useEffect(() => {
    // Interval for the animation
    let interval: NodeJS.Timeout;

    /**
     * Function that starts the animation for the suggestions
     */
    const startAnimation = () => {
      interval = setInterval(() => {
        setCurrentPlaceholder(
          (prev: number) => (prev + 1) % suggestions.length
        );
      }, 3000);
    };

    startAnimation();

    // Get 3 random suggestions when the component mounts
    setSelectedSuggestions(
      secureRandomIndexes(suggestions.length, 3).map(
        (index: number) => suggestions[index]
      )
    );

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, [suggestions.length]);

  return (
    <header className="w-full">
      <h2 className="font-semibold text-2xl mb-5 font-['Poppins']">
        Make an e-book about anything
      </h2>

      {selectedSuggestions.length === 0 && (
        <div className="flex items-center justify-center h-96">
          <div className="text-lg text-n-7">
            <Spin />
          </div>
        </div>
      )}

      <Row gutter={[32, 0]}>
        {selectedSuggestions.map((suggestion: Suggestion) => (
          <Col
            key={suggestion.id}
            xs={24}
            sm={24}
            xl={8}
            className="px-4 py-1.5"
          >
            <div
              className="flex flex-row gap-3 items-center justify-between bg-gradient-to-b from-n-7 to-n-9/35 hover:bg-gradient-to-r rounded-lg w-full h-full p-4 shadow-md cursor-pointer hover:shadow-lg transition duration-300 ease-in-out hover:-translate-y-1 font-['Poppins']"
              onClick={() => {
                setTopic(suggestion.content);
                setTyping(true);
              }}
            >
              <div className="text-base">{suggestion.content}</div>
              <ArrowDownOutlined className="text-n-4 text-2xl" />
            </div>
          </Col>
        ))}
      </Row>

      <Row gutter={[32, 0]} className="">
        <Col xs={24} sm={24} xl={24} className="py-4">
          <form
            onSubmit={handleSubmit}
            className="flex flex-row gap-1 sm:gap-3 items-center justify-between bg-n-7 rounded-full sm:rounded-lg w-full h-full p-2 shadow-md font-['Poppins']"
          >
            <input
              type="text"
              ref={inputRef}
              className={cn(
                "w-full relative outline-none px-3 py-2 z-50 text-base sm:text-lg bg-transparent"
              )}
              value={topic}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setTopic(e.target.value);
                if (e.target.value === "") setTyping(false);
                else setTyping(true);
              }}
              onBlur={() => {
                if (topic === "") setTyping(false);
              }}
            />

            <button
              type="submit"
              className="text-base bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-full sm:rounded-lg px-2.5 sm:px-5 py-1 sm:py-2.5 mr-2 sm:mr-0 text-center transition-all duration-300 ease-in-out transform"
            >
              <span className="hidden sm:inline-block">Create</span>
              <span className="inline-block sm:hidden">
                <RightOutlined className="text-sm -mr-0.5" />
              </span>
            </button>

            {!typing && (
              <div className="absolute inset-0 flex items-center rounded-full pointer-events-none">
                <AnimatePresence mode="wait">
                  {!topic && (
                    <motion.p
                      initial={{
                        y: 5,
                        opacity: 0,
                      }}
                      key={`current-placeholder-${currentPlaceholder}`}
                      animate={{
                        y: 0,
                        opacity: 1,
                      }}
                      exit={{
                        y: -15,
                        opacity: 0,
                      }}
                      transition={{
                        duration: 0.3,
                        ease: "linear",
                      }}
                      className="text-zinc-500 text-base sm:text-lg font-normal pl-9 text-left w-[calc(100%-5rem)] sm:w-[calc(100%-8rem)] truncate"
                    >
                      {suggestions[currentPlaceholder].content}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            )}
          </form>
        </Col>
      </Row>
    </header>
  );
};
