using Microsoft.AspNetCore.Mvc;
using ReviewAppProject.Data.Models;
using ReviewAppProject.Exceptions;
using ReviewAppProject.Services;
using ReviewAppProject.ViewModels;

namespace ReviewAppProject.Controllers
{
    [ApiController]
    [Route("Course")]
    public class CourseController : Controller
    {
        private readonly CourseService _service;

        public CourseController(CourseService service)
        {
            _service = service;
        }

        [HttpGet("All")]
        public async IAsyncEnumerable<CourseViewModel> GetAllCoursesAsync()
        {
            var courses = _service.GetAllCoursesAsync();

            await foreach (var course in courses)
            {
                yield return new CourseViewModel(course);
            }
        }

        /*[HttpPut("Add-Professor/{courseId}/{professorId}")]
        public async Task<IActionResult> AddProfessorToCourse(int courseId, int professorId)
        {
            try
            {
                await _service.AddProfessorToCourse(courseId, professorId);
                var course = _service.GetCourseByIdAsync(courseId);
                return Ok(course);
            }
            catch (CourseNotFoundException e) { return BadRequest("Course Not Found"); }
            catch (ProfessorNotFoundException e) { return BadRequest("Professor is not found"); }
            catch (Exception ex) { return StatusCode(500, "Internal Server Error"); }

        }*/
    }
}
