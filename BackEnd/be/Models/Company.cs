using System.ComponentModel.DataAnnotations;

namespace CMPS411_EzTicketz_Fall2024.Models
{
    public class Company
    {
        public int Id { get; set; }

        [Required]
        public required string CompanyName { get; set; }

        // Foreign key for Clients
        public int UserId { get; set; }

        // Navigation property for the associated Client
        public  Client? Client { get; set; }
        public  Ticket? Ticket { get; set; }
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
