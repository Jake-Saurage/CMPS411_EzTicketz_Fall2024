using System.ComponentModel.DataAnnotations;


namespace CMPS411_EzTicketz_Fall2024.Models
{
  public class IssueType
{
    public int Id { get; set; }

    public required string IssueTypeName { get; set; }

    public required string IssueTypeDescription { get; set; }

    // Navigation property with required SubIssueType
    public required SubIssueType SubIssueType { get; set; }  // Now required
}
 public class IssueTypeCreateDto
    {
        [Required]
        public string IssueTypeName { get; set; } = string.Empty;

        [Required]
        public string IssueTypeDescription { get; set; } = string.Empty;

        // Required SubIssueTypeId references SubIssueType's Id
        [Required]
        public int SubIssueTypeId { get; set; }  // Linking directly to SubIssueType's Id
    }

    // DTO for updating an IssueType
    public class IssueTypeUpdateDto
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public string IssueTypeName { get; set; } = string.Empty;

        [Required]
        public string IssueTypeDescription { get; set; } = string.Empty;

        // Required SubIssueTypeId references SubIssueType's Id
        [Required]
        public int SubIssueTypeId { get; set; }  // Linking directly to SubIssueType's Id
    }

    // DTO for editing an IssueType (partial updates)
    public class IssueTypeEditDto
    {
        [Required]
        public int Id { get; set; }

        public string? IssueTypeName { get; set; }

        public string? IssueTypeDescription { get; set; }

        // Optional SubIssueTypeId for partial update
        public int? SubIssueTypeId { get; set; }  // Linking directly to SubIssueType's Id
    }

    // DTO for deleting an IssueType
    public class IssueTypeDeleteDto
    {
        [Required]
        public int Id { get; set; }
    }

    // DTO for getting an IssueType (read-only)
    public class IssueTypeGetDto
    {
        public int Id { get; set; }

        public string IssueTypeName { get; set; } = string.Empty;

        public string IssueTypeDescription { get; set; } = string.Empty;

        // Include SubIssueTypeName for convenience
        public string SubIssueTypeName { get; set; } = string.Empty;  // Getting the name of the SubIssueType
    }
}
