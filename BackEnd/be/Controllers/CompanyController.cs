using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace CMPS411_EzTicketz_Fall2024.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CompanyController : ControllerBase
    {
        private static List<Company> Companies = new List<Company>();
        private readonly HttpClient _httpClient;

        public CompanyController(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        // GET: api/company
        [HttpGet]
        public IActionResult GetCompanies()
        {
            return Ok(Companies);
        }

        // GET: api/company/5
        [HttpGet("{id}")]
        public IActionResult GetCompany(int id)
        {
            var company = Companies.FirstOrDefault(c => c.Id == id);
            if (company == null)
            {
                return NotFound();
            }
            return Ok(company);
        }

        // POST: api/company
        [HttpPost]
        public IActionResult AddCompany([FromBody] Company company)
        {
            if (!IsValidUserId(company.UserId))
            {
                return BadRequest("Invalid User ID.");
            }

            if (!IsValidTicketId(company.CompanyWideTickets))
            {
                return BadRequest("Invalid Ticket ID.");
            }

            company.Id = Companies.Count + 1; // Simplistic ID generation for the example
            Companies.Add(company);
            return Ok(company);
        }

        // PUT: api/company/5
        [HttpPut("{id}")]
        public IActionResult UpdateCompany(int id, [FromBody] Company updatedCompany)
        {
            var company = Companies.FirstOrDefault(c => c.Id == id);
            if (company == null)
            {
                return NotFound();
            }

            if (!IsValidUserId(updatedCompany.UserId))
            {
                return BadRequest("Invalid User ID.");
            }

            if (!IsValidTicketId(updatedCompany.CompanyWideTickets))
            {
                return BadRequest("Invalid Ticket ID.");
            }

            company.CompanyName = updatedCompany.CompanyName;
            company.UserId = updatedCompany.UserId;
            company.CompanyWideTickets = updatedCompany.CompanyWideTickets;

            return Ok(company);
        }

        // DELETE: api/company/5
        [HttpDelete("{id}")]
        public IActionResult DeleteCompany(int id)
        {
            var company = Companies.FirstOrDefault(c => c.Id == id);
            if (company == null)
            {
                return NotFound();
            }

            Companies.Remove(company);
            return Ok();
        }

        // Validate if User ID exists in Clients
        private bool IsValidUserId(int userId)
        {
            var clientIdsResponse = _httpClient.GetAsync("http://localhost:5000/api/clients/ids").Result;
            if (clientIdsResponse.IsSuccessStatusCode)
            {
                var clientIds = clientIdsResponse.Content.ReadAsAsync<List<int>>().Result;
                return clientIds.Contains(userId);
            }
            return false;
        }

        // Validate if Ticket ID exists in Tickets
        private bool IsValidTicketId(int ticketId)
        {
            var ticketIdsResponse = _httpClient.GetAsync("http://localhost:5000/api/tickets/").Result;
            if (ticketIdsResponse.IsSuccessStatusCode)
            {
                var tickets = ticketIdsResponse.Content.ReadAsAsync<List<Ticket>>().Result;
                return tickets.Any(t => t.Id == ticketId);
            }
            return false;
        }
    }

    public class Company
    {
        public int Id { get; set; }
        public required string CompanyName { get; set; }
        public int UserId { get; set; }  // Should pull from Clients
        public int CompanyWideTickets { get; set; }  // Should pull from Tickets
    }

    public class Ticket
    {
        public int Id { get; set; }
        // Include other relevant properties for your Ticket model
    }
}
