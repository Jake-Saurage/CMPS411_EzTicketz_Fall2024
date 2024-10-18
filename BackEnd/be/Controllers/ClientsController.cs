using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using CMPS411_EzTicketz_Fall2024.Models;
using CMPS411_EzTicketz_Fall2024.Data;
using Microsoft.EntityFrameworkCore;

namespace CMPS411_EzTicketz_Fall2024.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ClientsController : ControllerBase
    {
        private readonly YourDbContext _context;

        public ClientsController(YourDbContext context)
        {
            _context = context;
        }

        // GET: api/clients
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ClientGetDto>>> GetClients()
        {
            var clients = await _context.Clients.Include(c => c.Company).ToListAsync();

            var clientDTOs = clients.Select(c => new ClientGetDto
            {
                Id = c.Id,
                Name = c.Name,
                Email = c.Email,
                Phone = c.Phone,
                CompanyId = c.CompanyId,
                CompanyName = c.Company.CompanyName
            });

            return Ok(clientDTOs);
        }

        // GET: api/clients/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<ClientGetDto>> GetClient(int id)
        {
            var client = await _context.Clients.Include(c => c.Company).FirstOrDefaultAsync(c => c.Id == id);

            if (client == null)
            {
                return NotFound();
            }

            var clientDTO = new ClientGetDto
            {
                Id = client.Id,
                Name = client.Name,
                Email = client.Email,
                Phone = client.Phone,
                CompanyId = client.CompanyId,
                CompanyName = client.Company.CompanyName
            };

            return Ok(clientDTO);
        }

        // GET: api/clients/ids
        [HttpGet("ids")]
        public async Task<ActionResult<IEnumerable<int>>> GetClientIds()
        {
            var clientIds = await _context.Clients.Select(c => c.Id).ToListAsync();
            return Ok(clientIds);
        }

        // POST: api/clients
        [HttpPost]
        public async Task<ActionResult<ClientGetDto>> CreateClient(ClientCreateDto newClientDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var newClient = new Client
            {
                Name = newClientDto.Name,
                Email = newClientDto.Email,
                Phone = newClientDto.Phone,
                CompanyId = newClientDto.CompanyId
            };

            _context.Clients.Add(newClient);
            await _context.SaveChangesAsync();

            var createdClientDto = new ClientGetDto
            {
                Id = newClient.Id,
                Name = newClient.Name,
                Email = newClient.Email,
                Phone = newClient.Phone,
                CompanyId = newClient.CompanyId,
                CompanyName = (await _context.Companies.FindAsync(newClient.CompanyId))?.CompanyName ?? string.Empty
            };

            return CreatedAtAction(nameof(GetClient), new { id = newClient.Id }, createdClientDto);
        }

        // PUT: api/clients/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateClient(int id, ClientUpdateDto updateClientDto)
        {
            if (id != updateClientDto.Id)
            {
                return BadRequest("Client ID mismatch.");
            }

            var client = await _context.Clients.FindAsync(id);
            if (client == null)
            {
                return NotFound();
            }

            client.Name = updateClientDto.Name;
            client.Email = updateClientDto.Email;
            client.Phone = updateClientDto.Phone;
            client.CompanyId = updateClientDto.CompanyId;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // PATCH: api/clients/{id}
        [HttpPatch("{id}")]
        public async Task<IActionResult> EditClient(int id, ClientEditDto editClientDto)
        {
            var client = await _context.Clients.FindAsync(id);
            if (client == null)
            {
                return NotFound();
            }

            if (!string.IsNullOrEmpty(editClientDto.Name))
            {
                client.Name = editClientDto.Name;
            }

            if (!string.IsNullOrEmpty(editClientDto.Email))
            {
                client.Email = editClientDto.Email;
            }

            if (!string.IsNullOrEmpty(editClientDto.Phone))
            {
                client.Phone = editClientDto.Phone;
            }

            if (editClientDto.CompanyId.HasValue)
            {
                client.CompanyId = editClientDto.CompanyId.Value;
            }

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/clients/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteClient(int id)
        {
            var client = await _context.Clients.FindAsync(id);
            if (client == null)
            {
                return NotFound();
            }

            _context.Clients.Remove(client);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
