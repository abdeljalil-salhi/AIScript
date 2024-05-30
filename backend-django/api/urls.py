from django.conf import settings
from django.urls import path
from django.conf.urls.static import static


from . import views


urlpatterns = [
    path("", views.ApiOverview, name="api-overview"),
    path("book-list/", views.BookList, name="book-list"),
    path("book-detail/<int:pk>/", views.BookDetail, name="book-detail"),
    path("book-create/", views.BookCreate, name="book-create"),
    path("book-update/<int:pk>/", views.BookUpdate, name="book-update"),
    path("book-delete/<int:pk>/", views.BookDelete, name="book-delete"),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
