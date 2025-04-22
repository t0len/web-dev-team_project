import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  // URL API на Django
  private apiUrl = 'http://localhost:8000/api/books/';

  constructor(private http: HttpClient) { }

  // Получить все книги
  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl);
  }

  // Получить книгу по id
  getBook(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}${id}/`);
  }

  // Добавить новую книгу
  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.apiUrl, book, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  // Обновить информацию о книге
  updateBook(id: number, book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.apiUrl}${id}/`, book, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  // Удалить книгу
  deleteBook(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}/`);
  }
}
