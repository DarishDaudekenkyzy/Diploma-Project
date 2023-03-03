using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using ReviewAppProject.Data.Models;
using ReviewAppProject.Data.Repository;
using ReviewAppProject.Exceptions;
using ReviewAppProject.Models;

namespace ReviewAppProject.Controllers
{
    [ApiController]
    [Route("Faculty")]
    public class FacultyController : Controller
    {
        private readonly FacultyRepository _repository;

        public FacultyController(FacultyRepository repository)
        {
            _repository = repository;
        }

        [HttpGet("All")]
        public async Task<IActionResult> GetAllFacultiesAsync()
        {
            try
            {
                var faculties = await _repository.GetAllFacultiesAsync();
                return Ok(faculties);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost("Create")]
        public async Task<IActionResult> CreateFacultyAsync(string facultyName)
        {
            try
            {
                if (facultyName.IsNullOrEmpty())
                    return BadRequest("Faculty name is null or empty");
                if (!ModelState.IsValid)
                    return BadRequest("Invalid model object");
                
                try {
                    await _repository.CreateFacultyAsync(facultyName);
                } 
                catch (CouldNotAddFacultyToDatabase e) {
                    return StatusCode(500, "COuld not add faculty to database");
                }
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
