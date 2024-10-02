namespace CMPS411_EzTicketz_Fall2024.Models
{
  public class IssueType
{
    public int Id { get; set; }
    public required string IssueTypeName { get; set; }
    public required string IssueTypeDescription { get; set; }
    public int SubIssueId { get; set; }

    // Navigation property
    public SubIssueType? SubIssueType { get; set; }  // Nullable
}
}
