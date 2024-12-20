using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CMPS411_EzTicketz_Fall2024.Data;
using CMPS411_EzTicketz_Fall2024.Models;

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
                                            .Include(t => t.IssueType)
                                            .Include(t => t.SubIssueType) // Include SubIssueType
                                            .ToListAsync();

        var ticketDtos = tickets.Select(ticket => new TicketGetDto
        {
            Id = ticket.Id,
            TicketTitle = ticket.TicketTitle,
            TicketDescription = ticket.TicketDescription,
            Resolution = ticket.Resolution,
            CreationDate = ticket.CreationDate,
            IssueId = ticket.IssueId,
            IssueTypeName = ticket.IssueType?.IssueTypeName ?? string.Empty,
            SubIssueId = ticket.SubIssueId,
            SubIssueTypeName = ticket.SubIssueType?.SubIssueName ?? string.Empty, // Updated to SubIssueName
            ClientId = ticket.ClientId,
            ClientName = ticket.Client?.Name ?? string.Empty,
            CompanyId = ticket.CompanyId,
            CompanyName = ticket.Company?.CompanyName ?? string.Empty,
            TechId = ticket.TechId,
            TechName = ticket.Tech?.Name ?? string.Empty,
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
                                            .Include(t => t.IssueType)
                                            .Include(t => t.SubIssueType) // Include SubIssueType
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
            IssueTypeName = ticket.IssueType?.IssueTypeName ?? string.Empty,
            SubIssueId = ticket.SubIssueId,
            SubIssueTypeName = ticket.SubIssueType?.SubIssueName ?? string.Empty, // Updated to SubIssueName
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
        var client = await _context.Clients.FindAsync(ticketDto.ClientId);
        var company = await _context.Companies.FindAsync(ticketDto.CompanyId);
        var techUser = await _context.TechUsers.FindAsync(ticketDto.TechId);
        var issueType = await _context.IssueTypes.FindAsync(ticketDto.IssueId);
        var subIssueType = await _context.SubIssueTypes.FindAsync(ticketDto.SubIssueId);

        if (client == null || company == null || techUser == null || issueType == null || subIssueType == null)
        {
            return BadRequest("Client, Company, TechUser, IssueType, or SubIssueType not found.");
        }

        var ticket = new Ticket
        {
            TicketTitle = ticketDto.TicketTitle,
            TicketDescription = ticketDto.TicketDescription,
            Resolution = ticketDto.Resolution,
            CreationDate = DateTimeOffset.Now,
            IssueId = ticketDto.IssueId,
            IssueType = issueType,
            SubIssueId = ticketDto.SubIssueId,
            SubIssueType = subIssueType,
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
            IssueTypeName = issueType.IssueTypeName,
            SubIssueId = ticket.SubIssueId,
            SubIssueTypeName = subIssueType.SubIssueName, // Updated to SubIssueName
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

    var ticket = await _context.Tickets
        .Include(t => t.Client)
        .Include(t => t.Company)
        .Include(t => t.Tech)
        .Include(t => t.IssueType)
        .Include(t => t.SubIssueType)
        .FirstOrDefaultAsync(t => t.Id == id);

    if (ticket == null)
    {
        return NotFound();
    }

    // Update fields
    ticket.TicketTitle = ticketDto.TicketTitle;
    ticket.TicketDescription = ticketDto.TicketDescription;
    ticket.Resolution = ticketDto.Resolution;
    ticket.IssueId = ticketDto.IssueId;
    ticket.SubIssueId = ticketDto.SubIssueId;
    ticket.ClientId = ticketDto.ClientId;
    ticket.CompanyId = ticketDto.CompanyId;
    ticket.TechId = ticketDto.TechId;

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

    // Fetch the updated ticket with all relational data
    var updatedTicket = await _context.Tickets
        .Include(t => t.Client)
        .Include(t => t.Company)
        .Include(t => t.Tech)
        .Include(t => t.IssueType)
        .Include(t => t.SubIssueType)
        .FirstOrDefaultAsync(t => t.Id == id);

    return Ok(updatedTicket);
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
