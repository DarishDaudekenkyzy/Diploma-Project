using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using ReviewAppProject.Data.Models;
using ReviewAppProject.Data.Repository;
using ReviewAppProject.Exceptions;
using ReviewAppProject.Models;
using ReviewAppProject.Services;

namespace ReviewAppProject.Controllers
{
    [ApiController]
    [Route("Faculty")]
    public class FacultyController : Controller
    {
        private readonly FacultyService _service;

        public FacultyController(FacultyService service)
        {
            _service = service;
        }

        [HttpGet("All")]
        public async IAsyncEnumerable<Faculty> GetAllFacultiesAsync()
        {
            var faculties = _service.GetAllFacultiesAsync();

            await foreach (var faculty in faculties)
            {
                yield return faculty;
            }
        }

        [HttpPost("Create")]
        public async Task<IActionResult> CreateFacultyAsync(string facultyName)
        {
            if (facultyName.IsNullOrEmpty())
                return BadRequest("Faculty name is null or empty");
            if (!ModelState.IsValid)
                return BadRequest("Invalid model object");
            

            (Faculty? faculty, Exception? exception) = await _service.CreateFacultyAsync(facultyName);

            if (faculty != null && exception is null) return Ok(faculty);

            if (exception is ArgumentException)
                return BadRequest(exception.Message);
            else if (exception is FacultyWithNameExistsException)
                return BadRequest("Faculty with provided email exists.");
            else
                return StatusCode(500, "Internal server error");
        }
    }
}
