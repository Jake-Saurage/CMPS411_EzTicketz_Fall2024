using Microsoft.EntityFrameworkCore;
using CMPS411_EzTicketz_Fall2024.Models; // Adjust this namespace as needed
using CMPS411_EzTicketz_Fall2024.Services;

namespace CMPS411_EzTicketz_Fall2024.Data
{
    public class YourDbContext : DbContext
    {
        public YourDbContext(DbContextOptions<YourDbContext> options) : base(options) { }

        public DbSet<Client> Clients { get; set; }
        public DbSet<Company> Companies { get; set; }
        public DbSet<Ticket> Tickets { get; set; }
        public DbSet<Note> Notes {get; set;}
        public DbSet<IssueType> IssueTypes { get; set; }
        public DbSet<SubIssueType> SubIssueTypes { get; set; }
        public DbSet<TechUser> TechUsers { get; set; }
        // Add more DbSets as per your models

        protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    // Configure one-to-many relationship: A company can have many tickets
    modelBuilder.Entity<Ticket>()
        .HasOne(t => t.Company)
        .WithMany(c => c.Tickets) // A company has a collection of tickets
        .HasForeignKey(t => t.CompanyId)
        .OnDelete(DeleteBehavior.Cascade); // Cascade delete tickets if company is deleted

    // Configure other relationships here if necessary
    base.OnModelCreating(modelBuilder);
}

    }
}
