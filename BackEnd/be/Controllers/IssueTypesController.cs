using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using CMPS411_EzTicketz_Fall2024.Models;

namespace CMPS411_EzTicketz_Fall2024.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class IssueTypesController : ControllerBase
    {
        // In-memory data for simplicity (replace with a database)
        private static List<IssueType> issueTypes = new List<IssueType>();
        private static List<SubIssueType> subIssueTypes = new List<SubIssueType>(); // Simulating a SubIssueType source

        // GET: api/issuetypes
        [HttpGet]
        public ActionResult<IEnumerable<IssueTypeGetDto>> GetIssueTypes()
        {
            var issueTypeDtos = issueTypes.Select(issue => new IssueTypeGetDto
            {
                Id = issue.Id,
                IssueTypeName = issue.IssueTypeName,
                IssueTypeDescription = issue.IssueTypeDescription,
                SubIssueTypeName = issue.SubIssueType.SubIssueName
            });

            return Ok(issueTypeDtos);
        }

        // GET: api/issuetypes/{id}
        [HttpGet("{id}")]
        public ActionResult<IssueTypeGetDto> GetIssueTypeById(int id)
        {
            var issueType = issueTypes.FirstOrDefault(i => i.Id == id);
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
        public ActionResult<IssueTypeGetDto> CreateIssueType(IssueTypeCreateDto newIssueTypeDto)
        {
            var subIssueType = subIssueTypes.FirstOrDefault(s => s.Id == newIssueTypeDto.SubIssueTypeId);
            if (subIssueType == null)
            {
                return BadRequest("SubIssueType not found.");
            }

            var newIssueType = new IssueType
            {
                Id = issueTypes.Count > 0 ? issueTypes.Max(i => i.Id) + 1 : 1,
                IssueTypeName = newIssueTypeDto.IssueTypeName,
                IssueTypeDescription = newIssueTypeDto.IssueTypeDescription,
                SubIssueType = subIssueType
            };

            issueTypes.Add(newIssueType);

            var createdIssueTypeDto = new IssueTypeGetDto
            {
                Id = newIssueType.Id,
                IssueTypeName = newIssueType.IssueTypeName,
                IssueTypeDescription = newIssueType.IssueTypeDescription,
                SubIssueTypeName = newIssueType.SubIssueType.SubIssueName
            };

            return CreatedAtAction(nameof(GetIssueTypeById), new { id = newIssueType.Id }, createdIssueTypeDto);
        }

        // PUT: api/issuetypes/{id}
        [HttpPut("{id}")]
        public IActionResult UpdateIssueType(int id, IssueTypeUpdateDto issueTypeDto)
        {
            var issueType = issueTypes.FirstOrDefault(i => i.Id == id);
            if (issueType == null)
            {
                return NotFound();
            }

            var subIssueType = subIssueTypes.FirstOrDefault(s => s.Id == issueTypeDto.SubIssueTypeId);
            if (subIssueType == null)
            {
                return BadRequest("SubIssueType not found.");
            }

            issueType.IssueTypeName = issueTypeDto.IssueTypeName;
            issueType.IssueTypeDescription = issueTypeDto.IssueTypeDescription;
            issueType.SubIssueType = subIssueType;

            return NoContent();
        }

        // PATCH: api/issuetypes/{id}
        [HttpPatch("{id}")]
        public IActionResult EditIssueType(int id, IssueTypeEditDto issueTypeDto)
        {
            var issueType = issueTypes.FirstOrDefault(i => i.Id == id);
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

            if (issueTypeDto.SubIssueTypeId.HasValue)
            {
                var subIssueType = subIssueTypes.FirstOrDefault(s => s.Id == issueTypeDto.SubIssueTypeId.Value);
                if (subIssueType == null)
                {
                    return BadRequest("SubIssueType not found.");
                }

                issueType.SubIssueType = subIssueType;
            }

            return NoContent();
        }

        // DELETE: api/issuetypes/{id}
        [HttpDelete("{id}")]
        public IActionResult DeleteIssueType(int id)
        {
            var issueType = issueTypes.FirstOrDefault(i => i.Id == id);
            if (issueType == null)
            {
                return NotFound();
            }

            issueTypes.Remove(issueType);

            return NoContent();
        }
    }
}
