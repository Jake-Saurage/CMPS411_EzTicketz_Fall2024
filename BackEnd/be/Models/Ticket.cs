using System.ComponentModel.DataAnnotations;
using System;

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


namespace CMPS411_EzTicketz_Fall2024.DTOs
{
    // DTO for creating a Ticket
    public class TicketCreateDto
    {
        [Required]
        public string TicketTitle { get; set; } = string.Empty;

        [Required]
        public string TicketDescription { get; set; } = string.Empty;

        public string? Resolution { get; set; }  // Optional

        [Required]
        public int IssueId { get; set; }

        [Required]
        public int SubIssueId { get; set; }

        [Required]
        public int ClientId { get; set; }

        [Required]
        public int CompanyId { get; set; }

        [Required]
        public int TechId { get; set; }

        public string? TicketNotes { get; set; }  // Optional
    }

    // DTO for updating a Ticket
    public class TicketUpdateDto
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public string TicketTitle { get; set; } = string.Empty;

        [Required]
        public string TicketDescription { get; set; } = string.Empty;

        public string? Resolution { get; set; }  // Optional

        [Required]
        public int IssueId { get; set; }

        [Required]
        public int SubIssueId { get; set; }

        [Required]
        public int ClientId { get; set; }

        [Required]
        public int CompanyId { get; set; }

        [Required]
        public int TechId { get; set; }

        public string? TicketNotes { get; set; }  // Optional
    }

    // DTO for editing a Ticket (with optional fields)
    public class TicketEditDto
    {
        [Required]
        public int Id { get; set; }

        public string? TicketTitle { get; set; }

        public string? TicketDescription { get; set; }

        public string? Resolution { get; set; }

        public int? IssueId { get; set; }

        public int? SubIssueId { get; set; }

        public int? ClientId { get; set; }

        public int? CompanyId { get; set; }

        public int? TechId { get; set; }

        public string? TicketNotes { get; set; }  // Optional
    }

    // DTO for deleting a Ticket
    public class TicketDeleteDto
    {
        [Required]
        public int Id { get; set; }
    }

    // DTO for getting a Ticket (read-only)
    public class TicketGetDto
    {
        public int Id { get; set; }

        public string TicketTitle { get; set; } = string.Empty;

        public string TicketDescription { get; set; } = string.Empty;

        public string? Resolution { get; set; }

        public DateTimeOffset CreationDate { get; set; }

        public int IssueId { get; set; }

        public int SubIssueId { get; set; }

        public int ClientId { get; set; }

        public string ClientName { get; set; } = string.Empty;  // For convenience, include Client's name

        public int CompanyId { get; set; }

        public string CompanyName { get; set; } = string.Empty;  // For convenience, include Company's name

        public int TechId { get; set; }

        public string TechName { get; set; } = string.Empty;  // For convenience, include TechUser's name

        public string? TicketNotes { get; set; }
    }
}

}
