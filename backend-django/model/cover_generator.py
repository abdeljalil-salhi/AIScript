from openai import OpenAI, OpenAIError
from requests import get
from cv2 import imread, imwrite, resize


from .settings import API_KEY


class CoverGenerator:
    def __init__(self, book) -> None:
        self.client = OpenAI(api_key=API_KEY)
        self.book = book
    
    def generate_cover(self) -> str:
        # Define prompt
        outline_prompt = f'"{self.book["title"]}" in the style of Vicent van Gogh with black background and dark colors, high quality, only using dark colors, and a dark, mysterious, and eerie atmosphere.'
        
        try:
            # Call API
            response = self.client.images.generate(
                model="dall-e-2",
                prompt=outline_prompt,
                size="512x512",
                n=1,
            )
            image_url = response.data[0].url
        except OpenAIError as e:
            raise e

        # Save the image to {id}_generated.png
        image = get(image_url).content
        with open(f"public/covers/{self.book['id']}_generated.png", "wb+") as file:
            file.write(image)
        
        # Resize the image
        image = imread(f"public/covers/{self.book['id']}_generated.png")
        self.resize_image(image)
        
        # Return the path to the final generated cover
        return f"public/covers/{self.book['id']}.png"

    def resize_image(self, image) -> None:
        # Resize the image to 1250x1250 first to save the aspect ratio
        image = resize(image, (1250, 1250))
        imwrite(f"public/covers/{self.book['id']}_resized.png", image)
        
        # Crop the image to 1000x1250 from the center to fit the cover
        image = image[:, 125:1125]
        
        # Save the final image to {id}.png
        imwrite(f"public/covers/{self.book['id']}.png", image)
