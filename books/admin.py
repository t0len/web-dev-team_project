from django.contrib import admin
from .models import Book, Review, Favorite, UserProfile

admin.site.register(Book)
admin.site.register(Review)
admin.site.register(Favorite)
admin.site.register(UserProfile)