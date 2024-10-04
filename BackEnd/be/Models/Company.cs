using System.Collections.Generic;
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
        public virtual Client Client { get; set; }

        // List of Ticket IDs associated with the Company
        public List<int> CompanyWideTicketIds { get; set; } = new List<int>(); // Ensure this property is defined

        // Navigation property for the Tickets associated with the Company
        public virtual ICollection<Ticket> Tickets { get; set; } = new List<Ticket>();
    }
}
