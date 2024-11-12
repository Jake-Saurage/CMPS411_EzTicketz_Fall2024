using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using CMPS411_EzTicketz_Fall2024.Models;
using System;
using CMPS411_EzTicketz_Fall2024.Data;
using System.Security.Cryptography;
using Microsoft.Extensions.Logging;

namespace CMPS411_EzTicketz_Fall2024.Services
{
    public class AuthService
    {
        private readonly YourDbContext _context;
        private readonly string _secretKey;
        private readonly ILogger<AuthService> _logger;

        public AuthService(YourDbContext context, string secretKey, ILogger<AuthService> logger)
        {
            _context = context;
            _secretKey = secretKey;
            _logger = logger;
        }

        // Hash a password using SHA-256
        private string HashPassword(string password)
        {
            using (var sha256 = SHA256.Create())
            {
                var bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                return Convert.ToBase64String(bytes);
            }
        }

        public string AuthenticateTechUser(string username, string password)
        {
            // Hash the password before comparing
            var hashedPassword = HashPassword(password);
            var user = _context.TechUsers.SingleOrDefault(t => t.Username == username && t.Password == hashedPassword);

            if (user == null)
            {
                _logger.LogWarning($"Authentication failed for tech user: {username}");
                return null;
            }

            return GenerateToken(user.Id, user.Username);
        }

        public string AuthenticateClient(string email, string password)
        {
            // Hash the password before comparing
            var hashedPassword = HashPassword(password);
            var client = _context.Clients.SingleOrDefault(c => c.Email == email && c.Password == hashedPassword);

            if (client == null)
            {
                _logger.LogWarning($"Authentication failed for client: {email}");
                return null;
            }

            return GenerateToken(client.Id, client.Email);
        }

        // JWT token generation method
        private string GenerateToken(int userId, string userName)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_secretKey);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.NameIdentifier, userId.ToString()),
                    new Claim(ClaimTypes.Name, userName)
                }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
