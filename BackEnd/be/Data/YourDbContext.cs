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
        public DbSet<IssueType> IssueTypes { get; set; }
        public DbSet<SubIssueType> SubIssueTypes { get; set; }
        public DbSet<TechUser> TechUsers { get; set; }
        // Add more DbSets as per your models

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // You can configure your entity relationships here if necessary
            base.OnModelCreating(modelBuilder);
        }
    }
}
