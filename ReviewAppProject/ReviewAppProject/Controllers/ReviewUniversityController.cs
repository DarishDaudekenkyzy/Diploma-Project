using Microsoft.AspNetCore.Mvc;
using ReviewAppProject.Data.Models;
using ReviewAppProject.Exceptions;
using ReviewAppProject.Models;
using ReviewAppProject.Services;
using ReviewAppProject.ViewModels;

namespace ReviewAppProject.Controllers
{
    [ApiController]
    [Route("UniversityReviews")]
    public class ReviewUniversityController : Controller
    {
        private readonly ReviewUniversityService _service;

        public ReviewUniversityController(ReviewUniversityService service)
        {
            _service = service;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetReviewById(int id) {
            (ReviewUniversity? ru, Exception? e) = await _service.GetUniversityReviewById(id);

            if (ru != null && e == null) {
                var reviewViewModel = new ReviewUniversityViewModel(ru);
                return Ok(reviewViewModel);
            }

            if (e is ArgumentException) return BadRequest(e.Message);
            else if (e is ReviewNotFoundException) return NotFound();
            else return StatusCode(500, e.StackTrace);
        }

        [HttpGet("All")]
        public async IAsyncEnumerable<ReviewUniversityViewModel> GetAllReviewsAsync() {
            var reviews = _service.GetAllReviewsAsync();

            await foreach (var review in reviews) {
                yield return new ReviewUniversityViewModel(review);
            }
        }

        [HttpGet("User/{userId}")]
        public async IAsyncEnumerable<ReviewUniversityViewModel> GetReviewsOfUser(int userId) {
            var reviews = _service.GetAllUniversityReviewsOfUser(userId);

            await foreach (var review in reviews) {
                yield return new ReviewUniversityViewModel(review);
            }
        }

        [HttpGet("University/{uniId}")]
        public async IAsyncEnumerable<ReviewUniversityViewModel> GetReviewsOfUniversity(int uniId) {
            var reviews = _service.GetAllReviewsOfUniversityAsync(uniId);

            await foreach (var review in reviews) {
                yield return new ReviewUniversityViewModel(review);
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateReviewUniversityAsync(ReviewUniversityCreateModel model) {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            (bool created, Exception? e) = await _service.CreateUniversityReviewAsync(model);

            if (created && e is null) return Ok();

            if (e is ArgumentException) return BadRequest(e.StackTrace);
            else if (e is ReviewUniversityByUserExistsException) return BadRequest("The review for this university by this user already exists");
            else return StatusCode(500, e.StackTrace);
        }

        [HttpPut("Like/{reviewId}/{userId}")]
        public async Task<IActionResult> LikeReviewAsync(int reviewId, int userId) {
            (bool liked, Exception? e) = await _service.LikeReviewAsync(reviewId, userId);

            if (liked && e is null) return Ok();

            if (e is UserNotFoundException) return BadRequest("User Not Found");
            else if (e is ReviewNotFoundException) return BadRequest("Review Not Found");
            else return StatusCode(500, e.StackTrace);
        }

        [HttpPut("Dislike/{reviewId}/{userId}")]
        public async Task<IActionResult> DislikeReviewAsync(int reviewId, int userId) {
            (bool disliked, Exception? e) = await _service.DislikeReviewAsync(reviewId, userId);

            if (disliked && e is null) return Ok();

            if (e is UserNotFoundException) return BadRequest("User Not Found");
            else if (e is ReviewNotFoundException) return BadRequest("Review Not Found");
            else return StatusCode(500, e.StackTrace);
        }

        [HttpDelete("{reviewId}")]
        public async Task<IActionResult> DeleteReviewByIdAsync(int reviewId) { 
            (bool deleted, Exception? e) = await _service.DeleteReviewAsync(reviewId);

            if(deleted && e is null) return Ok();

            if (e is ReviewNotFoundException) return BadRequest("Review Not Found");
            else return StatusCode(500, e.StackTrace);
        }
    }
}
