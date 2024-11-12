using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CMPS411_EzTicketz_Fall2024.Models;
using CMPS411_EzTicketz_Fall2024.Data;
using Microsoft.EntityFrameworkCore;

namespace CMPS411_EzTicketz_Fall2024.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CompanyController : ControllerBase
    {
        private readonly YourDbContext _context;

        public CompanyController(YourDbContext context)
        {
            _context = context;
        }

        // GET: api/company
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GetCompanyDTO>>> GetCompanies()
        {
            var companies = await _context.Companies
                .Include(c => c.Clients) // Include clients in the list
                .ToListAsync();

            var companyDTOs = companies.Select(c => new GetCompanyDTO
            {
                Id = c.Id,
                CompanyName = c.CompanyName,
                Clients = c.Clients.Select(cl => new ClientGetDto
                {
                    Id = cl.Id,
                    Name = cl.Name,
                    Email = cl.Email,
                    Phone = cl.Phone,
                    CompanyName = c.CompanyName
                }).ToList()
            }).ToList();

            return Ok(companyDTOs);
        }

        // GET: api/company/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<GetCompanyDTO>> GetCompany(int id)
        {
            var company = await _context.Companies
                .Include(c => c.Clients)  // Include the Clients navigation property
                .FirstOrDefaultAsync(c => c.Id == id);

            if (company == null)
            {
                return NotFound();
            }

            // Create the response with company details and clients
            var companyDTO = new GetCompanyDTO
            {
                Id = company.Id,
                CompanyName = company.CompanyName,
                Clients = company.Clients.Select(client => new ClientGetDto
                {
                    Id = client.Id,
                    Name = client.Name,
                    Email = client.Email,
                    Phone = client.Phone,
                    CompanyName = company.CompanyName
                }).ToList()
            };

            return Ok(companyDTO);
        }

        // POST: api/company
        [HttpPost]
        public async Task<ActionResult<GetCompanyDTO>> AddCompany(CreateCompanyDTO createCompanyDTO)
        {
            if (createCompanyDTO == null)
            {
                return BadRequest("Company data is required.");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var newCompany = new Company
            {
                CompanyName = createCompanyDTO.CompanyName
            };

            _context.Companies.Add(newCompany);
            await _context.SaveChangesAsync();

            var createdCompanyDTO = new GetCompanyDTO
            {
                Id = newCompany.Id,
                CompanyName = newCompany.CompanyName
            };

            return CreatedAtAction(nameof(GetCompany), new { id = newCompany.Id }, createdCompanyDTO);
        }

        // PUT: api/company/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCompany(int id, UpdateCompanyDTO updateCompanyDTO)
        {
            if (id != updateCompanyDTO.Id)
            {
                return BadRequest("ID in URL does not match ID in request body.");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var company = await _context.Companies.FindAsync(id);
            if (company == null)
            {
                return NotFound();
            }

            company.CompanyName = updateCompanyDTO.CompanyName;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Companies.Any(c => c.Id == id))
                {
                    return NotFound("The company you're trying to update does not exist.");
                }
                else
                {
                    return Conflict("The company was modified by another user. Please refresh and try again.");
                }
            }

            return NoContent();
        }

        // PATCH: api/company/{id}
        [HttpPatch("{id}")]
        public async Task<IActionResult> EditCompany(int id, EditCompanyDTO editCompanyDTO)
        {
            if (editCompanyDTO == null)
            {
                return BadRequest("Company data is required.");
            }

            var company = await _context.Companies.FindAsync(id);
            if (company == null)
            {
                return NotFound();
            }

            if (!string.IsNullOrEmpty(editCompanyDTO.CompanyName))
            {
                company.CompanyName = editCompanyDTO.CompanyName;
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Companies.Any(c => c.Id == id))
                {
                    return NotFound("The company you're trying to update does not exist.");
                }
                else
                {
                    return Conflict("The company was modified by another user. Please refresh and try again.");
                }
            }

            return NoContent();
        }

        // DELETE: api/company/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCompany(int id)
        {
            var company = await _context.Companies.FindAsync(id);
            if (company == null)
            {
                return NotFound();
            }

            _context.Companies.Remove(company);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
