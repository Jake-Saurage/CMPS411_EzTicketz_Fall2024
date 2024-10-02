using System;

namespace CMPS411_EzTicketz_Fall2024.Models
{
   public class Note
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public required string NoteDescription { get; set; }
    public DateTimeOffset NoteTimePosted { get; set; }

    // Navigation properties
    public TechUser? Tech { get; set; }  // Nullable
    public Client? Client { get; set; }  // Nullable
}

}
