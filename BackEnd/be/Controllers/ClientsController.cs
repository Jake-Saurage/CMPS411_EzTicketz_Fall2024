using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Json;
using CMPS411_EzTicketz_Fall2024.Models; // Add this line

namespace CMPS411_EzTicketz_Fall2024.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ClientsController : ControllerBase
    {
        // In-memory data for simplicity (replace with a database)
        private static List<Client> clients = new List<Client>();

        // GET: api/clients
        [HttpGet]
        public IActionResult GetClients()
        {
            return Ok(clients);
        }

        // GET: api/clients/ids
        [HttpGet("ids")]
        public IActionResult GetClientIds()
        {
            var clientIds = clients.Select(c => c.Id).ToList();
            return Ok(clientIds);
        }

        // POST: api/clients
        [HttpPost]
        public IActionResult CreateClient([FromBody] Client newClient)
        {
            if (newClient == null) return BadRequest();

            newClient.Id = clients.Count > 0 ? clients.Max(c => c.Id) + 1 : 1;
            clients.Add(newClient);

            return Ok(newClient);
        }
    }
}
