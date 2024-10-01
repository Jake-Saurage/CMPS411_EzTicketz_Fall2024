using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace YourProject.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TechUsersController : ControllerBase
    {
        // In-memory data for simplicity (replace with a database)
        private static List<TechUser> techUsers = new List<TechUser>
        {
            new TechUser { Id = 1, Name = "Tech Enthusiast", Skills = new List<string> { "JavaScript", "React", "Node.js" }, Username = "tech_enthusiast", Password = "password123" }
        };

        // GET: api/techusers
        [HttpGet]
        public IActionResult GetTechUsers()
        {
            return Ok(techUsers);
        }

        // POST: api/techusers
        [HttpPost]
        public IActionResult CreateTechUser([FromBody] TechUser newUser)
        {
            if (newUser == null) return BadRequest();

            newUser.Id = techUsers.Count > 0 ? techUsers.Max(u => u.Id) + 1 : 1;
            techUsers.Add(newUser);

            return Ok(newUser);
        }

        // POST: api/techusers/{id}/addskill
        [HttpPost("{id}/addskill")]
        public IActionResult AddSkill(int id, [FromBody] string newSkill)
        {
            var user = techUsers.FirstOrDefault(u => u.Id == id);
            if (user == null) return NotFound();

            user.Skills.Add(newSkill);
            return Ok(user);
        }
    }

    // Model for Tech User
    public class TechUser
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<string> Skills { get; set; } = new List<string>();
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
