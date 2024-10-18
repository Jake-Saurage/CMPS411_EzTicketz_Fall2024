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
        public int CompanyId { get; set; }
    }

    // DTO for updating a Client
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
        public int CompanyId { get; set; }
    }

    // DTO for editing a Client (minimal fields for edit, if needed)
    public class ClientEditDto
    {
        [Required]
        public int Id { get; set; }

        public string? Name { get; set; }

        [EmailAddress]
        public string? Email { get; set; }

        [Phone]
        public string? Phone { get; set; }

        public int? CompanyId { get; set; }
    }

    // DTO for deleting a Client
    public class ClientDeleteDto
    {
        [Required]
        public int Id { get; set; }
    }

    // DTO for getting a Client (read-only)
    public class ClientGetDto
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string Phone { get; set; } = string.Empty;

        public int CompanyId { get; set; }

        public string CompanyName { get; set; } = string.Empty; // For convenience, add Company name

    
    }
}
