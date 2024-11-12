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
            var client = await _authService.AuthenticateClientAsync(signInDto.Email, signInDto.Password);
            if (client != null)
            {
                // Include userId in the response for client
                return Ok(new { message = "Client signed in successfully", userType = "Client", userId = client.Id });
            }

            var techUser = await _authService.AuthenticateTechUserAsync(signInDto.Email, signInDto.Password);
            if (techUser != null)
            {
                // Include userId in the response for tech user
                return Ok(new { message = "Tech user signed in successfully", userType = "TechUser", userId = techUser.Id });
            }

            return Unauthorized("Invalid email or password");
        }
    }
}
