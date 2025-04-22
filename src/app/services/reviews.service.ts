import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Review {
  id: number;
  book: number;
  user: string;
  rating: number;
  comment: string;
  created_at: string;
}

@Injectable({ providedIn: 'root' })
export class ReviewService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:8000/api/reviews';

  getBookReviews(bookId: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.baseUrl}/book/${bookId}/`);
  }

  addReview(bookId: number, data: { rating: number; comment: string }): Observable<Review> {
    return this.http.post<Review>(`${this.baseUrl}/`, {
      book: bookId,
      ...data
    });
  }

  deleteReview(reviewId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${reviewId}/`);
  }
}