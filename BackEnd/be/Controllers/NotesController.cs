using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System;
using CMPS411_EzTicketz_Fall2024.Models;
using CMPS411_EzTicketz_Fall2024.Data;

namespace CMPS411_EzTicketz_Fall2024.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NotesController : ControllerBase
    {
        private readonly YourDbContext _context;

        public NotesController(YourDbContext context)
        {
            _context = context;
        }

        // GET: api/notes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<NoteGetDto>>> GetNotes()
        {
            var noteDtos = await _context.Notes
                .Select(n => new NoteGetDto
                {
                    Id = n.Id,
                    NoteDescription = n.NoteDescription,
                    NoteTimePosted = n.NoteTimePosted,
                    TechName = n.Tech.Name,
                    ClientName = n.Client.Name
                })
                .ToListAsync();

            return Ok(noteDtos);
        }

        // GET: api/notes/ticket/{ticketId}
       [HttpGet("ticket/{ticketId}")]
public async Task<ActionResult<IEnumerable<NoteGetDto>>> GetNotesForTicket(int ticketId)
{
    var ticketNotes = await _context.Notes
        .Where(n => n.TicketId == ticketId)
        .Select(n => new NoteGetDto
        {
            Id = n.Id,
            NoteDescription = n.NoteDescription,
            NoteTimePosted = n.NoteTimePosted,
            TechName = n.Tech != null ? n.Tech.Name : null,
            TechId = n.TechId,
            ClientName = n.Client != null ? n.Client.Name : null,
            ClientId = n.ClientId
        })
        .ToListAsync();

    return Ok(ticketNotes);
}


        // POST: api/notes/ticket/{ticketId}
   [HttpPost("ticket/{ticketId}")]
public async Task<ActionResult<NoteGetDto>> AddNoteToTicket(int ticketId, NoteCreateDto newNoteDto)
{
    var ticket = await _context.Tickets.FirstOrDefaultAsync(t => t.Id == ticketId);
    if (ticket == null)
    {
        return NotFound("Ticket not found.");
    }

    // Check if TechId or ClientId is provided
    if (!newNoteDto.TechId.HasValue && !newNoteDto.ClientId.HasValue)
    {
        return BadRequest("A valid TechUser or Client must be associated with the note.");
    }

    // Create the new note
    var newNote = new Note
    {
        NoteDescription = newNoteDto.NoteDescription,
        NoteTimePosted = DateTimeOffset.UtcNow,
        TicketId = ticketId,
        TechId = newNoteDto.TechId, // Set TechId if provided
        ClientId = newNoteDto.ClientId // Set ClientId if provided
    };

    _context.Notes.Add(newNote);
    await _context.SaveChangesAsync();

    var createdNoteDto = new NoteGetDto
    {
        Id = newNote.Id,
        NoteDescription = newNote.NoteDescription,
        NoteTimePosted = newNote.NoteTimePosted,
        TechName = newNote.Tech?.Name,
        ClientName = newNote.Client?.Name
    };

    return CreatedAtAction(nameof(GetNotesForTicket), new { ticketId = ticketId }, createdNoteDto);
}



        // PUT: api/notes/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateNote(int id, NoteUpdateDto noteDto)
        {
            var note = await _context.Notes.FirstOrDefaultAsync(n => n.Id == id);
            if (note == null)
            {
                return NotFound();
            }

            note.NoteDescription = noteDto.NoteDescription;

            _context.Entry(note).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // PATCH: api/notes/{id}
        [HttpPatch("{id}")]
        public async Task<IActionResult> EditNote(int id, NoteEditDto noteDto)
        {
            var note = await _context.Notes.FirstOrDefaultAsync(n => n.Id == id);
            if (note == null)
            {
                return NotFound();
            }

            // Only update the fields that are provided
            if (!string.IsNullOrWhiteSpace(noteDto.NoteDescription))
            {
                note.NoteDescription = noteDto.NoteDescription;
            }

            _context.Entry(note).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/notes/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNote(int id)
        {
            var note = await _context.Notes.FirstOrDefaultAsync(n => n.Id == id);
            if (note == null)
            {
                return NotFound();
            }

            _context.Notes.Remove(note);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
