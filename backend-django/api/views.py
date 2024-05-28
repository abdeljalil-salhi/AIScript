from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.decorators import api_view
from rest_framework import status
from django.shortcuts import get_object_or_404


from model.book_generator import BookGenerator
from model.cover_generator import CoverGenerator
from model.document_generator import DocumentGenerator


from base.models import Book
from .serializers import BookSerializer
from .dtos import BookCreateDto


@api_view(["GET"])
def ApiOverview(_: Request) -> Response:
    # This is the API overview
    api_urls = {
        "List": "/book-list/",
        "Detail View": "/book-detail/<int:pk>/",
        "Create": "/book-create/",
        "Update": "/book-update/<int:pk>/",
        "Delete": "/book-delete/<int:pk>/",
        "Static Media": "/media/<path>/",
    }
    return Response(api_urls)


@api_view(["GET"])
def BookList(_: Request) -> Response:
    # Get all the books from the database
    books = Book.objects.all()

    # Serialize the data and return it
    serializer = BookSerializer(books, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def BookDetail(_: Request, pk: int) -> Response:
    # Get the book by its ID or raise a 404 error
    book = get_object_or_404(Book, id=pk)

    # If the book exists, serialize the data and return it
    serializer = BookSerializer(book, many=False)
    return Response(serializer.data)


@api_view(["POST"])
def BookCreate(req: Request) -> Response:
    try:
        # Create a new book instance
        book = BookGenerator(BookCreateDto(req.data))
    except KeyError:
        return Response(status=status.HTTP_400_BAD_REQUEST)

    # Generate the table of contents
    book.generate_table_of_contents()

    # Generate the chapters and content
    book.generate_chapters()

    # Generate the cover
    cover = CoverGenerator(book.book)
    book.book["cover"] = cover.generate_cover()

    # Generate the document
    document = DocumentGenerator(book.book)
    document.generate_cover_page()
    document.generate_document()

    # Serialize the data
    serializer = BookSerializer(data=book.book)

    # Validating for already existing data
    if Book.objects.filter(title=book.book.get("title")).exists():
        return Response(
            status=status.HTTP_400_BAD_REQUEST, data={"message": "Book already exists"}
        )

    # If the data is valid, save it and return the data
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

    # If the data is not valid, return a 400 status code
    return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(["PUT"])
def BookUpdate(req: Request, pk: int) -> Response:
    # Get the book by its ID or raise a 404 error
    book = get_object_or_404(Book, id=pk)

    # Serialize the data
    serializer = BookSerializer(instance=book, data=req.data)

    # If the data is valid, save it and return the data
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

    # If the data is not valid, return a 400 status code
    return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(["DELETE"])
def BookDelete(_: Request, pk: int) -> Response:
    # Get the book by its ID or raise a 404 error
    book = get_object_or_404(Book, id=pk)

    # Delete the book and return a 204 status code
    book.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
