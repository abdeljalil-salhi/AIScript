from os import remove
from requests import get
from openai import OpenAI, OpenAIError
from cv2 import imread, imwrite, resize, INTER_AREA


from .settings import API_KEY


class CoverGenerator:
    def __init__(self, book) -> None:
        self.client = OpenAI(api_key=API_KEY)
        self.book = book

    def generate_cover(self) -> str:
        # Check if the cover is not AI generated
        if self.book["cover"] != "null":
            image_url = self.book["cover"]
        # If the cover is AI generated use the API to generate a new one
        else:
            # Define prompt that will generate a good prompt for the book's topic
            outline_prompt = (
                f'Generate a good dall-e-2 prompt that will suit this topic: "{self.book["topic"]}".'
                "Output Format: the prompt string directly without double quotes."
            )

            # Call API to generate the prompt
            response_prompt = self.client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[{"role": "user", "content": outline_prompt}],
            )
            outline = response_prompt.choices[0].message.content.strip()

            # Add a general description to the outline
            outline = (
                outline.rsplit(".", 1)[0]
                + ", rendered in great great great detail, with no text in the image."
            )

            try:
                # Call DALL-E-2 API to generate the image
                response = self.client.images.generate(
                    model="dall-e-2",
                    prompt=outline,
                    size="1024x1024",
                    n=1,
                )
                image_url = response.data[0].url
            except OpenAIError as e:
                raise e

        # Save the image to {id}_generated.png
        image = get(image_url).content
        with open(f"media/covers/{self.book['id']}_generated.png", "wb+") as file:
            file.write(image)

        # Resize the image
        image = imread(f"media/covers/{self.book['id']}_generated.png")
        self.resize_image(image)

        # Return the path to the final generated cover
        return f"media/covers/{self.book['id']}.png"

    def resize_image(self, image) -> None:
        original_height, original_width = image.shape[:2]
        new_height = 1250
        new_width = int(original_width * (new_height / original_height))

        if new_width < 1000:
            new_width = 1000
            new_height = int(original_height * (new_width / original_width))

        # Resize the image to the new dimensions
        image = resize(image, (new_width, new_height), interpolation=INTER_AREA)

        # Calculate the cropping box (center crop to 1000x1250)
        left = (new_width - 1000) // 2
        right = left + 1000
        top = (new_height - 1250) // 2
        bottom = top + 1250

        # Crop the image to 1000x1250 from the center to fit the cover
        image = image[top:bottom, left:right]

        # Delete the generated image
        remove(f"media/covers/{self.book['id']}_generated.png")

        # Save the final image to {id}.png
        imwrite(f"media/covers/{self.book['id']}.png", image)
