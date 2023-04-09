using Microsoft.AspNetCore.Mvc;
using ReviewAppProject.Data.Models;
using ReviewAppProject.Exceptions;
using ReviewAppProject.Models;
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

        [HttpGet("University/{uniId}")]
        public async IAsyncEnumerable<CourseViewModel> GetAllCoursesInUniversityAsync(int uniId)
        {
            var courses = _service.GetAllCoursesInUniversityAsync(uniId);

            await foreach (var course in courses)
            {
                yield return new CourseViewModel(course);
            }
        }

        [HttpGet("Faculty/{facultyId}")]
        public async IAsyncEnumerable<CourseViewModel> GetAllCoursesInFacultyAsync(int facultyId)
        {
            var courses = _service.GetAllCoursesInFacultyAsync(facultyId);

            await foreach (var course in courses)
            {
                yield return new CourseViewModel(course);
            }
        }

        [HttpGet("Professor/{professorId}")]
        public async IAsyncEnumerable<CourseViewModel> GetCoursesOfProfessorAsync(int professorId) {
            var courses = _service.GetCoursesOfProfessorAsync(professorId);

            await foreach (var course in courses) {
                yield return new CourseViewModel(course);
            }
        }

        [HttpGet("Search/{input}")]
        public async IAsyncEnumerable<CourseViewModel> GetCoursesWithPatternAsync(string input) {
            var courses = _service.GetCoursesWithPatternAsync(input);

            await foreach (var course in courses) { yield return new CourseViewModel(course); }
        }

        [HttpPost]
        public async Task<IActionResult> CreateCourseAsync(CourseCreateModel model) {
            if (!ModelState.IsValid) return BadRequest("Invalid Model");

            (bool created, Exception? e) = await _service.CreateCourseAsync(model);

            if (created && e == null) return Ok();

            if (e is CourseCodeExists) return BadRequest("Course with provided Code already exists");
            else return StatusCode(500, e.StackTrace);
        }

        [HttpPut("Add-Professor/{courseId}/{professorId}")]
        public async Task<IActionResult> AddProfessorToCourseAsync(int courseId, int professorId)
        {
            (bool added, Exception? e) = await _service.AddProfessorToCourseAsync(courseId, professorId);

            if(added && e is null) 
                return Ok();
            
            if (e is CourseNotFoundException) 
                return BadRequest("Course Not Found"); 
            else if (e is ProfessorNotFoundException ) 
                return BadRequest("Professor Not found"); 
            else if(e is ProfessorAlreadyInCourse)
                return BadRequest($"Professor with id {professorId} is already in course with id {courseId}");
            else return StatusCode(500, "Internal Server Error"); 

        }

        [HttpPut("{courseId}")]
        public async Task<IActionResult> UpdateCourseAsync(int courseId, CourseCreateModel model) {
            if (!ModelState.IsValid) return BadRequest("Invalid Model");

            (bool updated, Exception? e) = await _service.UpdateCourseAsync(courseId, model);

            if(updated && e is null) return Ok();

            if (e is CourseNotFoundException) return NotFound();
            else if (e is CourseCodeExists) return BadRequest("Course with provided Code already exists");
            else return StatusCode(500, e.StackTrace);
        }

        [HttpDelete("{courseId}")]
        public async Task<IActionResult> DeleteCourse(int courseId) {
            (bool deleted, Exception? e) = await _service.DeleteCourseAsync(courseId);

            if(deleted && e is null) return Ok();

            if (e is CourseNotFoundException)
                return BadRequest("Course Not Found");
            else return StatusCode(500, "Internal Server Error");
        }
    }
}
