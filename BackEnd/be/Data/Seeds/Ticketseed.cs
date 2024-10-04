using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CMPS411_EzTicketz_Fall2024.Models; // Adjust this to match your actual namespace
using CMPS411_EzTicketz_Fall2024.Data; // Adjust based on your actual namespace


public static class TicketSeed
{
    public static async Task SeedTicketsAsync(YourDbContext context)
    {
        if (!context.Tickets.Any())
        {
            var tickets = new List<Ticket>
            {
                new Ticket 
                { 
                    Id = 1, 
                    TicketTitle = "Ticket A", 
                    TicketDescription = "Description for Ticket A", 
                    Resolution = "screwdriver", 
                    CreationDate = DateTimeOffset.Now, 
                    IssueId = 1, 
                    SubIssueId = 1, 
                    ClientId = 1, 
                    CompanyId = 1, 
                    TechId = 1, 
                    TicketNotes = "hello client" 
                },
                new Ticket 
                { 
                    Id = 2, 
                    TicketTitle = "Ticket B", 
                    TicketDescription = "Description for Ticket B", 
                    Resolution = "turn off and back on", 
                    CreationDate = DateTimeOffset.Now, 
                    IssueId = 2, 
                    SubIssueId = 2, 
                    ClientId = 2, 
                    CompanyId = 2, 
                    TechId = 2, 
                    TicketNotes = "hello client" 
                },
                new Ticket 
                { 
                    Id = 3, 
                    TicketTitle = "Ticket C", 
                    TicketDescription = "Description for Ticket C", 
                    Resolution = "idk", 
                    CreationDate = DateTimeOffset.Now, 
                    IssueId = 3, 
                    SubIssueId = 3, 
                    ClientId = 3, 
                    CompanyId = 3, 
                    TechId = 3, 
                    TicketNotes = "hello client" 
                }
            };

            await context.Tickets.AddRangeAsync(tickets);
            await context.SaveChangesAsync();
        }
    }
}
