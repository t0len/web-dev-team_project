from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    email = models.EmailField(unique=True)
    role = models.CharField(max_length=50, choices=[('admin', 'Admin'), ('user', 'User'), ('guest', 'Guest')], default='user')

    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []  

    def __str__(self):
        return self.email



class Book(models.Model):
    CATEGORY_CHOICES = [
        ('fiction', 'Fiction'),
        ('non-fiction', 'Non-Fiction'),
        ('science', 'Science'),
        ('biography', 'Biography'),
    ]

    title = models.CharField(max_length=255)
    description = models.TextField()
    cover_image = models.ImageField(
        upload_to='covers/',
        default='covers/default_cover.jpg',
        blank=True
    )
    author = models.CharField(max_length=255)
    fileUrl = models.FileField(upload_to='books/')

    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='fiction')
    average_rating = models.FloatField(default=0) 

    def __str__(self):
        return self.title

class Review(models.Model):
    book = models.ForeignKey(Book, related_name='reviews', on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    rating = models.IntegerField()
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        self.update_book_rating()

    def update_book_rating(self):
        reviews = self.book.reviews.all()
        if reviews.exists():
            self.book.average_rating = sum(r.rating for r in reviews) / reviews.count()
            self.book.save()

    def __str__(self):
        return f'Review for {self.book.title} by {self.user.username}'

# class Favorite(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE)
#     book = models.ForeignKey(Book, on_delete=models.CASCADE)
#     added_at = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return f'{self.user.username} added {self.book.title} to favorites'
