using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CMPS411_EzTicketz_Fall2024.Models
{
    public class TechUser
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; } = string.Empty;

        [Required]
        public int TechLevel { get; set; }

        [Required]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string Password { get; set; } = string.Empty;

        // Navigation property for tickets assigned to this tech user
        public ICollection<Ticket> Tickets { get; set; } = new List<Ticket>();
    }

    // DTO for creating a TechUser
    public class TechUserCreateDto
    {
        [Required]
        public string Name { get; set; } = string.Empty;

        [Required]
        public int TechLevel { get; set; }

        [Required]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string Password { get; set; } = string.Empty;
    }

    // DTO for updating a TechUser
    public class TechUserUpdateDto
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; } = string.Empty;

        [Required]
        public int TechLevel { get; set; }

        [Required]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string Password { get; set; } = string.Empty;
    }

    // DTO for editing a TechUser (partial updates)
    public class TechUserEditDto
    {
        [Required]
        public int Id { get; set; }

        public string? Name { get; set; }

        public int? TechLevel { get; set; }

        public string? Email { get; set; }

        public string? Password { get; set; }
    }

    // DTO for deleting a TechUser
    public class TechUserDeleteDto
    {
        [Required]
        public int Id { get; set; }
    }

    public class TechUserLoginDto
    {
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }

    // DTO for getting a TechUser (read-only)
    public class TechUserGetDto
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public int TechLevel { get; set; }

        public string Email { get; set; } = string.Empty;

        // Include tickets in the response if needed
        public List<TicketDto>? Tickets { get; set; }
            public int AssignedTickets { get; set; }

    }

    // DTO for tickets (if needed)
     public class TicketDto
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string? ClientName { get; set; } // Nullable for clients
    public string? TechName { get; set; }   // Nullable for tech users
    public DateTimeOffset CreationDate { get; set; } // Use DateTimeOffset
}

}
