# The Data Transfer Objects (DTOs) are used to define the structure of the data that is being sent between the client and the server.


# The BookCreateDto is used to define the structure of the data that is being sent to the server when creating a new book.
class BookCreateDto:
    def __init__(self, data: dict) -> None:
        self.name: str = data["name"]
        self.author: str = data["author"]
        self.title: str = data["title"]
        self.topic: str = data["topic"]
        self.target_audience: str = data["target_audience"]
        self.num_chapters: int = data["num_chapters"]
        self.num_subsections: int = data["num_subsections"]
        self.cover: str = data["cover"]
