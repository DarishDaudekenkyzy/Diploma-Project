using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using ReviewAppProject.Data.Models;
using ReviewAppProject.Data.Repository;
using ReviewAppProject.Exceptions;
using ReviewAppProject.Models;
using ReviewAppProject.Services;
using ReviewAppProject.ViewModels;
using System;

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
        public async IAsyncEnumerable<FacultyViewModel> GetAllFacultiesAsync()
        {
            var faculties = _service.GetAllFacultiesAsync();

            await foreach (var faculty in faculties)
            {
                yield return new FacultyViewModel(faculty);
            }
        }

        [HttpGet("{universityId}/All")]
        public async IAsyncEnumerable<FacultyViewModel> GetUniversityFaculties(int universityId)
        {
            var faculties = _service.GetUniversityFaculties(universityId);

            await foreach (var faculty in faculties)
            {
                yield return new FacultyViewModel(faculty);
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetFacultyByIdAsync(int id) {
            try
            {
                var faculty = await _service.GetFacultyByIdAsync(id);
                var viewModel = new FacultyViewModel(faculty);
                return Ok(viewModel);
            }
            catch (FacultyNotFoundException)
            {
                return NotFound();
            }
            catch (Exception ex) {
                return StatusCode(500, ex.StackTrace);
            }
        }

        [HttpPost("Create")]
        public async Task<IActionResult> CreateFacultyAsync(FacultyCreateModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest("Invalid model object");

            (bool created, Exception? exception) = await _service.CreateFacultyAsync(model);

            if (created && exception is null) return Ok();

            if (exception is ArgumentException)
                return BadRequest(exception.Message);
            else if (exception is UniversityNotFoundException)
                return BadRequest("University not found.");
            else if (exception is FacultyWithNameExistsException)
                return BadRequest("Faculty with provided name exists.");
            else
                return StatusCode(500, "Internal server error");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateFacultyAsync(int id, FacultyCreateModel model) {
            if (!ModelState.IsValid) {
                return BadRequest("Model is not valid");
            }

            (bool updated, Exception? exception) = await _service.UpdateFacultyAsync(id, model);

            if (updated && exception is null) return Ok();

            if (exception is ArgumentException)
                return BadRequest(exception.Message);
            else if (exception is UniversityNotFoundException)
                return BadRequest("University not found.");
            else if (exception is FacultyNotFoundException)
                return BadRequest("Faculty not found.");
            else
                return StatusCode(500, exception.StackTrace);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFacultyAsync(int id) {
            (bool deleted, Exception? e) = await _service.DeleteFacultyAsync(id);

            if (deleted && e is null) return Ok();

            if (e is FacultyNotFoundException) return BadRequest("Faculty Not Found");
            else return StatusCode(500, e.StackTrace);
        }
    }
}
