using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using CMPS411_EzTicketz_Fall2024.Models;

namespace CMPS411_EzTicketz_Fall2024.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NotesController : ControllerBase
    {
        // In-memory data for simplicity (replace with a database)
        private static List<Note> notes = new List<Note>();

        // GET: api/notes
        [HttpGet]
        public ActionResult<IEnumerable<NoteGetDto>> GetNotes()
        {
            var noteDtos = notes.Select(n => new NoteGetDto
            {
                Id = n.Id,
                NoteDescription = n.NoteDescription,
                NoteTimePosted = n.NoteTimePosted,
                TechName = n.Tech?.Name,
                ClientName = n.Client?.Name
            });

            return Ok(noteDtos);
        }

        // GET: api/notes/{id}
        [HttpGet("{id}")]
        public ActionResult<NoteGetDto> GetNoteById(int id)
        {
            var note = notes.FirstOrDefault(n => n.Id == id);
            if (note == null)
            {
                return NotFound();
            }

            var noteDto = new NoteGetDto
            {
                Id = note.Id,
                NoteDescription = note.NoteDescription,
                NoteTimePosted = note.NoteTimePosted,
                TechName = note.Tech?.Name,
                ClientName = note.Client?.Name
            };

            return Ok(noteDto);
        }

        // POST: api/notes
        [HttpPost]
        public ActionResult<NoteGetDto> CreateNote(NoteCreateDto newNoteDto)
        {
            var newNote = new Note
            {
                Id = notes.Count > 0 ? notes.Max(n => n.Id) + 1 : 1,
                NoteDescription = newNoteDto.NoteDescription,
                NoteTimePosted = DateTimeOffset.UtcNow
            };

            notes.Add(newNote);

            var createdNoteDto = new NoteGetDto
            {
                Id = newNote.Id,
                NoteDescription = newNote.NoteDescription,
                NoteTimePosted = newNote.NoteTimePosted
            };

            return CreatedAtAction(nameof(GetNoteById), new { id = newNote.Id }, createdNoteDto);
        }

        // PUT: api/notes/{id}
        [HttpPut("{id}")]
        public IActionResult UpdateNote(int id, NoteUpdateDto noteDto)
        {
            var note = notes.FirstOrDefault(n => n.Id == id);
            if (note == null)
            {
                return NotFound();
            }

            note.NoteDescription = noteDto.NoteDescription;

            return NoContent();
        }

        // PATCH: api/notes/{id}
        [HttpPatch("{id}")]
        public IActionResult EditNote(int id, NoteEditDto noteDto)
        {
            var note = notes.FirstOrDefault(n => n.Id == id);
            if (note == null)
            {
                return NotFound();
            }

            // Only update the fields that are provided
            if (!string.IsNullOrWhiteSpace(noteDto.NoteDescription))
            {
                note.NoteDescription = noteDto.NoteDescription;
            }

            return NoContent();
        }

        // DELETE: api/notes/{id}
        [HttpDelete("{id}")]
        public IActionResult DeleteNote(int id)
        {
            var note = notes.FirstOrDefault(n => n.Id == id);
            if (note == null)
            {
                return NotFound();
            }

            notes.Remove(note);

            return NoContent();
        }
    }
}
