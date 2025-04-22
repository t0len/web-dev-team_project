import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { User } from '../types';


@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private baseUrl = 'http://localhost:8000/auth';
  
  private authStatus = new BehaviorSubject<boolean>(false);

  login(email: string, password: string): Observable<{ access: string; refresh: string }> {
    return this.http.post<{ access: string; refresh: string }>(`${this.baseUrl}/token/`, { email, password }).pipe(
      tap(response => {
        this.storeTokens(response);
        this.authStatus.next(true);
        this.loadCurrentUser();
      }),
      catchError(error => {
        this.handleError(error);
        return throwError(() => error);
      })
    );
  }
  private handleError(error: any): void {
    console.error('Auth error:', error);
  }
  
  register(userData: {
    email: string;
    password: string;
    name: string;
  }): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/register/`, userData);
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.authStatus.next(false);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  get authStatus$(): Observable<boolean> {
    return this.authStatus.asObservable();
  }

  private storeTokens(tokens: { access: string; refresh: string }): void {
    localStorage.setItem('access_token', tokens.access);
    localStorage.setItem('refresh_token', tokens.refresh);
  }

  private currentUserSubject = new BehaviorSubject<User | null>(null);
currentUser$ = this.currentUserSubject.asObservable();

// После успешного логина:
loadCurrentUser(): Observable<User> {
  return this.http.get<User>(`${this.baseUrl}/me/`).pipe(
    tap(user => this.currentUserSubject.next(user))
  );
}

isAdmin(): boolean {
  return this.currentUserSubject.value?.isAdmin || false;
}


}