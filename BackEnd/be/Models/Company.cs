using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CMPS411_EzTicketz_Fall2024.Models
{
    public class Company
{
    public int Id { get; set; }

    [Required]
    public required string CompanyName { get; set; }

    // Navigation property for associated Clients
    public ICollection<Client> Clients { get; set; } = new List<Client>();

    // Navigation property for associated Tickets
    public ICollection<Ticket> Tickets { get; set; } = new List<Ticket>();
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
        public int Id { get; set; }

        [Required]
        public required string CompanyName { get; set; }
    }

    // DTO for editing (partial update) a company's details
    public class EditCompanyDTO
    {
        [Required]
        public int Id { get; set; }

        public string? CompanyName { get; set; }
    }

    // DTO for deleting a company
    public class DeleteCompanyDTO
    {
        [Required]
        public int Id { get; set; }
    }

    // DTO for getting company details
    public class GetCompanyDTO
{
    public int Id { get; set; }
    public required string CompanyName { get; set; }

    // Include the list of clients
    public List<ClientGetDto> Clients { get; set; } = new List<ClientGetDto>();

    public int AssignedTickets { get; set; } // Add this to hold ticket count

    // Include the list of tickets
    public List<TicketGetDto> Tickets { get; set; } = new List<TicketGetDto>();
}

}
