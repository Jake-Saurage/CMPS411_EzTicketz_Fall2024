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
            var techUsers = await _context.TechUsers
                .Include(t => t.Tickets) // Include tickets to count them
                .ToListAsync();

            var techUserDtos = techUsers.Select(t => new TechUserGetDto
            {
                Id = t.Id,
                Name = t.Name,
                TechLevel = t.TechLevel,
                Email = t.Email,
                AssignedTickets = t.Tickets.Count // Count the tickets
            }).ToList();

            return Ok(techUserDtos);
        }

        // GET: api/techusers/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<TechUserGetDto>> GetTechUser(int id)
        {
            var techUser = await _context.TechUsers
                .Include(t => t.Tickets) // Include tickets assigned to the tech user
                .ThenInclude(t => t.Client) // Include Client in tickets
                .FirstOrDefaultAsync(t => t.Id == id);

            if (techUser == null)
            {
                return NotFound();
            }

            var techUserDto = new TechUserGetDto
            {
                Id = techUser.Id,
                Name = techUser.Name,
                TechLevel = techUser.TechLevel,
                Email = techUser.Email,
                Tickets = techUser.Tickets.Select(ticket => new TicketDto
                {
                    Id = ticket.Id,
                    Title = ticket.TicketTitle,
                    Description = ticket.TicketDescription,
                    CreationDate = ticket.CreationDate,
                    ClientName = ticket.Client?.Name
                }).ToList()
            };

            return Ok(techUserDto);
        }

        // GET: api/techusers/{id}/tickets
        [HttpGet("{id}/tickets")]
public async Task<ActionResult<IEnumerable<TicketDto>>> GetTicketsForTechUser(int id)
{
    var techUser = await _context.TechUsers
        .Include(t => t.Tickets)
        .ThenInclude(t => t.Client)
        .FirstOrDefaultAsync(t => t.Id == id);

    if (techUser == null)
    {
        return NotFound("Tech user not found.");
    }

    var ticketDtos = techUser.Tickets.Select(ticket => new TicketDto
    {
        Id = ticket.Id,
        Title = ticket.TicketTitle,
        Description = ticket.TicketDescription,
        ClientName = ticket.Client?.Name,
        TechName = techUser.Name,
        CreationDate = ticket.CreationDate.UtcDateTime // Convert DateTimeOffset to DateTime
    }).ToList();

    return Ok(ticketDtos);
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

        // POST: api/techusers/SignIn
        [HttpPost("SignIn")]
        public async Task<IActionResult> SignIn(TechUserLoginDto loginDto)
        {
            var techUser = await _context.TechUsers.SingleOrDefaultAsync(t => t.Email == loginDto.Email);
            if (techUser == null || techUser.Password != loginDto.Password)
            {
                return Unauthorized("Invalid credentials.");
            }

            return Ok(new { Message = "Signed in successfully", TechUserId = techUser.Id });
        }
    }
}
