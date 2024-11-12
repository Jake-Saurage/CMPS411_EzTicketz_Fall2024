using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using CMPS411_EzTicketz_Fall2024.Services;
using CMPS411_EzTicketz_Fall2024.Models;

namespace CMPS411_EzTicketz_Fall2024.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthenticationController : ControllerBase
    {
        private readonly AuthService _authService;

        public AuthenticationController(AuthService authService)
        {
            _authService = authService;
        }

        // POST: api/authentication/signin
        [HttpPost("SignIn")]
        public async Task<IActionResult> SignIn([FromBody] SignInDto signInDto)
        {
            if (signInDto == null || string.IsNullOrWhiteSpace(signInDto.Email) || string.IsNullOrWhiteSpace(signInDto.Password))
            {
                return BadRequest("Email and password are required.");
            }

            // Attempt to authenticate as Client
            var client = await _authService.AuthenticateClientAsync(signInDto.Email, signInDto.Password);
            if (client != null)
            {
                var token = _authService.GenerateToken(client.Email);
                return Ok(new 
                { 
                    message = "Client signed in successfully", 
                    userType = "Client", 
                    userId = client.Id,
                    token 
                });
            }

            // Attempt to authenticate as TechUser
            var techUser = await _authService.AuthenticateTechUserAsync(signInDto.Email, signInDto.Password);
            if (techUser != null)
            {
                var token = _authService.GenerateToken(techUser.Email);
                return Ok(new 
                { 
                    message = "Tech user signed in successfully", 
                    userType = "TechUser", 
                    userId = techUser.Id,
                    token 
                });
            }

            // If both attempts fail, return Unauthorized
            return Unauthorized("Invalid email or password.");
        }
    }
}
