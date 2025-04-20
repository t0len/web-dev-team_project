from django.urls import path
from .views import get_books, AddBook, CreateReview, AddFavorite
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt import views as jwt_views
from .views import RegisterUser
urlpatterns = [
    path('books/', get_books, name='get_books'),
    path('books/add/', AddBook.as_view(), name='add_book'),
    path('books/<int:book_id>/reviews/', CreateReview.as_view(), name='create_review'),
    path('favorites/<int:book_id>/', AddFavorite.as_view(), name='add_favorite'),
    path('admin/', admin.site.urls),
    path('api/', include('books.urls')),
    path('auth/register/', RegisterUser.as_view(), name='register'),
    path('auth/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
]
