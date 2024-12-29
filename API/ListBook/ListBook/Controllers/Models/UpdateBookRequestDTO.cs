namespace ListBook.Controllers.Models
{
    public class UpdateBookRequestDTO


    {
        public required string Title { get; set; }
        public required string Author { get; set; }
        public required string ISBN { get; set; }
        public DateTime PublicationDate { get; set; }
    }
}
