using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace CMPS411_EzTicketz_Fall2024.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CompanyController : ControllerBase
    {
        private static List<Company> Companies = new List<Company>();

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
            company.Id = Companies.Count + 1;
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
    }
}

public class Company
{
    public int Id { get; set; }
    public required string CompanyName { get; set; }
    public int UserId { get; set; }
    public int CompanyWideTickets { get; set; }
}
