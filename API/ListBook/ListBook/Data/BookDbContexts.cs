using ListBook.Controllers.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace ListBook.Data
{
    public class BookDbContexts : DbContext
    {
        public BookDbContexts(DbContextOptions options) : base(options)
        {
        }

        public DbSet<ListBooks> Books { get; set; }
    }
}
