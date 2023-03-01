using Microsoft.AspNetCore.Mvc;
using ReviewAppProject.Data.Models;
using ReviewAppProject.Data.Repository;
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
        public async Task<IActionResult> CreateFacultyAsync(Faculty facultyModel)
        {
            try
            {
                if (facultyModel == null)
                {
                    return BadRequest("Faculty Object is null");
                }
                if (!ModelState.IsValid)
                {
                    return BadRequest("Invalid model object");
                }
                var faculty = new Faculty
                {
                    FacultyId = facultyModel.FacultyId,
                    FacultyName = facultyModel.FacultyName
                };
                await _repository.CreateFaculty(faculty);
                await _repository.SaveAsync();

                return Ok(faculty);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
