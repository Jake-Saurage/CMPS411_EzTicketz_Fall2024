using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using CMPS411_EzTicketz_Fall2024.Models;

namespace CMPS411_EzTicketz_Fall2024.Models
{
    public class Client
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        [Phone]
        public string Phone { get; set; } = string.Empty;

        [Required]
        public string Password { get; set; } = string.Empty; // Added password property

        public int CompanyId { get; set; }

        // Navigation property for the associated Company
        public virtual Company Company { get; set; } = null!; 

        // Navigation property for the associated Tickets
        public virtual ICollection<Ticket> Tickets { get; set; } = new List<Ticket>();
    }

    public class ClientCreateDto
    {
        [Required]
        public string Name { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        [Phone]
        public string Phone { get; set; } = string.Empty;

        [Required]
        public string Password { get; set; } = string.Empty; // Added password property

        [Required]
        public int CompanyId { get; set; }
    }

    public class ClientUpdateDto
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        [Phone]
        public string Phone { get; set; } = string.Empty;

        [Required]
        public string Password { get; set; } = string.Empty; // Added password property

        [Required]
        public int CompanyId { get; set; }
    }

    public class ClientEditDto
    {
        [Required]
        public int Id { get; set; }

        public string? Name { get; set; }

        [EmailAddress]
        public string? Email { get; set; }

        [Phone]
        public string? Phone { get; set; }

        public string? Password { get; set; } // Added password property

        public int? CompanyId { get; set; }
    }

    public class ClientDeleteDto
    {
        [Required]
        public int Id { get; set; }
    }

    public class ClientLoginDto
    {
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }

    public class ClientGetDto
{
    public int Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public string Phone { get; set; } = string.Empty;

    public string Password { get; set; } = string.Empty; // Added password property

    public int CompanyId { get; set; }

    public string CompanyName { get; set; } = string.Empty; // For convenience, add Company name

    public List<TicketDto> Tickets { get; set; } = new List<TicketDto>(); // Added tickets property
}

}
