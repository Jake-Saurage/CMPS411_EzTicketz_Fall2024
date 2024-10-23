using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CMPS411_EzTicketz_Fall2024.Data;
using CMPS411_EzTicketz_Fall2024.Models; // Add this line

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
            ClientId = ticket.ClientId,
            ClientName = ticket.Client?.Name ?? string.Empty, // Check if Client exists
            CompanyId = ticket.CompanyId,
            CompanyName = ticket.Company?.CompanyName ?? string.Empty, // Check if Company exists
            TechId = ticket.TechId,
            TechName = ticket.Tech?.Name ?? string.Empty, // Check if TechUser exists
            TicketNotes = ticket.TicketNotes
        }).ToList();

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
            ClientId = ticket.ClientId,
            ClientName = ticket.Client?.Name ?? string.Empty,
            CompanyId = ticket.CompanyId,
            CompanyName = ticket.Company?.CompanyName ?? string.Empty,
            TechId = ticket.TechId,
            TechName = ticket.Tech?.Name ?? string.Empty,
            TicketNotes = ticket.TicketNotes
        };

        return Ok(ticketDto);
    }

    // POST: api/tickets
    [HttpPost]
    public async Task<ActionResult<TicketGetDto>> PostTicket(TicketCreateDto ticketDto)
    {
        // Find existing entities by their IDs
        var client = await _context.Clients.FindAsync(ticketDto.ClientId);
        var company = await _context.Companies.FindAsync(ticketDto.CompanyId);
        var techUser = await _context.TechUsers.FindAsync(ticketDto.TechId);

        if (client == null || company == null || techUser == null)
        {
            return BadRequest("Client, Company, or TechUser not found.");
        }

        // Create the new ticket and set the related entities
        var ticket = new Ticket
        {
            TicketTitle = ticketDto.TicketTitle,
            TicketDescription = ticketDto.TicketDescription,
            Resolution = ticketDto.Resolution,
            CreationDate = DateTimeOffset.Now,
            IssueId = ticketDto.IssueId,
            SubIssueId = ticketDto.SubIssueId,
            ClientId = ticketDto.ClientId,
            CompanyId = ticketDto.CompanyId,
            TechId = ticketDto.TechId,
            TicketNotes = ticketDto.TicketNotes
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
            ClientId = ticket.ClientId,
            ClientName = client.Name,
            CompanyId = ticket.CompanyId,
            CompanyName = company.CompanyName,
            TechId = ticket.TechId,
            TechName = techUser.Name,
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

        // Find the existing entities by their IDs
        var client = await _context.Clients.FindAsync(ticketDto.ClientId);
        var company = await _context.Companies.FindAsync(ticketDto.CompanyId);
        var techUser = await _context.TechUsers.FindAsync(ticketDto.TechId);

        if (client == null || company == null || techUser == null)
        {
            return BadRequest("Client, Company, or TechUser not found.");
        }

        // Fetch the existing ticket from the database
        var ticket = await _context.Tickets.FindAsync(id);
        if (ticket == null)
        {
            return NotFound();
        }

        // Update the ticket properties
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

    // DELETE: api/tickets/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTicket(int id)
    {
        var ticket = await _context.Tickets.FindAsync(id);
        if (ticket == null)
        {
            return NotFound();
        }

        _context.Tickets.Remove(ticket);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool TicketExists(int id)
    {
        return _context.Tickets.Any(e => e.Id == id);
    }
}
