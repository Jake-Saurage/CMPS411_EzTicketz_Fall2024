using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CMPS411_EzTicketz_Fall2024.Models; // Adjust this to match your actual namespace
using CMPS411_EzTicketz_Fall2024.Data; // Adjust based on your actual namespace
using Microsoft.EntityFrameworkCore;

public static class CompanySeed
{
    public static async Task SeedCompaniesAsync(YourDbContext context)
    {
        if (!context.Companies.Any())
        {
            var companies = new List<Company>
            {
                new Company 
                { 
                    Id = 1, 
                    CompanyName = "Company A", 
                    UserId = 1, 
                    CompanyWideTicketIds = new List<int> { 1 } // Initialize as a list
                },
                new Company 
                { 
                    Id = 2, 
                    CompanyName = "Company B", 
                    UserId = 1, 
                    CompanyWideTicketIds = new List<int> { 2 } // Initialize as a list
                },
                new Company 
                { 
                    Id = 3, 
                    CompanyName = "Company C", 
                    UserId = 1, 
                    CompanyWideTicketIds = new List<int> { 3 } // Initialize as a list
                },
            };

            await context.Companies.AddRangeAsync(companies);
            await context.SaveChangesAsync();
        }
    }
}
