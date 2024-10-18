using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CMPS411_EzTicketz_Fall2024.Models
{
    public class Company
    {
        public int Id { get; set; }

        [Required]
        public required string CompanyName { get; set; }

        // Navigation property for the associated Clients (if it's a one-to-many relationship)
        public ICollection<Client>? Clients { get; set; } = new List<Client>(); // Consider using a collection for multiple clients

        // Navigation property for the associated Tickets (if it's a one-to-many relationship)
        public ICollection<Ticket>? Tickets { get; set; } = new List<Ticket>(); // Consider using a collection for multiple tickets
    }

    // DTO for creating a new company
    public class CreateCompanyDTO
    {
        [Required]
        public required string CompanyName { get; set; }
    }

    // DTO for updating a company's details
    public class UpdateCompanyDTO
    {
        [Required]
        public int Id { get; set; }  // Required for updating

        [Required]
        public required string CompanyName { get; set; }
    }

    // DTO for editing (partial update) a company's details
    public class EditCompanyDTO
    {
        [Required]
        public int Id { get; set; }

        // Optional for partial updates
        public string? CompanyName { get; set; }
    }

    // DTO for deleting a company
    public class DeleteCompanyDTO
    {
        [Required]
        public int Id { get; set; }  // Only the ID is necessary for deletion
    }

    // DTO for getting company details
    public class GetCompanyDTO
    {
        public int Id { get; set; }
        public required string CompanyName { get; set; }
    }
}
