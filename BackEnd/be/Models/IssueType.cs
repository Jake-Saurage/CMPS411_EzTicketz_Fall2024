using System.ComponentModel.DataAnnotations;

namespace CMPS411_EzTicketz_Fall2024.Models
{
    public class IssueType
    {
        public int Id { get; set; }

        [Required]
        public string IssueTypeName { get; set; } = string.Empty;

        [Required]
        public string IssueTypeDescription { get; set; } = string.Empty;

        // Foreign key reference to SubIssueType
        [Required]
        public int SubIssueTypeId { get; set; }  // Linking directly to SubIssueType's Id

        // Navigation property to SubIssueType, but hidden from API output
         [Required]
        public required SubIssueType SubIssueType { get; set; }
    }

    // DTO for creating a new IssueType
    public class IssueTypeCreateDto
    {
        [Required]
        public string IssueTypeName { get; set; } = string.Empty;

        [Required]
        public string IssueTypeDescription { get; set; } = string.Empty;

        // Reference to existing SubIssueType by Id
        [Required]
        public int SubIssueTypeId { get; set; }
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

        // Reference to existing SubIssueType by Id
        [Required]
        public int SubIssueTypeId { get; set; }
    }

    // DTO for editing an IssueType (partial updates)
    public class IssueTypeEditDto
    {
        [Required]
        public int Id { get; set; }

        public string? IssueTypeName { get; set; }

        public string? IssueTypeDescription { get; set; }

        // Optional SubIssueTypeId for partial update
        public int? SubIssueTypeId { get; set; }
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

        // Include SubIssueTypeName for convenience in the response
        public string SubIssueTypeName { get; set; } = string.Empty;
    }
}