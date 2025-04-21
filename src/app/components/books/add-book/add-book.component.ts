import { Component } from '@angular/core';
import { BookService } from '../../../services/book.service';
import { Book } from '../../../models/book.model';
import { Router } from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  imports: [
    FormsModule
  ],
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent {

  book: Book = {
    id: 0,
    title: '',
    description: '',
    author: '',
    file_url: '',
    rating: 0,

  };

  constructor(private bookService: BookService, private router: Router) {}

  addBook(): void {
    this.bookService.addBook(this.book).subscribe((data: Book) => {
      this.router.navigate(['/']);
    });
  }
}
