import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from '../../services/admin.service';
// import { ConfirmDialogComponent } from '../../shared/confirm-dialog.component';
// import { EditBookDialogComponent } from './edit-book-dialog.component';
import { Book } from '../../types';


@Component({
  selector: 'app-admin-books',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './admin-books.component.html',
  styleUrls: ['./admin-books.component.css']
})
export class AdminBooksComponent {
  private adminService = inject(AdminService);
  private dialog = inject(MatDialog);
  
  displayedColumns = ['id', 'title', 'author', 'category', 'actions'];
  books: Book[] = [];

  ngOnInit() {
    this.loadBooks();
  }

  loadBooks() {
    this.adminService.getAllBooks().subscribe(books => {
      this.books = books;
    });
  }

  // deleteBook(book: Book) {
  //   const dialogRef = this.dialog.open(ConfirmDialogComponent, {
  //     data: { message: `Delete ${book.title}?` }
  //   });

  //   dialogRef.afterClosed().subscribe(confirmed => {
  //     if (confirmed) {
  //       this.adminService.deleteBook(book.id).subscribe(() => {
  //         this.loadBooks();
  //       });
  //     }
  //   });
  // }

  // editBook(book: Book) {
  //   this.dialog.open(EditBookDialogComponent, {
  //     data: book,
  //     width: '600px'
  //   }).afterClosed().subscribe(updated => {
  //     if (updated) this.loadBooks();
  //   });
  // }
}
