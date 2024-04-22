// Dependencies
import { FC } from "react";

// Components
import { ChaptersAndSections } from "@/components/create/ChaptersAndSections";
import { Cover } from "@/components/create/Cover";
// Constants
import { suggestions } from "@/constants/home";
// Utils
import { secureRandomIndexes } from "@/utils/secureRandomIndexes";

// Interfaces
interface CreateFormProps {}

/**
 * CreateForm Component
 *
 * @interface CreateFormProps
 * @returns {JSX.Element} - CreateForm Component
 * @exports CreateForm
 */
export const CreateForm: FC<CreateFormProps> = (): JSX.Element => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form
      className="w-full flex flex-col gap-3 font-['Poppins']"
      onSubmit={handleSubmit}
    >
      <div className="w-full flex flex-col gap-1">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          className="w-full p-2 bg-transparent border border-n-6/70 rounded-md outline-none focus:border-n-4 duration-300 ease-in-out font-light"
          placeholder="e.g. How to be healthy"
          required
        />
      </div>

      <div className="w-full flex flex-col gap-1">
        <label htmlFor="topic">Topic</label>
        <textarea
          id="topic"
          className="w-full min-h-16 p-2 bg-transparent border border-n-6/70 rounded-md outline-none focus:border-n-4 duration-300 ease-in-out font-light"
          placeholder={
            suggestions[secureRandomIndexes(suggestions, 1)[0]].content
          }
          required
        />
      </div>

      <div className="w-full flex flex-col gap-1">
        <label htmlFor="target-audience">Target Audience</label>
        <input
          type="text"
          id="target-audience"
          className="w-full p-2 bg-transparent border border-n-6/70 rounded-md outline-none focus:border-n-4 duration-300 ease-in-out font-light"
          placeholder="e.g. Adults, Teenagers"
        />
      </div>

      <ChaptersAndSections />

      <Cover />

      <div className="w-full mt-2">
        <button
          type="submit"
          className="w-full text-base bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-lg px-5 py-2.5 text-center transition-all duration-300 ease-in-out transform"
        >
          Create
        </button>
      </div>
    </form>
  );
};
