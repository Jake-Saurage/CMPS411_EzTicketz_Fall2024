using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Json;
using CMPS411_EzTicketz_Fall2024.Models;

namespace CMPS411_EzTicketz_Fall2024.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class IssueTypesController : ControllerBase
    {
        private static List<IssueType> issueTypes = new List<IssueType>();

        // GET: api/issuetypes
        [HttpGet]
        public ActionResult<List<IssueType>> GetIssueTypes()
        {
            return Ok(issueTypes);
        }

        // POST: api/issuetypes
        [HttpPost]
        public ActionResult<IssueType> CreateIssueType([FromBody] IssueType newIssueType)
        {
            if (newIssueType == null)
            {
                return BadRequest("IssueType cannot be null.");
            }

            // Validate the model (assuming IssueType has required fields)
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            newIssueType.Id = issueTypes.Count > 0 ? issueTypes.Max(i => i.Id) + 1 : 1;
            issueTypes.Add(newIssueType);

            return CreatedAtAction(nameof(GetIssueTypes), new { id = newIssueType.Id }, newIssueType);
        }
    }
}
