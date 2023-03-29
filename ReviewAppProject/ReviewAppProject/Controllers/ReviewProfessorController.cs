using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using ReviewAppProject.Data.Models.Review;
using ReviewAppProject.Exceptions;
using ReviewAppProject.Models;
using ReviewAppProject.Services;
using ReviewAppProject.ViewModels;
using Serilog;

namespace ReviewAppProject.Controllers
{
    [ApiController]
    [Route("Reviews")]
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
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid model object");
            }
            (ReviewProfessor? rp, Exception? exception) = await _service.GetReviewByIdAsync(id);


            if (rp != null && exception is null)
            {
                var reviewViewModel = new ReviewProfessorViewModel(rp);
                return Ok(reviewViewModel);
            }

            if (exception is ArgumentException)
                return BadRequest(exception.Message);
            else if (exception is ReviewNotFoundException)
                return BadRequest("Review with provided id doesn't exist.");
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

        [HttpPost("like_dislike")]
        public async Task<IActionResult> LikeReviewAsync(ReviewProfessorLikeDislikeModel model) {
            if (ModelState.IsValid) {
                (bool done, Exception? exception) = await _service.LikeDislikeReview(model);

                if (done && exception is null)
                {
                    (int likes, int dislikes) result = (await _service.GetLikes(model.ReviewId), await _service.GetDislikes(model.ReviewId));
                    return Ok(result);
                }

                if (exception is UserNotFoundException) return BadRequest("User not found");
                else if (exception is ReviewNotFoundException) return BadRequest("Review not found");
                else if (exception is AlreadyDislikedException) return BadRequest("Already disliked");
                else if (exception is AlreadyLikedException) return BadRequest("Already liked");
                else return StatusCode(500, exception.StackTrace);
            }
            return BadRequest("Model is not valid");
        }

        [HttpDelete("Delete/{userId}/{reviewId}")]
        public async Task<IActionResult> DeleteReviewByIdAsync(int userId, int reviewId) {
            (bool deleted, Exception? exception) = await _service.DeleteUserReviewByIdAsync(userId, reviewId);

            if (deleted && exception == null) {
                return Ok();
            }

            if (exception is ReviewNotFoundException) return BadRequest("Review not found");
            if (exception is UserNotFoundException) return BadRequest("User not found");
            else return StatusCode(500, exception.StackTrace);
        }
    }
}
