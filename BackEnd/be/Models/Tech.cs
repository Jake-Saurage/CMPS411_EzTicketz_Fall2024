namespace CMPS411_EzTicketz_Fall2024.Models

{
    public class TechUser
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required int TechLevel { get; set; }  // Changed from Skills to TechLevel
        public required string Username { get; set; }
        public required string Password { get; set; }
    }
}