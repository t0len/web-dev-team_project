import { Routes } from '@angular/router';
import { BookListComponent } from './books/book-list/book-list.component';
import { LoginComponent } from './auth/login/login.component';
import { authGuard } from './auth.guard';
import { AddBookComponent } from './books/add-book/add-book.component';
import { AdminBooksComponent } from './admin/admin-books/admin-books.component';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import { adminGuard } from './admin.guard';
import { RegisterComponent } from './auth/register/register.component';

export const routes: Routes = [
  { path: '', redirectTo: 'books', pathMatch: 'full' },
  { path: 'books', component: BookListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { 
    path: 'add-book', 
    component: AddBookComponent,
    canActivate: [authGuard] 
  },
  { path: '**', redirectTo: 'books' },
  {
    path: 'admin',
    canActivate: [adminGuard],
    children: [
      { path: 'books', component: AdminBooksComponent },
      { path: 'users', component: AdminUsersComponent }
    ]
  }
];