from rest_framework.response import Response
from rest_framework.decorators import api_view


@api_view(['GET'])
def getData(request) -> Response:
    data = {
        'name': 'John Doe',
        'age': 29
    }
    return Response(data)
