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
    public class IssueTypesController : ControllerBase
    {
        private readonly YourDbContext _context;

        public IssueTypesController(YourDbContext context)
        {
            _context = context;
        }

        // GET: api/issuetypes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<IssueTypeGetDto>>> GetIssueTypes()
        {
            var issueTypes = await _context.IssueTypes
                .Include(it => it.SubIssueType)  // Include SubIssueType in the query
                .ToListAsync();

            var issueTypeDtos = issueTypes.Select(it => new IssueTypeGetDto
            {
                Id = it.Id,
                IssueTypeName = it.IssueTypeName,
                IssueTypeDescription = it.IssueTypeDescription,
                SubIssueTypeName = it.SubIssueType.SubIssueName  // Map SubIssueType name
            });

            return Ok(issueTypeDtos);
        }

        // GET: api/issuetypes/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<IssueTypeGetDto>> GetIssueType(int id)
        {
            var issueType = await _context.IssueTypes
                .Include(it => it.SubIssueType)
                .FirstOrDefaultAsync(it => it.Id == id);

            if (issueType == null)
            {
                return NotFound();
            }

            var issueTypeDto = new IssueTypeGetDto
            {
                Id = issueType.Id,
                IssueTypeName = issueType.IssueTypeName,
                IssueTypeDescription = issueType.IssueTypeDescription,
                SubIssueTypeName = issueType.SubIssueType.SubIssueName
            };

            return Ok(issueTypeDto);
        }

        // POST: api/issuetypes
        [HttpPost]
        public async Task<ActionResult<IssueTypeGetDto>> CreateIssueType(IssueTypeCreateDto newIssueTypeDto)
        {
            if (newIssueTypeDto == null)
            {
                return BadRequest("IssueType cannot be null.");
            }

            // Validate the model
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Check if the SubIssueTypeId provided exists in the database
            var subIssueType = await _context.SubIssueTypes.FindAsync(newIssueTypeDto.SubIssueTypeId);
            if (subIssueType == null)
            {
                return BadRequest("The specified SubIssueTypeId does not exist.");
            }

            var newIssueType = new IssueType
            {
                IssueTypeName = newIssueTypeDto.IssueTypeName,
                IssueTypeDescription = newIssueTypeDto.IssueTypeDescription,
                SubIssueTypeId = newIssueTypeDto.SubIssueTypeId,
                SubIssueType = subIssueType  // Set the existing SubIssueType
            };

            _context.IssueTypes.Add(newIssueType);
            await _context.SaveChangesAsync();

            var createdIssueTypeDto = new IssueTypeGetDto
            {
                Id = newIssueType.Id,
                IssueTypeName = newIssueType.IssueTypeName,
                IssueTypeDescription = newIssueType.IssueTypeDescription,
                SubIssueTypeName = subIssueType.SubIssueName
            };

            return CreatedAtAction(nameof(GetIssueTypes), new { id = newIssueType.Id }, createdIssueTypeDto);
        }

        // PUT: api/issuetypes/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateIssueType(int id, IssueTypeUpdateDto issueTypeDto)
        {
            var issueType = await _context.IssueTypes
                .Include(it => it.SubIssueType)
                .FirstOrDefaultAsync(it => it.Id == id);

            if (issueType == null)
            {
                return NotFound();
            }

            // Check if the SubIssueTypeId provided exists in the database
            var subIssueType = await _context.SubIssueTypes.FindAsync(issueTypeDto.SubIssueTypeId);
            if (subIssueType == null)
            {
                return BadRequest("The specified SubIssueTypeId does not exist.");
            }

            issueType.IssueTypeName = issueTypeDto.IssueTypeName;
            issueType.IssueTypeDescription = issueTypeDto.IssueTypeDescription;
            issueType.SubIssueTypeId = issueTypeDto.SubIssueTypeId;
            issueType.SubIssueType = subIssueType;

            _context.Entry(issueType).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // PATCH: api/issuetypes/{id}
        [HttpPatch("{id}")]
        public async Task<IActionResult> EditIssueType(int id, IssueTypeEditDto issueTypeDto)
        {
            var issueType = await _context.IssueTypes
                .Include(it => it.SubIssueType)
                .FirstOrDefaultAsync(it => it.Id == id);

            if (issueType == null)
            {
                return NotFound();
            }

            if (!string.IsNullOrWhiteSpace(issueTypeDto.IssueTypeName))
            {
                issueType.IssueTypeName = issueTypeDto.IssueTypeName;
            }

            if (!string.IsNullOrWhiteSpace(issueTypeDto.IssueTypeDescription))
            {
                issueType.IssueTypeDescription = issueTypeDto.IssueTypeDescription;
            }

            // If SubIssueTypeId is provided and valid, update the relation
            if (issueTypeDto.SubIssueTypeId.HasValue)
            {
                var subIssueType = await _context.SubIssueTypes.FindAsync(issueTypeDto.SubIssueTypeId.Value);
                if (subIssueType == null)
                {
                    return BadRequest("The specified SubIssueTypeId does not exist.");
                }

                issueType.SubIssueTypeId = issueTypeDto.SubIssueTypeId.Value;
                issueType.SubIssueType = subIssueType;
            }

            _context.Entry(issueType).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/issuetypes/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteIssueType(int id)
        {
            var issueType = await _context.IssueTypes.FindAsync(id);
            if (issueType == null)
            {
                return NotFound();
            }

            _context.IssueTypes.Remove(issueType);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
