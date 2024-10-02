using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Json;
using CMPS411_EzTicketz_Fall2024.Models;

namespace CMPS411_EzTicketz_Fall2024.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NotesController : ControllerBase
    {
        private static List<Note> notes = new List<Note>();

        // GET: api/notes
        [HttpGet]
        public IActionResult GetNotes()
        {
            return Ok(notes);
        }

        // POST: api/notes
        [HttpPost]
        public IActionResult CreateNote([FromBody] Note newNote)
        {
            if (newNote == null) return BadRequest();

            newNote.Id = notes.Count > 0 ? notes.Max(n => n.Id) + 1 : 1;
            notes.Add(newNote);

            return Ok(newNote);
        }
    }
}
