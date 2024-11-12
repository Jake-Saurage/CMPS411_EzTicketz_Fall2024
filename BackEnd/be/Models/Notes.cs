using System;
using System.ComponentModel.DataAnnotations;

namespace CMPS411_EzTicketz_Fall2024.Models
{
    public class Note
    {
        public int Id { get; set; }
        public required string NoteDescription { get; set; }
        public DateTimeOffset NoteTimePosted { get; set; }

        // Navigation properties
        public TechUser? Tech { get; set; }  // Nullable
        public Client? Client { get; set; }  // Nullable
    }

    // DTO for creating a Note
    public class NoteCreateDto
    {
        [Required]
        public string NoteDescription { get; set; } = string.Empty;
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

        // Optional navigation properties for convenience
        public string? TechName { get; set; }  // If a TechUser posted the note
        public string? ClientName { get; set; }  // If a Client posted the note
    }
}
