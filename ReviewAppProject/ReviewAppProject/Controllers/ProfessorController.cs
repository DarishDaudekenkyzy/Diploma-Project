using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using ReviewAppProject.Data.Models;
using ReviewAppProject.Data.Repository;
using ReviewAppProject.Exceptions;
using ReviewAppProject.Models;
using ReviewAppProject.Services;
using ReviewAppProject.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ReviewAppProject.Controllers
{
    [ApiController]
    [Route("Professor")]
    public class ProfessorController : Controller
    {
        private readonly ProfessorService _service;

        public ProfessorController(ProfessorService service)
        {
            _service = service;
        }

        [HttpGet("All")]
        public async IAsyncEnumerable<ProfessorViewModel> GetAllProfessorsAsync()
        {
            var professors = _service.GetAllProfessorsAsync();

            await foreach (var professor in professors)
            {
                yield return new ProfessorViewModel(professor);
            }
        }

        [HttpGet("Faculty/{facultyId}")]
        public async IAsyncEnumerable<ProfessorViewModel> GetProfessorsInFacultyAsync(int facultyId)
        {
            var professors = _service.GetProfessorsInFacultyAsync(facultyId);

            await foreach (var professor in professors)
            {
                yield return new ProfessorViewModel(professor);
            }
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetProfessorById(int id)
        {
            if (id < 0)
                return BadRequest("id is less than zero");

            (Professor? professor, Exception? exception) = await _service.GetProfessorById(id);

            if (professor != null && exception is null)
            {
                var profViewModel = new ProfessorViewModel(professor);
                return Ok(profViewModel);
            }

            if (exception is ArgumentException) return BadRequest(exception.Message);
            else if (exception is ProfessorNotFoundException) return BadRequest("Professor with provided id doesn't exist.");
            else return StatusCode(500, "Internal server error");
        }

        [HttpGet("Search/{searchInput}")]
        public async IAsyncEnumerable<ProfessorViewModel> GetProfessorsWithPatternAsync(string searchInput)
        {
            
            var professors = _service.GetProfessorsWithPatternAsync(searchInput);

            await foreach (var professor in professors)
            {
                yield return new ProfessorViewModel(professor);
            }
        }

        [HttpGet("Search/University/{universityId}/{searchInput}")]
        public async IAsyncEnumerable<ProfessorViewModel> GetProfessorsInUniversityWithPatternAsync(int universityId, string searchInput)
        {

            var professors = _service.GetProfessorsInUniversityWithPatternAsync(universityId, searchInput);

            await foreach (var professor in professors)
            {
                yield return new ProfessorViewModel(professor);
            }
        }

        [HttpGet("Search/Faculty/{facultyId}/{searchInput}")]
        public async IAsyncEnumerable<ProfessorViewModel> GetProfessorsInFacultyWithPatternAsync(int facultyId, string searchInput)
        {

            var professors = _service.GetProfessorsInFacultyWithPatternAsync(facultyId, searchInput);

            await foreach (var professor in professors)
            {
                yield return new ProfessorViewModel(professor);
            }
        }

        [HttpGet("Course/{courseId}")]
        public async IAsyncEnumerable<ProfessorViewModel> GetProfessorsInCourseAsync(int courseId) {
            var professors = _service.GetProfessorsInCourseAsync(courseId);

            await foreach (var professor in professors)
            {
                yield return new ProfessorViewModel(professor);
            }
        }

        [HttpPost("Create")]
        public async Task<IActionResult> CreateProfessorAsync(ProfessorCreateModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest("Invalid model object");

            (bool created, Exception? exception) = await _service.CreateProfessorAsync(model);

            if (created && exception is null) return Ok();

            if (exception is ArgumentException)
                return BadRequest(exception.Message);
            else if (exception is ProfessorWithEmailExistsException)
                return BadRequest("Professor with provided email exists.");
            else
                return StatusCode(500, "Internal server error");
        }

        [HttpPut("{professorId}")]
        public async Task<IActionResult> UpdateProfessorAsync(int professorId, ProfessorCreateModel model) {
            if (!ModelState.IsValid) 
                return BadRequest("Invalid Model");

            (bool updated, Exception? e) = await _service.UpdateProfessorAsync(professorId, model);

            if (updated && e == null) return Ok();

            if (e is ArgumentException)
                return BadRequest(e.Message);
            else if (e is ProfessorNotFoundException) return NotFound();
            else if (e is ProfessorWithEmailExistsException)
                return BadRequest("Professor with provided email exists.");
            else
                return StatusCode(500, e.StackTrace);
        }

        [HttpDelete("{professorId}")]
        public async Task<IActionResult> DeleteProfessorAsync(int professorId)
        {
            (bool deleted, Exception? e) = await _service.DeleteProfessorAsync(professorId);

            if (deleted && e == null) return Ok();

            if (e is ProfessorNotFoundException) return NotFound();
            else return StatusCode(500, e.StackTrace);
        }
    }
}
