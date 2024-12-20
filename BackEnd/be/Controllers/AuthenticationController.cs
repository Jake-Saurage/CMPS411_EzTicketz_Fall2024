// AuthenticationController.cs
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using CMPS411_EzTicketz_Fall2024.Services;
using CMPS411_EzTicketz_Fall2024.Models;
using System.Collections.Generic;

namespace CMPS411_EzTicketz_Fall2024.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthenticationController : ControllerBase
    {
        private readonly AuthService _authService;

        // Dictionary to store session information: email -> (userType, name, companyId)
        private static Dictionary<string, (string UserType, string Name, int? CompanyId)> _sessions 
            = new Dictionary<string, (string, string, int?)>();

        public AuthenticationController(AuthService authService)
        {
            _authService = authService;
        }

        // POST: api/authentication/signin
        [HttpPost("signin")]
        public async Task<IActionResult> SignIn([FromBody] SignInDto signInDto)
        {
            if (signInDto == null || string.IsNullOrWhiteSpace(signInDto.Email) || string.IsNullOrWhiteSpace(signInDto.Password))
            {
                return BadRequest("Email and password are required.");
            }

            // Try authenticating as a client
            var client = await _authService.AuthenticateClientAsync(signInDto.Email, signInDto.Password);
            if (client != null)
            {
                // Generate a session token (e.g., use email as the token for simplicity)
                var token = client.Email;
                _sessions[token] = ("Client", client.Name, client.CompanyId); // Include companyId

                // Return user information for the authenticated client
                return Ok(new
                {
                    userId = client.Id,
                    userType = "Client",
                    email = client.Email,
                    name = client.Name,
                    companyId = client.CompanyId, // Include companyId in the response
                    token = token
                });
            }

            // Try authenticating as a tech user
            var techUser = await _authService.AuthenticateTechUserAsync(signInDto.Email, signInDto.Password);
            if (techUser != null)
            {
                // Generate a session token (e.g., use email as the token for simplicity)
                var token = techUser.Email;
                _sessions[token] = ("TechUser", techUser.Name, null); // No companyId for TechUser

                // Return user information for the authenticated tech user
                return Ok(new
                {
                    userId = techUser.Id,
                    userType = "TechUser",
                    email = techUser.Email,
                    name = techUser.Name,
                    token = token
                });
            }

            // If both attempts fail, return Unauthorized
            return Unauthorized("Invalid email or password.");
        }

        // GET: api/authentication/currentuser
        [HttpGet("currentuser")]
        public IActionResult GetCurrentUser([FromHeader] string token)
        {
            if (string.IsNullOrWhiteSpace(token) || !_sessions.ContainsKey(token))
            {
                return Unauthorized("No user is currently signed in.");
            }

            var (userType, name, companyId) = _sessions[token];
            return Ok(new
            {
                email = token,
                userType = userType,
                name = name,
                companyId = companyId // Include companyId if available
            });
        }
    }
}
