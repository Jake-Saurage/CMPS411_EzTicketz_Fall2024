using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using CMPS411_EzTicketz_Fall2024.Models;

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
        public ActionResult<IEnumerable<TechUserGetDto>> GetTechUsers()
        {
            var techDtos = techs.Select(t => new TechUserGetDto
            {
                Id = t.Id,
                Name = t.Name,
                TechLevel = t.TechLevel,
                Username = t.Username
            });

            return Ok(techDtos);
        }

        // GET: api/techusers/{id}
        [HttpGet("{id}")]
        public ActionResult<TechUserGetDto> GetTechUser(int id)
        {
            var tech = techs.FirstOrDefault(t => t.Id == id);
            if (tech == null)
            {
                return NotFound();
            }

            var techDto = new TechUserGetDto
            {
                Id = tech.Id,
                Name = tech.Name,
                TechLevel = tech.TechLevel,
                Username = tech.Username
            };

            return Ok(techDto);
        }

        // POST: api/techusers
        [HttpPost]
        public ActionResult<TechUserGetDto> CreateTechUser(TechUserCreateDto newTechDto)
        {
            var newTech = new TechUser
            {
                Id = techs.Count > 0 ? techs.Max(u => u.Id) + 1 : 1,
                Name = newTechDto.Name,
                TechLevel = newTechDto.TechLevel,
                Username = newTechDto.Username,
                Password = newTechDto.Password
            };

            techs.Add(newTech);

            var createdTechDto = new TechUserGetDto
            {
                Id = newTech.Id,
                Name = newTech.Name,
                TechLevel = newTech.TechLevel,
                Username = newTech.Username
            };

            return CreatedAtAction(nameof(GetTechUser), new { id = newTech.Id }, createdTechDto);
        }

        // PUT: api/techusers/{id}
        [HttpPut("{id}")]
        public IActionResult UpdateTechUser(int id, TechUserUpdateDto techDto)
        {
            var tech = techs.FirstOrDefault(t => t.Id == id);
            if (tech == null)
            {
                return NotFound();
            }

            tech.Name = techDto.Name;
            tech.TechLevel = techDto.TechLevel;
            tech.Username = techDto.Username;
            tech.Password = techDto.Password;

            return NoContent();
        }

        // PATCH: api/techusers/{id}
        [HttpPatch("{id}")]
        public IActionResult EditTechUser(int id, TechUserEditDto techDto)
        {
            var tech = techs.FirstOrDefault(t => t.Id == id);
            if (tech == null)
            {
                return NotFound();
            }

            // Only update fields if they are provided
            if (techDto.Name != null) tech.Name = techDto.Name;
            if (techDto.TechLevel.HasValue) tech.TechLevel = techDto.TechLevel.Value;
            if (techDto.Username != null) tech.Username = techDto.Username;
            if (techDto.Password != null) tech.Password = techDto.Password;

            return NoContent();
        }

        // DELETE: api/techusers/{id}
        [HttpDelete("{id}")]
        public IActionResult DeleteTechUser(int id)
        {
            var tech = techs.FirstOrDefault(t => t.Id == id);
            if (tech == null)
            {
                return NotFound();
            }

            techs.Remove(tech);

            return NoContent();
        }
    }
}
