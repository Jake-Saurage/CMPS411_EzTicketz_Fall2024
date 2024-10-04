using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CMPS411_EzTicketz_Fall2024.Models; // Adjust this to match your actual namespace
using CMPS411_EzTicketz_Fall2024.Data; // Adjust based on your actual namespace

public static class ClientSeed
{
    public static async Task SeedClientsAsync(YourDbContext context)
    {
        if (!context.Clients.Any())
        {
            var clients = new List<Client>
            {
                new Client { Id = 1, Name = "Client A", Email = "clientA@example.com", Phone = "9851113232" },
                new Client { Id = 2, Name = "Client B", Email = "clientB@example.com", Phone = "9856789101" },
                new Client { Id = 3, Name = "Client C", Email = "clientC@example.com", Phone = "9851123444" }
            };

            await context.Clients.AddRangeAsync(clients);
            await context.SaveChangesAsync();
        }
    }
}
