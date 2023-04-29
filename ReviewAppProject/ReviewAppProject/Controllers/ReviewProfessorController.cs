using Microsoft.AspNetCore.Mvc;
using ReviewAppProject.Data.Models;
using ReviewAppProject.Exceptions;
using ReviewAppProject.Models;
using ReviewAppProject.Services;
using ReviewAppProject.ViewModels;

namespace ReviewAppProject.Controllers
{
    [ApiController]
    [Route("ProfessorReviews")]
    public class ReviewProfessorController : Controller
    {
        private readonly ReviewProfessorService _service;

        public ReviewProfessorController(ReviewProfessorService service)
        {
            _service = service;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetReviewById(int id)
        {
            (ReviewProfessor? rp, Exception? exception) = await _service.GetReviewByIdAsync(id);


            if (rp != null && exception is null)
            {
                var reviewViewModel = new ReviewProfessorViewModel(rp);
                return Ok(reviewViewModel);
            }

            if (exception is ArgumentException)
                return BadRequest(exception.Message);
            else if (exception is ReviewNotFoundException)
                return BadRequest("Review Not Found");
            else
                return StatusCode(500, "Internal server error");
        }

        [HttpGet("All")]
        public async IAsyncEnumerable<ReviewProfessorViewModel> GetAllReviewsAsync()
        {
            var reviews = _service.GetAllReviewsAsync();

            await foreach (var review in reviews)
            {
                yield return new ReviewProfessorViewModel(review);
            }
        }

        [HttpGet("Professor/{professorId}")]
        public async IAsyncEnumerable<ReviewProfessorViewModel> GetReviewsOfProfessor(int professorId)
        {
            var reviews = _service.GetReviewsOfProfessorAsync(professorId);

            await foreach (var review in reviews)
            {
                yield return new ReviewProfessorViewModel(review);
            }
        }

        [HttpGet("User/{userId}")]
        public async IAsyncEnumerable<ReviewProfessorViewModel> GetReviewsOfUser(int userId)
        {
            var reviews = _service.GetReviewsOfUserAsync(userId);

            await foreach (var review in reviews)
            {
                yield return new ReviewProfessorViewModel(review);
            }
        }

        [HttpGet("Course/{courseId}")]
        public async IAsyncEnumerable<ReviewProfessorViewModel> GetReviewsOfCourse(int courseId) {
            var reviews = _service.GetReviewsOfCourseAsync(courseId);

            await foreach (var review in reviews)
            {
                yield return new ReviewProfessorViewModel(review);
            }
        }

        [HttpPost("Create")]
        public async Task<IActionResult> CreateReviewProfessorAsync(ReviewProfessorCreateModel rpModel)
        {
            if (!ModelState.IsValid) return BadRequest("Invalid model object");

            (bool created, Exception? e) = await _service.CreateReviewProfessorAsync(rpModel);

            if (created && e is null) return Ok();

            if (e is ArgumentException)
                return BadRequest(e.Message);
            else if (e is ReviewProfessorByUserExistsException)
                return BadRequest("The review for this professor and this course by current user is already exists.");
            else
                return StatusCode(500, e.StackTrace);
        }

        [HttpPut("Like/{reviewId}/{userId}")]
        public async Task<IActionResult> LikeReviewAsync(int reviewId, int userId) {
            (bool liked, Exception? e) = await _service.LikeReviewAsync(reviewId, userId);

            if (liked && e is null) return Ok();

            if (e is UserNotFoundException) return BadRequest("User not found");
            else if (e is ReviewNotFoundException) return BadRequest("Review not found");
            else if (e is AlreadyLikedException) return BadRequest("Already liked");
            else return StatusCode(500, e.StackTrace);
        }

        [HttpPut("Dislike/{reviewId}/{userId}")]
        public async Task<IActionResult> DislikeReviewAsync(int reviewId, int userId)
        {
            (bool disliked, Exception? e) = await _service.DislikeReviewAsync(reviewId, userId);

            if (disliked && e is null) return Ok();

            if (e is UserNotFoundException) return BadRequest("User not found");
            else if (e is ReviewNotFoundException) return BadRequest("Review not found");
            else if (e is AlreadyDislikedException) return BadRequest("Already disliked");
            else return StatusCode(500, e.StackTrace);
        }

        [HttpDelete("{reviewId}")]
        public async Task<IActionResult> DeleteReviewByIdAsync(int reviewId) {
            (bool deleted, Exception? exception) = await _service.DeleteReviewAsync(reviewId);

            if (deleted && exception == null) return Ok();

            if (exception is ReviewNotFoundException) return BadRequest("Review not found");
            else return StatusCode(500, exception.StackTrace);
        }

        [HttpGet("IsLiked/{userId}/{reviewId}")]
        public async Task<IActionResult> IsReviewLikedByUser(int userId, int reviewId)
        {
            (bool liked, Exception? e) = await _service.IsReviewLikedByUser(userId, reviewId);

            if (e is null) return Ok(liked);

            if (e is UserNotFoundException) return BadRequest("User Not Found");
            else if (e is ReviewNotFoundException) return BadRequest("Review Not Found");
            else return StatusCode(500, e.StackTrace);
        }

        [HttpGet("IsDisliked/{userId}/{reviewId}")]
        public async Task<IActionResult> IsReviewDislikedByUser(int userId, int reviewId)
        {
            (bool liked, Exception? e) = await _service.IsReviewDislikedByUser(userId, reviewId);

            if (e is null) return Ok(liked);

            if (e is UserNotFoundException) return BadRequest("User Not Found");
            else if (e is ReviewNotFoundException) return BadRequest("Review Not Found");
            else return StatusCode(500, e.StackTrace);
        }

        [HttpGet("IsSaved/{userId}/{reviewId}")]
        public async Task<IActionResult> IsReviewSavedByUserAsync(int userId, int reviewId) {
            (bool saved, Exception? e) = await _service.IsReviewSavedByUserAsync(userId, reviewId);

            if (e is null) return Ok(saved);

            if (e is UserNotFoundException) return BadRequest("User Not Found");
            else if (e is ReviewNotFoundException) return BadRequest("Review Not Found");
            else return StatusCode(500, e.StackTrace);
        }

        [HttpPut("Save/{userId}/{reviewId}")]
        public async Task<IActionResult> SaveReviewAsync(int userId, int reviewId) {
            (bool saved, Exception? e) = await _service.SaveReviewAsync(userId, reviewId);

            if (saved && e is null) return Ok(saved);

            if (e is UserNotFoundException) return BadRequest("User Not Found");
            else if (e is ReviewNotFoundException) return BadRequest("Review Not Found");
            else return StatusCode(500, e.StackTrace);
        }

        [HttpPut("Unsave/{userId}/{reviewId}")]
        public async Task<IActionResult> UnsaveReviewAsync(int userId, int reviewId)
        {
            (bool unsaved, Exception? e) = await _service.UnsaveReviewAsync(userId, reviewId);

            if (unsaved && e is null) return Ok(unsaved);

            if (e is UserNotFoundException) return BadRequest("User Not Found");
            else if (e is ReviewNotFoundException) return BadRequest("Review Not Found");
            else return StatusCode(500, e.StackTrace);
        }

        [HttpGet("{userId}/Saved")]
        public async IAsyncEnumerable<ReviewProfessorViewModel> GetSavedReviewsOfUser(int userId) {
            var reviews = _service.GetSavedReviewsOfUser(userId);

            await foreach(var review in reviews)
            {
                yield return new ReviewProfessorViewModel(review);
            }
        }

    }
}
