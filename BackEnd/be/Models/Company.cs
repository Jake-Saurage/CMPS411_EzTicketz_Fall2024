namespace CMPS411_EzTicketz_Fall2024.Models
{
    public class Company
    {
        public int Id { get; set; }
        public required string CompanyName { get; set; }
        public int UserId { get; set; }  // Should pull from Clients
        public int CompanyWideTickets { get; set; }  // Should pull from Tickets
    }
}
