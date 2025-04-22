import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { BookService } from '../../services/books.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule
  ],
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent {
  private fb = inject(FormBuilder);
  private bookService = inject(BookService);
  private router = inject(Router);
  
  bookForm = this.fb.group({
    title: ['', Validators.required],
    author: ['', Validators.required],
    description: [''],
    category: ['fiction'],
    coverImage: [null as File | null],
    bookFile: [null as File | null, Validators.required]
  });

  categories = ['fiction', 'non-fiction', 'science', 'biography'];

  onFileChange(event: Event, field: string) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.bookForm.patchValue({ [field]: input.files[0] });
    }
  }

  onSubmit() {
    if (this.bookForm.valid) {
      const formData = new FormData();
      Object.entries(this.bookForm.value).forEach(([key, value]) => {
        if (value !== null) formData.append(key, value);
      });

      this.bookService.addBook(formData).subscribe({
        next: () => this.router.navigate(['/books']),
        error: (err) => console.error('Error adding book:', err)
      });
    }
  }
}