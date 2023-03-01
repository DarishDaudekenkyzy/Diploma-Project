using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using ReviewAppProject.Data.Models;
using ReviewAppProject.Data.Repository;
using ReviewAppProject.Models;

namespace ReviewAppProject.Controllers
{
    [ApiController]
    [Route("Professor")]
    public class ProfessorController : Controller
    {
        private readonly ProfessorRepository _repository;

        public ProfessorController(ProfessorRepository repository)
        {
            _repository = repository;
        }

        [HttpGet("All")]
        public async Task<IActionResult> GetAllUsersAsync()
        {
            try
            {
                var professors = await _repository.GetAllProfessorsAsync();
                return Ok(professors);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("Search/{searchInput}")]
        public async Task<ActionResult<IEnumerable<Professor>>> Search(string searchInput)
        {
            try
            {
                if (searchInput.IsNullOrEmpty())
                {
                    return BadRequest("Input is empty");
                }
                var professors = await _repository.Search(searchInput);

                if (professors.Any())
                {
                    return Ok(professors);
                }
                return NotFound();
            }
            catch (Exception ex) {
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost("Register")]
        public async Task<IActionResult> CreateProfessorAsync(ProfessorCreateModel postModel)
        {
            try
            {
                if (postModel == null)
                {
                    return BadRequest("Professor Object is null");
                }
                if (!ModelState.IsValid)
                {
                    return BadRequest("Invalid model object");
                }
                var professor = new Professor
                {
                    FirstName = postModel.FirstName,
                    LastName = postModel.LastName,
                    Email = postModel.Email,
                    FacultyId = postModel.FacultyId
                };
                await _repository.CreateProfessor(professor);
                await _repository.SaveAsync();

                return Ok(professor);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
