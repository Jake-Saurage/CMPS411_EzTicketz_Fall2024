using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CMPS411_EzTicketz_Fall2024.Models;
using CMPS411_EzTicketz_Fall2024.Data;
namespace CMPS411_EzTicketz_Fall2024.Controllers

{
    [ApiController]
    [Route("api/[controller]")]
    public class TechUsersController : ControllerBase
    {
        private readonly YourDbContext _context;

        public TechUsersController(YourDbContext context)
        {
            _context = context;
        }

        // GET: api/techusers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TechUserGetDto>>> GetTechUsers()
        {
            var techs = await _context.TechUsers.ToListAsync();

            var techDtos = techs.Select(t => new TechUserGetDto
            {
                Id = t.Id,
                Name = t.Name,
                TechLevel = t.TechLevel,
                Email = t.Email
            });

            return Ok(techDtos);
        }

        // GET: api/techusers/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<TechUserGetDto>> GetTechUser(int id)
        {
            var tech = await _context.TechUsers.FindAsync(id);
            if (tech == null)
            {
                return NotFound();
            }

            var techDto = new TechUserGetDto
            {
                Id = tech.Id,
                Name = tech.Name,
                TechLevel = tech.TechLevel,
                Email = tech.Email
            };

            return Ok(techDto);
        }

        // POST: api/techusers
        [HttpPost]
        public async Task<ActionResult<TechUserGetDto>> CreateTechUser(TechUserCreateDto newTechDto)
        {
            var newTech = new TechUser
            {
                Name = newTechDto.Name,
                TechLevel = newTechDto.TechLevel,
                Email = newTechDto.Email,
                Password = newTechDto.Password
            };

            _context.TechUsers.Add(newTech);
            await _context.SaveChangesAsync();

            var createdTechDto = new TechUserGetDto
            {
                Id = newTech.Id,
                Name = newTech.Name,
                TechLevel = newTech.TechLevel,
                Email = newTech.Email
            };

            return CreatedAtAction(nameof(GetTechUser), new { id = newTech.Id }, createdTechDto);
        }

        // PUT: api/techusers/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTechUser(int id, TechUserUpdateDto techDto)
        {
            var tech = await _context.TechUsers.FindAsync(id);
            if (tech == null)
            {
                return NotFound();
            }

            tech.Name = techDto.Name;
            tech.TechLevel = techDto.TechLevel;
            tech.Email = techDto.Email;
            tech.Password = techDto.Password;

            _context.Entry(tech).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // PATCH: api/techusers/{id}
        [HttpPatch("{id}")]
        public async Task<IActionResult> EditTechUser(int id, TechUserEditDto techDto)
        {
            var tech = await _context.TechUsers.FindAsync(id);
            if (tech == null)
            {
                return NotFound();
            }

            // Only update fields if they are provided
            if (techDto.Name != null) tech.Name = techDto.Name;
            if (techDto.TechLevel.HasValue) tech.TechLevel = techDto.TechLevel.Value;
            if (techDto.Email != null) tech.Email = techDto.Email;
            if (techDto.Password != null) tech.Password = techDto.Password;

            _context.Entry(tech).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/techusers/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTechUser(int id)
        {
            var tech = await _context.TechUsers.FindAsync(id);
            if (tech == null)
            {
                return NotFound();
            }

            _context.TechUsers.Remove(tech);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
