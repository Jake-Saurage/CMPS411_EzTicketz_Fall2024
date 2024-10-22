using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CMPS411_EzTicketz_Fall2024.Models;
using CMPS411_EzTicketz_Fall2024.Data;
namespace CMPS411_EzTicketz_Fall2024.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SubIssueTypesController : ControllerBase
    {
        private readonly YourDbContext _context;

        public SubIssueTypesController(YourDbContext context)
        {
            _context = context;
        }

        // GET: api/subissuetypes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SubIssueTypeGetDto>>> GetSubIssueTypes()
        {
            var subIssueTypes = await _context.SubIssueTypes.ToListAsync();

            var subIssueTypeDtos = subIssueTypes.Select(s => new SubIssueTypeGetDto
            {
                Id = s.Id,
                SubIssueName = s.SubIssueName,
                SubIssueDescription = s.SubIssueDescription
            });

            return Ok(subIssueTypeDtos);
        }

        // GET: api/subissuetypes/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<SubIssueTypeGetDto>> GetSubIssueType(int id)
        {
            var subIssueType = await _context.SubIssueTypes.FindAsync(id);
            if (subIssueType == null)
            {
                return NotFound();
            }

            var subIssueTypeDto = new SubIssueTypeGetDto
            {
                Id = subIssueType.Id,
                SubIssueName = subIssueType.SubIssueName,
                SubIssueDescription = subIssueType.SubIssueDescription
            };

            return Ok(subIssueTypeDto);
        }

        // POST: api/subissuetypes
        [HttpPost]
        public async Task<ActionResult<SubIssueTypeGetDto>> CreateSubIssueType(SubIssueTypeCreateDto newSubIssueTypeDto)
        {
            var newSubIssueType = new SubIssueType
            {
                SubIssueName = newSubIssueTypeDto.SubIssueName,
                SubIssueDescription = newSubIssueTypeDto.SubIssueDescription
            };

            _context.SubIssueTypes.Add(newSubIssueType);
            await _context.SaveChangesAsync();

            var createdSubIssueTypeDto = new SubIssueTypeGetDto
            {
                Id = newSubIssueType.Id,
                SubIssueName = newSubIssueType.SubIssueName,
                SubIssueDescription = newSubIssueType.SubIssueDescription
            };

            return CreatedAtAction(nameof(GetSubIssueType), new { id = newSubIssueType.Id }, createdSubIssueTypeDto);
        }

        // PUT: api/subissuetypes/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSubIssueType(int id, SubIssueTypeUpdateDto subIssueTypeDto)
        {
            var subIssueType = await _context.SubIssueTypes.FindAsync(id);
            if (subIssueType == null)
            {
                return NotFound();
            }

            subIssueType.SubIssueName = subIssueTypeDto.SubIssueName;
            subIssueType.SubIssueDescription = subIssueTypeDto.SubIssueDescription;

            _context.Entry(subIssueType).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // PATCH: api/subissuetypes/{id}]
        [HttpPatch("{id}")]
        public async Task<IActionResult> EditSubIssueType(int id, SubIssueTypeEditDto subIssueTypeDto)
        {
            var subIssueType = await _context.SubIssueTypes.FindAsync(id);
            if (subIssueType == null)
            {
                return NotFound();
            }

            if (!string.IsNullOrWhiteSpace(subIssueTypeDto.SubIssueName))
            {
                subIssueType.SubIssueName = subIssueTypeDto.SubIssueName;
            }

            if (!string.IsNullOrWhiteSpace(subIssueTypeDto.SubIssueDescription))
            {
                subIssueType.SubIssueDescription = subIssueTypeDto.SubIssueDescription;
            }

            _context.Entry(subIssueType).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/subissuetypes/{id}]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSubIssueType(int id)
        {
            var subIssueType = await _context.SubIssueTypes.FindAsync(id);
            if (subIssueType == null)
            {
                return NotFound();
            }

            _context.SubIssueTypes.Remove(subIssueType);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
