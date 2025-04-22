from django.contrib import admin
from django.contrib.auth.models import User
from .models import Book, Review, User

@admin.register(User)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'role']
    list_filter = ['role']
    search_fields = ['user__username', 'role']


class BookAdmin(admin.ModelAdmin):
    list_display = ['title', 'author']
    search_fields = ['title', 'author']

    def get_queryset(self, request):
        queryset = super().get_queryset(request)
        if request.user.is_superuser:
            return queryset
        elif request.user.is_authenticated:
            return queryset.filter(user=request.user)
        else:
            return queryset.none()

admin.site.register(Book, BookAdmin)


class ReviewAdmin(admin.ModelAdmin):
    list_display = ['book', 'user', 'rating', 'created_at']
    search_fields = ['book__title', 'user__username']

    def get_queryset(self, request):
        queryset = super().get_queryset(request)
        if request.user.is_superuser:
            return queryset
        elif request.user.is_authenticated:
            return queryset.filter(user=request.user)
        else:
            return queryset.none()

admin.site.register(Review, ReviewAdmin)

class FavoriteAdmin(admin.ModelAdmin):
    list_display = ['user', 'book', 'added_at']
    search_fields = ['user__username', 'book__title']

    def get_queryset(self, request):
        queryset = super().get_queryset(request)
        if request.user.is_superuser:
            return queryset
        elif request.user.is_authenticated:
            return queryset.filter(user=request.user)
        else:
            return queryset.none()

#admin.site.register(Favorite, FavoriteAdmin)

class UserAdmin(admin.ModelAdmin):
    list_display = ['username', 'email', 'is_staff', 'is_active']
    search_fields = ['username', 'email']

admin.site.unregister(User)
admin.site.register(User, UserAdmin)

