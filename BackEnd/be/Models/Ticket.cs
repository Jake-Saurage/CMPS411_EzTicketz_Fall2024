namespace CMPS411_EzTicketz_Fall2024.Models
{
   public class Ticket
{
    public int Id { get; set; }
    public required string TicketTitle { get; set; }
    public required string TicketDescription { get; set; }
    public string? Resolution { get; set; }  // Nullable
    public DateTimeOffset CreationDate { get; set; }
    public int IssueId { get; set; }
    public int SubIssueId { get; set; }
    public int ClientId { get; set; }
    public int CompanyId { get; set; }
    public int TechId { get; set; }
    public string? TicketNotes { get; set; }  // Nullable

    // Navigation properties
    public Client? Client { get; set; }  // Nullable
    public Company? Company { get; set; }  // Nullable
    public TechUser? Tech { get; set; }  // Nullable
}
}
