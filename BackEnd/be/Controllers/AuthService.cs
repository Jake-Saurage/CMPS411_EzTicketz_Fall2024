using System.Threading.Tasks;
using CMPS411_EzTicketz_Fall2024.Data;
using CMPS411_EzTicketz_Fall2024.Models;
using Microsoft.EntityFrameworkCore;

namespace CMPS411_EzTicketz_Fall2024.Services
{
    public class AuthService
    {
        private readonly YourDbContext _context;

        public AuthService(YourDbContext context)
        {
            _context = context;
        }

        // Authenticate Client by email and password
        public async Task<Client> AuthenticateClientAsync(string email, string password)
        {
            var client = await _context.Clients.SingleOrDefaultAsync(c => c.Email == email && c.Password == password);
            return client; // Returns null if authentication fails
        }

        // Authenticate TechUser by email and password
        public async Task<TechUser> AuthenticateTechUserAsync(string email, string password)
        {
            var techUser = await _context.TechUsers.SingleOrDefaultAsync(t => t.Email == email && t.Password == password);
            return techUser; // Returns null if authentication fails
        }
    }
}
