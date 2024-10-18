using System.ComponentModel.DataAnnotations;

namespace CMPS411_EzTicketz_Fall2024.Models
{
    public class TechUser
    {
        public int Id { get; set; }

        public required string Name { get; set; } = string.Empty;

        public required int TechLevel { get; set; }

        public required string Username { get; set; } = string.Empty;

        public required string Password { get; set; } = string.Empty;
    }

    // DTO for creating a TechUser
    public class TechUserCreateDto
    {
        [Required]
        public string Name { get; set; } = string.Empty;

        [Required]
        public int TechLevel { get; set; }

        [Required]
        public string Username { get; set; } = string.Empty;

        [Required]
        public string Password { get; set; } = string.Empty;
    }

    // DTO for updating a TechUser
    public class TechUserUpdateDto
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; } = string.Empty;

        [Required]
        public int TechLevel { get; set; }

        [Required]
        public string Username { get; set; } = string.Empty;

        [Required]
        public string Password { get; set; } = string.Empty;
    }

    // DTO for editing a TechUser (partial updates)
    public class TechUserEditDto
    {
        [Required]
        public int Id { get; set; }

        public string? Name { get; set; }

        public int? TechLevel { get; set; }

        public string? Username { get; set; }

        public string? Password { get; set; }
    }

    // DTO for deleting a TechUser
    public class TechUserDeleteDto
    {
        [Required]
        public int Id { get; set; }
    }

    // DTO for getting a TechUser (read-only)
    public class TechUserGetDto
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public int TechLevel { get; set; }

        public string Username { get; set; } = string.Empty;
    }

    public class TechUserLoginDto
    {
        [Required]
        public string Username { get; set; } = string.Empty;

        [Required]
        public string Password { get; set; } = string.Empty;
    }
}
