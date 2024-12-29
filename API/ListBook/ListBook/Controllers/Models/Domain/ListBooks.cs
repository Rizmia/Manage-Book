namespace ListBook.Controllers.Models.Domain
{
    public class ListBooks
    {

        public Guid Id { get; set; }
        public  required string Title { get; set; }
        public required string Author { get; set; }
        public required string ISBN { get; set; }
        public DateTime PublicationDate { get; set; }
       
    }
}
