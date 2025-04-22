import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book, User } from '../types';

@Injectable({ providedIn: 'root' })
export class AdminService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:8000/api/admin';

  // Books
  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.baseUrl}/books/`);
  }

  deleteBook(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/books/${id}/`);
  }

  updateBook(id: number, bookData: FormData): Observable<Book> {
    return this.http.patch<Book>(`${this.baseUrl}/books/${id}/`, bookData);
  }

  // Users
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users/`);
  }

  updateUser(id: number, userData: Partial<User>): Observable<User> {
    return this.http.patch<User>(`${this.baseUrl}/users/${id}/`, userData);
  }
}