using CMPS411_EzTicketz_Fall2024.Data;
using CMPS411_EzTicketz_Fall2024.Models;
using System.Threading.Tasks;
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

        public async Task<Client?> AuthenticateClientAsync(string email, string password)
        {
            // Verify client credentials
            return await _context.Clients
                .SingleOrDefaultAsync(c => c.Email == email && c.Password == password);
        }

        public async Task<TechUser?> AuthenticateTechUserAsync(string email, string password)
        {
            // Verify tech user credentials
            return await _context.TechUsers
                .SingleOrDefaultAsync(t => t.Email == email && t.Password == password);
        }
    }
}
