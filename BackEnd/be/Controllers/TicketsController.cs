using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CMPS411_EzTicketz_Fall2024.Data;
using CMPS411_EzTicketz_Fall2024.Models;

namespace CMPS411_EzTicketz_Fall2024.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TicketsController : ControllerBase
    {
        private readonly YourDbContext _context;

        public TicketsController(YourDbContext context)
        {
            _context = context;
        }

        // GET: api/tickets
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TicketGetDto>>> GetTickets()
        {
            var tickets = await _context.Tickets.Include(t => t.Client)
                                                .Include(t => t.Company)
                                                .Include(t => t.Tech)
                                                .ToListAsync();

            var ticketDtos = tickets.Select(ticket => new TicketGetDto
            {
                Id = ticket.Id,
                TicketTitle = ticket.TicketTitle,
                TicketDescription = ticket.TicketDescription,
                Resolution = ticket.Resolution,
                CreationDate = ticket.CreationDate,
                IssueId = ticket.IssueId,
                SubIssueId = ticket.SubIssueId,
                ClientId = ticket.ClientId.HasValue ? ticket.ClientId.Value : 0,
                ClientName = ticket.Client != null ? ticket.Client.Name : string.Empty,
                CompanyId = ticket.CompanyId.HasValue ? ticket.CompanyId.Value : 0,
                CompanyName = ticket.Company != null ? ticket.Company.CompanyName : string.Empty,
                TechId = ticket.TechId.HasValue ? ticket.TechId.Value : 0,
                TechName = ticket.Tech != null ? ticket.Tech.Name : string.Empty,
                TicketNotes = ticket.TicketNotes
            });

            return Ok(ticketDtos);
        }

        // GET: api/tickets/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<TicketGetDto>> GetTicket(int id)
        {
            var ticket = await _context.Tickets.Include(t => t.Client)
                                               .Include(t => t.Company)
                                               .Include(t => t.Tech)
                                               .FirstOrDefaultAsync(t => t.Id == id);

            if (ticket == null)
            {
                return NotFound();
            }

            var ticketDto = new TicketGetDto
            {
                Id = ticket.Id,
                TicketTitle = ticket.TicketTitle,
                TicketDescription = ticket.TicketDescription,
                Resolution = ticket.Resolution,
                CreationDate = ticket.CreationDate,
                IssueId = ticket.IssueId,
                SubIssueId = ticket.SubIssueId,
                ClientId = ticket.ClientId.HasValue ? ticket.ClientId.Value : 0,
                ClientName = ticket.Client != null ? ticket.Client.Name : string.Empty,
                CompanyId = ticket.CompanyId.HasValue ? ticket.CompanyId.Value : 0,
                CompanyName = ticket.Company != null ? ticket.Company.CompanyName : string.Empty,
                TechId = ticket.TechId.HasValue ? ticket.TechId.Value : 0,
                TechName = ticket.Tech != null ? ticket.Tech.Name : string.Empty,
                TicketNotes = ticket.TicketNotes
            };

            return Ok(ticketDto);
        }

        // POST: api/tickets
        [HttpPost]
        public async Task<ActionResult<TicketGetDto>> PostTicket(TicketCreateDto ticketDto)
        {
            var ticket = new Ticket
            {
                TicketTitle = ticketDto.TicketTitle,
                TicketDescription = ticketDto.TicketDescription,
                Resolution = ticketDto.Resolution,
                IssueId = ticketDto.IssueId,
                SubIssueId = ticketDto.SubIssueId,
                ClientId = ticketDto.ClientId,
                CompanyId = ticketDto.CompanyId,
                TechId = ticketDto.TechId,
                TicketNotes = ticketDto.TicketNotes,
                CreationDate = DateTimeOffset.UtcNow
            };

            _context.Tickets.Add(ticket);
            await _context.SaveChangesAsync();

            var createdTicketDto = new TicketGetDto
            {
                Id = ticket.Id,
                TicketTitle = ticket.TicketTitle,
                TicketDescription = ticket.TicketDescription,
                Resolution = ticket.Resolution,
                CreationDate = ticket.CreationDate,
                IssueId = ticket.IssueId,
                SubIssueId = ticket.SubIssueId,
                ClientId = ticket.ClientId.HasValue ? ticket.ClientId.Value : 0,
                CompanyId = ticket.CompanyId.HasValue ? ticket.CompanyId.Value : 0,
                TechId = ticket.TechId.HasValue ? ticket.TechId.Value : 0,
                TicketNotes = ticket.TicketNotes
            };

            return CreatedAtAction(nameof(GetTicket), new { id = ticket.Id }, createdTicketDto);
        }

        // PUT: api/tickets/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTicket(int id, TicketUpdateDto ticketDto)
        {
            if (id != ticketDto.Id)
            {
                return BadRequest();
            }

            var ticket = await _context.Tickets.FindAsync(id);
            if (ticket == null)
            {
                return NotFound();
            }

            ticket.TicketTitle = ticketDto.TicketTitle;
            ticket.TicketDescription = ticketDto.TicketDescription;
            ticket.Resolution = ticketDto.Resolution;
            ticket.IssueId = ticketDto.IssueId;
            ticket.SubIssueId = ticketDto.SubIssueId;
            ticket.ClientId = ticketDto.ClientId;
            ticket.CompanyId = ticketDto.CompanyId;
            ticket.TechId = ticketDto.TechId;
            ticket.TicketNotes = ticketDto.TicketNotes;

            _context.Entry(ticket).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TicketExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // Helper method to check if a ticket exists
        private bool TicketExists(int id)
        {
            return _context.Tickets.Any(e => e.Id == id);
        }
    }
}
