// import { HttpClient, HttpClientModule } from '@angular/common/http';
// import { Component, inject } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
// import { Observable } from 'rxjs';
// import { Book } from '../models/book.model';
// import { AsyncPipe } from '@angular/common';
// import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { publishFacade } from '@angular/compiler';

// @Component({
//   selector: 'app-root',
//    imports: [RouterOutlet, HttpClientModule,AsyncPipe,FormsModule,ReactiveFormsModule],
//   templateUrl: './app.component.html',
//   styleUrl: './app.component.css'
// })
// export class AppComponent {
  
//   http = inject (HttpClient);

//   booksForm = new FormGroup({
//     id: new FormControl<string>(''),
//     title: new FormControl<string>(''),
//     author: new FormControl<string>(''),
//     isbn: new FormControl<string>(''),
//     publicationdate: new FormControl<Date | null>(null)
//   });

//   book$ = this.getBooks();

//   onFormSubmit(){
//     const AddBookRequest = {
//       id: this.booksForm.value.id,
//       title: this.booksForm.value.title,
//       author: this.booksForm.value.author,
//       isbn: this.booksForm.value.isbn,
//       publicationDate: this.booksForm.value.publicationdate,
//     }

//     this.http.post('https://localhost:7036/api/Books', AddBookRequest)
//     .subscribe({
//       next:(value)=>{
//         console.log(value);
//         this.book$ = this.getBooks();
//         this.booksForm.reset();
//       }
//     })
//   }

//   onDelete(id:string){
//     this.http.delete(`https://localhost:7036/api/Books/${id}`)
//     .subscribe({
//       next:(value) =>{
//         alert('Book Deleted');
//         this.book$ = this.getBooks();
//       }
//     })
//   }

//   private getBooks(): Observable<Book[]>{
//     return this.http.get<Book[]>('https://localhost:7036/api/Books');

//   }

//   onEdit(book: any) {
//     // Fill the form with the selected book data
//     this.booksForm.setValue({
//       id: book.id,
//       title: book.title,
//       author: book.author,
//       isbn: book.isbn,
//       publicationdate: book.publicationDate
//     });
//     this.isEditMode = true; // Set edit mode to true
//   }
  
 
// }

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';
import { AsyncPipe } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HttpClientModule, AsyncPipe, FormsModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  http = inject(HttpClient);

  // Define form group to handle form controls
  booksForm = new FormGroup({
    id: new FormControl<string>(''),
    title: new FormControl<string>(''),
    author: new FormControl<string>(''),
    isbn: new FormControl<string>(''),
    publicationdate: new FormControl<Date | null>(null)
  });

  book$ = this.getBooks();
  isEditMode: boolean = false; // To track if we're in edit mode

  // Method to submit the form
  onFormSubmit() {
    const AddOrUpdateBookRequest = {
      id: this.booksForm.value.id,
      title: this.booksForm.value.title,
      author: this.booksForm.value.author,
      isbn: this.booksForm.value.isbn,
      publicationDate: this.booksForm.value.publicationdate,
    };

    if (this.isEditMode) {
      // Update the existing book
      this.updateBook(AddOrUpdateBookRequest);
    } else {
      // Add a new book
      this.addBook(AddOrUpdateBookRequest);
    }
  }

  // Method to add a new book
  addBook(book: any) {
    this.http.post('https://localhost:7036/api/Books', book)
      .subscribe({
        next: (value) => {
          console.log('Book added:', value);
          this.book$ = this.getBooks();
          this.booksForm.reset();
        },
        error: (error) => {
          console.error('Error adding book:', error);
        }
      });
  }

  // Method to update an existing book
  updateBook(book: any) {
    this.http.put(`https://localhost:7036/api/Books/${book.id}`, book)
      .subscribe({
        next: (value) => {
          console.log('Book updated:', value);
          this.book$ = this.getBooks();
          this.booksForm.reset();
          this.isEditMode = false; // Reset to create mode
        },
        error: (error) => {
          console.error('Error updating book:', error);
        }
      });
  }

  // Method to delete a book
  onDelete(id: string) {
    this.http.delete(`https://localhost:7036/api/Books/${id}`)
      .subscribe({
        next: () => {
          alert('Book Deleted');
          this.book$ = this.getBooks();
        },
        error: (error) => {
          console.error('Error deleting book:', error);
        }
      });
  }

  // Fetch the list of books from the API
  private getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>('https://localhost:7036/api/Books');
  }

  // Method to edit a book (set form values and switch to edit mode)
  onEdit(book: any) {
    // Fill the form with the selected book data
    this.booksForm.setValue({
      id: book.id,
      title: book.title,
      author: book.author,
      isbn: book.isbn,
      publicationdate: book.publicationDate
    });
    this.isEditMode = true; // Set edit mode to true
  }
}

