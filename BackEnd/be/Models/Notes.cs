using System;
using System.ComponentModel.DataAnnotations;

namespace CMPS411_EzTicketz_Fall2024.Models
{
   public class Note
{
    public int Id { get; set; }
    public string NoteDescription { get; set; }
    public DateTimeOffset NoteTimePosted { get; set; }

    // Foreign keys
    public int TicketId { get; set; }
    public Ticket Ticket { get; set; }

    public int? TechId { get; set; } // Nullable foreign key for TechUser
    public TechUser? Tech { get; set; }

    public int? ClientId { get; set; } // Nullable foreign key for Client
    public Client? Client { get; set; }
}

}


    // DTO for creating a Note
 public class NoteCreateDto
{
    [Required]
    public string NoteDescription { get; set; } = string.Empty;

    public int? TechId { get; set; } // Optional for TechUsers
    public int? ClientId { get; set; } // Optional for Clients
}



    // DTO for updating a Note
    public class NoteUpdateDto
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public string NoteDescription { get; set; } = string.Empty;
    }

    // DTO for editing a Note (partial updates)
    public class NoteEditDto
    {
        [Required]
        public int Id { get; set; }

        public string? NoteDescription { get; set; }
    }

    // DTO for getting a Note (read-only)
   public class NoteGetDto
{
    public int Id { get; set; }
    public string NoteDescription { get; set; } = string.Empty;
    public DateTimeOffset NoteTimePosted { get; set; }
    public string? TechName { get; set; } // Nullable
    public int? TechId { get; set; } // Nullable, ID for TechUser
    public string? ClientName { get; set; } // Nullable
    public int? ClientId { get; set; } // Nullable, ID for Client
}



