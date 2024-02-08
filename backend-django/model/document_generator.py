from docx import Document
from docx.shared import Pt
from docx.enum.text import WD_PARAGRAPH_ALIGNMENT
from docxtpl import DocxTemplate
from docx2pdf import convert


class DocumentGenerator:
    def __init__(self, book) -> None:
        self.book = book
        
        self.template = None
        self.document = None

    def generate_cover_page(self) -> None:
        self.template = DocxTemplate("templates/literature.docx")
        
        # Replace the placeholders in the template
        context = {
            "AUTHOR": self.book["author"].upper(),
            "TITLE": self.book["title"],
        }
        
        # Set cover picture
        self.template.replace_pic("cover.png", self.book["cover"])

        # Render the template and save it
        self.template.render(context)
        self.template.save(f"public/docs/{self.book['id']}.docx")


