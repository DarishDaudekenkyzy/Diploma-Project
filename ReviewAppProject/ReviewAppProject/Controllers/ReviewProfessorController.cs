using Microsoft.AspNetCore.Mvc;
using ReviewAppProject.Data.Models;
using ReviewAppProject.Exceptions;
using ReviewAppProject.Models;
using ReviewAppProject.Services;

namespace ReviewAppProject.Controllers
{
    [ApiController]
    [Route("ReviewProfessor")]
    public class ReviewProfessorController : Controller
    {
        private readonly ReviewProfessorService _service;

        public ReviewProfessorController(ReviewProfessorService service)
        {
            _service = service;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetReviewProfessorById(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid model object");
            }
            (ReviewProfessor? rp, Exception? exception) = await _service.GetReviewByIdAsync(id);

            if (rp != null && exception is null) return Ok(rp);

            if (exception is ArgumentException)
                return BadRequest(exception.Message);
            else if (exception is ReviewNotFoundException)
                return BadRequest("Review with provided id doesn't exist.");
            else
                return StatusCode(500, "Internal server error");
        }

        [HttpGet("All")]
        public async IAsyncEnumerable<ReviewProfessor> GetAllProfessorsAsync()
        {
            var reviews = _service.GetAllReviewsAsync();

            await foreach (var review in reviews)
            {
                yield return review;
            }
        }
        [HttpGet("Professor/{id}")]
        public async IAsyncEnumerable<ReviewProfessor> GetAllReviewsWithProfessorAsync(int professorId)
        {
            var reviews = _service.GetAllReviewsWithProfessorAsync(professorId);

            await foreach (var r in reviews)
            {
                yield return r;
            }
        }

        [HttpGet("User/{id}")]
        public async IAsyncEnumerable<ReviewProfessor> GetAllReviewsOfUserAsync(int userId)
        {
            var reviews = _service.GetAllReviewsOfUserAsync(userId);

            await foreach (var r in reviews)
            {
                yield return r;
            }
        }


        [HttpPost("Create")]
        public async Task<IActionResult> CreateReviewProfessorAsync(ReviewProfessorCreateModel rpModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid model object");
            }
            (ReviewProfessor? rp, Exception? exception) = await _service.CreateReviewProfessorAsync(rpModel);

            if (rp != null && exception is null) return Ok(rp);

            if (exception is ArgumentException)
                return BadRequest(exception.Message);
            else if (exception is ReviewProfessorByUserExistsException)
                return BadRequest("The review for this professor and this course by current user is already exists.");
            else
                return StatusCode(500, exception.StackTrace);
        }
    }
}
