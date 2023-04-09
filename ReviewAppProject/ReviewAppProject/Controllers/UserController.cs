using Microsoft.AspNetCore.Mvc;
using ReviewAppProject.Data.Models;
using ReviewAppProject.Data.Repository;
using ReviewAppProject.Exceptions;
using ReviewAppProject.Models;
using ReviewAppProject.Services;
using ReviewAppProject.ViewModels;

namespace ReviewAppProject.Controllers
{
    [ApiController]
    [Route("User")]
    public class UserController : Controller
    {
        private readonly UserService _service;

        public UserController(UserService service) {
            _service = service;
        }

        [HttpGet("All")]
        public async IAsyncEnumerable<UserViewModel> GetAllUsersAsync()
        {
            var users = _service.GetAllUsersAsync();

            await foreach (var user in users)
            {
                yield return new UserViewModel(user);
            }
        }

        [HttpGet("Search/{searchInput}")]
        public async IAsyncEnumerable<UserViewModel> GetUsersWithPatternAsync(string searchInput) {
            var users = _service.GetUsersWithPatternAsync(searchInput);

            await foreach (var user in users) {
                yield return new UserViewModel(user);
            }
        }

        [HttpPost("Create")]
        public async Task<IActionResult> CreateUserAsync(UserCreateModel postModel)
        {
            if (!ModelState.IsValid) return BadRequest("Invalid model object");

            (User? user, Exception? exception) = await _service.CreateUserAsync(postModel);

            if (user != null && exception is null) return Ok(user);

            if (exception is ArgumentException)
                return BadRequest(exception.Message);
            else if (exception is UserWithEmailExistsException)
                return BadRequest("User with provided email exists.");
            else
                return StatusCode(500, "Internal server error");
        }

        [HttpPost("SignIn")]
        public async Task<IActionResult> SignInUserAsync(UserSignInModel signInModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid model object");
            }
            (User? user, Exception? exception) = await _service.SignInUserAsync(signInModel);

            if (user != null && exception is null) return Ok(user);

            if (exception is ArgumentException)
                return BadRequest(exception.Message);
            else if (exception is UserNotFoundException)
                return BadRequest("User with provided email not found.");
            else if (exception is WrongPasswordException)
                return BadRequest("Wrong password.");
            else
                return StatusCode(500, "Internal server error");
        }

        [HttpDelete("{userId}")]
        public async Task<IActionResult> DeleteUserAsync(int userId) {
            (bool deleted, Exception? e) = await _service.DeleteUserAsync(userId);

            if (deleted && e is null) return Ok();

            if (e is UserNotFoundException) return NotFound();
            else return StatusCode(500, e.StackTrace);
        }
    }
}
