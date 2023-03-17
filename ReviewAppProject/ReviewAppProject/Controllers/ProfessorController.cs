using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using ReviewAppProject.Data.Models;
using ReviewAppProject.Data.Repository;
using ReviewAppProject.Exceptions;
using ReviewAppProject.Models;
using ReviewAppProject.Services;
using ReviewAppProject.Views;
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
        public async IAsyncEnumerable<Professor> GetAllProfessorsAsync()
        {
            var professors = _service.GetAllProfessorsAsync();

            await foreach (var professor in professors)
            {
                yield return professor;
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProfessorById(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid model object");
            }
            (Professor? professor, Exception? exception) = await _service.GetProfessorById(id);

            if (professor != null && exception is null) return Ok(professor);

            if (exception is ArgumentException)
                return BadRequest(exception.Message);
            else if (exception is ProfessorNotFoundException)
                return BadRequest("Professor with provided id doesn't exist.");
            else
                return StatusCode(500, "Internal server error");
        }

        [HttpGet("Search/{searchInput}")]
        public async IAsyncEnumerable<Professor> GetProfessorsWithPatternAsync(string searchInput)
        {
            
            var professors = _service.GetProfessorsWithPatternAsync(searchInput);

            await foreach (var professor in professors)
            {
                yield return professor;
            }
        }

        [HttpPost("Create")]
        public async Task<IActionResult> CreateProfessorAsync(ProfessorCreateModel postModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid model object");
            }
            (Professor? professor, Exception? exception) = await _service.CreateProfessorAsync(postModel);

            if (professor != null && exception is null) return Ok(professor);

            if (exception is ArgumentException)
                return BadRequest(exception.Message);
            else if (exception is ProfessorWithEmailExistsException)
                return BadRequest("Professor with provided email exists.");
            else
                return StatusCode(500, "Internal server error");
        }

        [HttpGet("Reviews/{professorId}")]
        public async IAsyncEnumerable<ReviewProfessorView> GetAllReviewsWithProfessorAsync(int professorId)
        {
            var reviews = _service.GetAllReviewsWithProfessorAsync(professorId);

            await foreach (var r in reviews)
            {
                yield return r;
            }
        }
    }
}
