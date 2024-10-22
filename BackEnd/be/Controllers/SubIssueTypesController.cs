using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using CMPS411_EzTicketz_Fall2024.Models;

namespace CMPS411_EzTicketz_Fall2024.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SubIssueTypesController : ControllerBase
    {
        // In-memory data for simplicity (replace with a database)
        private static List<SubIssueType> subIssueTypes = new List<SubIssueType>();

        // GET: api/subissuetypes
        [HttpGet]
        public ActionResult<IEnumerable<SubIssueTypeGetDto>> GetSubIssueTypes()
        {
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
        public ActionResult<SubIssueTypeGetDto> GetSubIssueType(int id)
        {
            var subIssueType = subIssueTypes.FirstOrDefault(s => s.Id == id);
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
        public ActionResult<SubIssueTypeGetDto> CreateSubIssueType(SubIssueTypeCreateDto newSubIssueTypeDto)
        {
            var newSubIssueType = new SubIssueType
            {
                Id = subIssueTypes.Count > 0 ? subIssueTypes.Max(s => s.Id) + 1 : 1,
                SubIssueName = newSubIssueTypeDto.SubIssueName,
                SubIssueDescription = newSubIssueTypeDto.SubIssueDescription
            };

            subIssueTypes.Add(newSubIssueType);

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
        public IActionResult UpdateSubIssueType(int id, SubIssueTypeUpdateDto subIssueTypeDto)
        {
            var subIssueType = subIssueTypes.FirstOrDefault(s => s.Id == id);
            if (subIssueType == null)
            {
                return NotFound();
            }

            subIssueType.SubIssueName = subIssueTypeDto.SubIssueName;
            subIssueType.SubIssueDescription = subIssueTypeDto.SubIssueDescription;

            return NoContent();
        }

        // PATCH: api/subissuetypes/{id}
        [HttpPatch("{id}")]
        public IActionResult EditSubIssueType(int id, SubIssueTypeEditDto subIssueTypeDto)
        {
            var subIssueType = subIssueTypes.FirstOrDefault(s => s.Id == id);
            if (subIssueType == null)
            {
                return NotFound();
            }

            // Only update fields that are provided
            if (!string.IsNullOrWhiteSpace(subIssueTypeDto.SubIssueName))
            {
                subIssueType.SubIssueName = subIssueTypeDto.SubIssueName;
            }

            if (!string.IsNullOrWhiteSpace(subIssueTypeDto.SubIssueDescription))
            {
                subIssueType.SubIssueDescription = subIssueTypeDto.SubIssueDescription;
            }

            return NoContent();
        }

        // DELETE: api/subissuetypes/{id}
        [HttpDelete("{id}")]
        public IActionResult DeleteSubIssueType(int id)
        {
            var subIssueType = subIssueTypes.FirstOrDefault(s => s.Id == id);
            if (subIssueType == null)
            {
                return NotFound();
            }

            subIssueTypes.Remove(subIssueType);

            return NoContent();
        }
    }
}
