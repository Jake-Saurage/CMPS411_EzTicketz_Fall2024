using System.ComponentModel.DataAnnotations;


namespace CMPS411_EzTicketz_Fall2024.Models
{
   public class SubIssueType
{
    public int Id { get; set; }
    public required string SubIssueName { get; set; }
    public required string SubIssueDescription { get; set; }
}

 public class SubIssueTypeCreateDto
    {
        [Required]
        public string SubIssueName { get; set; } = string.Empty;

        [Required]
        public string SubIssueDescription { get; set; } = string.Empty;
    }

    // DTO for updating a SubIssueType
    public class SubIssueTypeUpdateDto
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public string SubIssueName { get; set; } = string.Empty;

        [Required]
        public string SubIssueDescription { get; set; } = string.Empty;
    }

    // DTO for editing a SubIssueType (partial updates)
    public class SubIssueTypeEditDto
    {
        [Required]
        public int Id { get; set; }

        public string? SubIssueName { get; set; }

        public string? SubIssueDescription { get; set; }
    }

    // DTO for deleting a SubIssueType
    public class SubIssueTypeDeleteDto
    {
        [Required]
        public int Id { get; set; }
    }

    // DTO for getting a SubIssueType (read-only)
    public class SubIssueTypeGetDto
    {
        public int Id { get; set; }

        public string SubIssueName { get; set; } = string.Empty;

        public string SubIssueDescription { get; set; } = string.Empty;
    }

}
