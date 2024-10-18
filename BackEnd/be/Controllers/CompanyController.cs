using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;
using CMPS411_EzTicketz_Fall2024.Models;
using CMPS411_EzTicketz_Fall2024.Data; 

namespace CMPS411_EzTicketz_Fall2024.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CompanyController : ControllerBase
    {
        private static List<Company> Companies = new List<Company>();

        // private readonly HttpClient _httpClient;
        private readonly YourDbContext _context; // Add the DbContext
        public CompanyController(YourDbContext context)
        {
            _context = context;
        }

        // GET: api/company
        [HttpGet]
        public IActionResult GetCompanies()
        {
            var companyDTOs = Companies.Select(c => new GetCompanyDTO
            {
                Id = c.Id,
                CompanyName = c.CompanyName
            }).ToList();

            return Ok(companyDTOs);
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

            var companyDTO = new GetCompanyDTO
            {
                Id = company.Id,
                CompanyName = company.CompanyName
            };

            return Ok(companyDTO);
        }

        // POST: api/company
        [HttpPost]
        public IActionResult AddCompany([FromBody] CreateCompanyDTO createCompanyDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var newCompany = new Company
            {
                Id = Companies.Count + 1, // Simplistic ID generation for the example
                CompanyName = createCompanyDTO.CompanyName
                
            };

            Companies.Add(newCompany);
            return Ok(newCompany);
        }

        // PUT: api/company/5
        [HttpPut("{id}")]
        public IActionResult UpdateCompany(int id, [FromBody] UpdateCompanyDTO updateCompanyDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var company = Companies.FirstOrDefault(c => c.Id == id);
            if (company == null)
            {
                return NotFound();
            }

            company.CompanyName = updateCompanyDTO.CompanyName;

            return Ok(company);
        }

        // PATCH: api/company/5
        [HttpPatch("{id}")]
        public IActionResult EditCompany(int id, [FromBody] EditCompanyDTO editCompanyDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var company = Companies.FirstOrDefault(c => c.Id == id);
            if (company == null)
            {
                return NotFound();
            }

            if (!string.IsNullOrEmpty(editCompanyDTO.CompanyName))
            {
                company.CompanyName = editCompanyDTO.CompanyName;
            }

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
