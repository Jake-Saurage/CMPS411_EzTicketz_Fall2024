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
    public class SubIssueTypesController : ControllerBase
    {
        private static List<SubIssueType> subIssueTypes = new List<SubIssueType>();

        // GET: api/subissuetypes
        [HttpGet]
        public IActionResult GetSubIssueTypes()
        {
            return Ok(subIssueTypes);
        }

        // POST: api/subissuetypes
        [HttpPost]
        public IActionResult CreateSubIssueType([FromBody] SubIssueType newSubIssueType)
        {
            if (newSubIssueType == null) return BadRequest();

            newSubIssueType.Id = subIssueTypes.Count > 0 ? subIssueTypes.Max(s => s.Id) + 1 : 1;
            subIssueTypes.Add(newSubIssueType);

            return Ok(newSubIssueType);
        }
    }
}
