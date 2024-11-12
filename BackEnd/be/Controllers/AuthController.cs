using Microsoft.AspNetCore.Mvc;
using CMPS411_EzTicketz_Fall2024.Services;
using CMPS411_EzTicketz_Fall2024.Models;

namespace CMPS411_EzTicketz_Fall2024.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;

        public AuthController(AuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("techuser-login")]
        public IActionResult TechUserLogin([FromBody] TechUserLoginDto loginDto)
        {
            var token = _authService.AuthenticateTechUser(loginDto.Username, loginDto.Password);
            if (token == null) return Unauthorized();

            return Ok(new { token });
        }

        [HttpPost("client-login")]
        public IActionResult ClientLogin([FromBody] ClientLoginDto loginDto)
        {
            var token = _authService.AuthenticateClient(loginDto.Email, loginDto.Password);
            if (token == null) return Unauthorized();

            return Ok(new { token });
        }
    }
}
