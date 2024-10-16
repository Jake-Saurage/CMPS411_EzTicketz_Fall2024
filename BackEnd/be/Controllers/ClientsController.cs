using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using CMPS411_EzTicketz_Fall2024.Models; 
using CMPS411_EzTicketz_Fall2024.Data; // Import your Data namespace

namespace CMPS411_EzTicketz_Fall2024.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ClientsController : ControllerBase
    {
        private readonly YourDbContext _context; // Add the DbContext

        // Inject YourDbContext via constructor
        public ClientsController(YourDbContext context)
        {
            _context = context;
        }

        // GET: api/clients
        [HttpGet]
        public IActionResult GetClients()
        {
            // Pull clients from the database
            var clients = _context.Clients.ToList(); 
            return Ok(clients);
        }

        // GET: api/clients/ids
        [HttpGet("ids")]
        public IActionResult GetClientIds()
        {
            var clientIds = _context.Clients.Select(c => c.Id).ToList(); // Pull client IDs from the database
            return Ok(clientIds);
        }

        // POST: api/clients
        [HttpPost]
        public IActionResult CreateClient([FromBody] Client newClient)
        {
            if (newClient == null) return BadRequest();

            _context.Clients.Add(newClient); // Add the new client to the database
            _context.SaveChanges(); // Save changes to the database

            return Ok(newClient);
        }
    }
}
