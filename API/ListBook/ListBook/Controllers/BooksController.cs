using ListBook.Controllers.Models;
using ListBook.Controllers.Models.Domain;
using ListBook.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ListBook.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly BookDbContexts dbContexts;

        public BooksController(BookDbContexts dbContexts)
        {
            this.dbContexts = dbContexts;
        }
        [HttpGet]
        public IActionResult GetAllBooks()
        {
            var books = dbContexts.Books.ToList();
            return Ok (books);

        }

        [HttpPost]
        public IActionResult AddBooks(AddBookRequestDTO request)
        {
            var domainModelBook = new ListBooks
            {
                Id = Guid.NewGuid(),
                Title = request.Title,
                Author = request.Author,
                ISBN = request.ISBN,
                PublicationDate = request.PublicationDate,
            };

            dbContexts.Books.Add(domainModelBook);
            dbContexts.SaveChanges();
            return Ok(domainModelBook);

        }

        [HttpDelete]
        [Route("{id:guid}")]
        public IActionResult DeleteBook(Guid id)
        {
           var books = dbContexts.Books.Find(id);

            if (books is not null)
            {
                dbContexts.Books.Remove(books);
                dbContexts.SaveChanges();
            }

            return Ok();
        }


        // New Edit/Update Endpoint
        [HttpPut]
        [Route("{id:guid}")]
        public IActionResult UpdateBook(Guid id, UpdateBookRequestDTO request)
        {
            var book = dbContexts.Books.Find(id);

            if (book is not null)
            {
                // Update the properties
                book.Title = request.Title;
                book.Author = request.Author;
                book.ISBN = request.ISBN;
                book.PublicationDate = request.PublicationDate;

                dbContexts.SaveChanges(); // Save changes to the database
                return Ok(book); // Return the updated book object
            }

            return NotFound("Book not found");
        }
    }


}

