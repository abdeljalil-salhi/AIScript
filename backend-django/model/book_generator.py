from openai import OpenAI
from json import loads


from .settings import API_KEY
from api.dtos import BookCreateDto


class BookGenerator:
    def __init__(self, data: "BookCreateDto") -> None:
        self.client = OpenAI(api_key=API_KEY)
        self.outline = None

        self.book = {
            "id": data.name,
            "author": data.author,
            "title": data.title,
            "topic": data.topic,
            "target_audience": data.target_audience,
            "num_chapters": data.num_chapters,
            "num_subsections": data.num_subsections,
            "cover": "null",
            "table_of_contents": [],
            "content": [],
        }

    def generate_table_of_contents(self) -> None:
        # Define prompt
        outline_prompt = (
            f'We are writing an eBook called "{self.book["title"]}". It is about'
            f' "{self.book["topic"]}". Our reader is: "{self.book["target_audience"]}". Create'
            " a comprehensive and nonrepetitive outline for this eBook. It should have"
            f" {self.book['num_chapters']} chapter(s). Each chapter should have exactly"
            f" {self.book['num_subsections']} subsection(s)."
            "Output Format for prompt:"
            " python dict using double quotes with key: chapter title, value: a single list/array"
            " containing the subsection titles within the chapter (the subtopics"
            " should be inside the list)."
        )

        # Call API
        response = self.client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": outline_prompt}],
        )
        outline = response.choices[0].message.content.strip()

        # Convert to python dict
        outline = loads(outline)

        c, s = 1, 1
        # Format outline
        for chapter in outline:
            print(chapter)
            self.book["table_of_contents"].append(
                {"chapter": chapter, "subsections": []}
            )
            s = 1
            for subsection in outline[chapter]:
                print(subsection)
                if subsection.lower().startswith("section"):
                    subsection = subsection.split(":", 1)[1].strip()
                if not subsection.startswith(f"{c}.{s}"):
                    subsection = f"{c}.{s} {subsection}"
                self.book["table_of_contents"][-1]["subsections"].append(subsection)
                s += 1
            c += 1

    def generate_chapters(self) -> None:
        for chapter in self.book["table_of_contents"]:
            self.book["content"].append(
                {"chapter": chapter["chapter"], "subsections": []}
            )

            for subsection in chapter["subsections"]:
                # Define prompt
                outline_prompt = f'Write a full text content for the subsection: "{subsection}" for the chapter: "{chapter["chapter"]}".'

                # Call API
                response = self.client.chat.completions.create(
                    model="gpt-3.5-turbo",
                    messages=[{"role": "user", "content": outline_prompt}],
                )
                outline = response.choices[0].message.content.strip()

                self.book["content"][-1]["subsections"].append(
                    {"subsection": subsection, "paragraphs": []}
                )

                # Split response into paragraphs
                paragraphs = outline.split("\n\n")

                self.book["content"][-1]["subsections"][-1]["paragraphs"] = paragraphs
