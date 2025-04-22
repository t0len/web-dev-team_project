from django.urls import path
from .views import get_books, AddBook, CreateReview, AddFavorite
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt import views as jwt_views
from .views import RegisterUser
from . import views
urlpatterns = [
    path('books/', views.get_books, name='get_books'),

    path('books/add/', views.AddBook.as_view(), name='add_book'),

    path('books/<int:book_id>/reviews/', views.CreateReview.as_view(), name='create_review'),

    path('favorites/<int:book_id>/', views.AddFavorite.as_view(), name='add_favorite'),

    path('books/<int:book_id>/delete/', views.delete_book, name='delete_book'),

    path('books/<int:book_id>/download/', views.BookDownload.as_view(), name='book_download'),

    path('books/', views.BookListView.as_view(), name='book_list'),
    path('auth/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),

    path('auth/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),

    path('auth/register/', views.RegisterUser.as_view(), name='register'),
]
