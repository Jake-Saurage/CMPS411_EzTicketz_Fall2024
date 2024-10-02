using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Json;
using CMPS411_EzTicketz_Fall2024.Models; // Ensure this line is present

namespace CMPS411_EzTicketz_Fall2024.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TechUsersController : ControllerBase
    {
        // In-memory data for simplicity (replace with a database)
        private static List<TechUser> techs = new List<TechUser>
        {
            new TechUser { Id = 1, Name = "Tech Enthusiast", TechLevel = 3, Username = "tech_enthusiast", Password = "password123" }
        };

        // GET: api/techusers
        [HttpGet]
        public IActionResult GetTechUsers()
        {
            return Ok(techs);
        }

        // POST: api/techusers
        [HttpPost]
        public IActionResult CreateTechUser([FromBody] TechUser newTech)
        {
            if (newTech == null) return BadRequest();

            newTech.Id = techs.Count > 0 ? techs.Max(u => u.Id) + 1 : 1;
            techs.Add(newTech);

            return Ok(newTech);
        }

        // POST: api/techusers/{id}/updatetechlevel
        [HttpPost("{id}/updatetechlevel")]
        public IActionResult UpdateTechLevel(int id, [FromBody] int newTechLevel)
        {
            var tech = techs.FirstOrDefault(u => u.Id == id);
            if (tech == null) return NotFound();

            tech.TechLevel = newTechLevel;
            return Ok(tech);
        }
    }
}
