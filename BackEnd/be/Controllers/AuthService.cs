using System;
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
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        // Asynchronously authenticate a TechUser and return the user object
        public async Task<TechUser?> AuthenticateTechUserAsync(string username, string password)
        {
            return await _context.TechUsers
                .SingleOrDefaultAsync(t => t.Email == username && t.Password == password);
        }

        // Asynchronously authenticate a Client and return the user object
        public async Task<Client?> AuthenticateClientAsync(string email, string password)
        {
            return await _context.Clients
                .SingleOrDefaultAsync(c => c.Email == email && c.Password == password);
        }

        // Generate a token (dummy implementation)
        public string GenerateToken(string email)
        {
            return Convert.ToBase64String(Guid.NewGuid().ToByteArray()); // Replace with JWT for production
        }
    }
}
