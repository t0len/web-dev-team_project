import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  coverImage: string;
  fileUrl: string;
  category: string;
  rating: number;
}

@Injectable({ providedIn: 'root' })
export class BookService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:8000/books';


  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.baseUrl);
  }

  getBook(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.baseUrl}/${id}/`);
  }

  addBook(bookData: FormData): Observable<Book> {
    return this.http.post<Book>(this.baseUrl, bookData);
  }

  downloadBook(id: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/${id}/book_download/`, {
      responseType: 'blob'
    });
  }

  searchBooks(query: string): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.baseUrl}/search/`, {
      params: { q: query }
    });
  }
}
