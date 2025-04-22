import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { BookService } from '../../services/books.service';
import { ReviewService } from '../../services/reviews.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule
  ],
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private bookService = inject(BookService);
  private reviewService = inject(ReviewService);
  authService = inject(AuthService);
  
  book: any = null;
  reviews: any[] = [];
  newReview = { rating: 5, comment: '' };

  ngOnInit() {
    this.loadBook();
  }

  loadBook() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.bookService.getBook(+id).subscribe(book => {
        this.book = book;
        this.loadReviews(book.id);
      });
    }
  }

  loadReviews(bookId: number) {
    this.reviewService.getBookReviews(bookId).subscribe(reviews => {
      this.reviews = reviews;
    });
  }

  addReview() {
    if (this.book) {
      this.reviewService.addReview(this.book.id, this.newReview).subscribe({
        next: () => {
          this.loadReviews(this.book.id);
          this.newReview.comment = '';
        }
      });
    }
  }

  downloadBook() {
    if (this.book) {
      this.bookService.downloadBook(this.book.id).subscribe(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${this.book.title}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
      });
    }
  }
}