using Microsoft.AspNetCore.Mvc;
using ReviewAppProject.Data.Models;
using ReviewAppProject.Data.Repository;
using ReviewAppProject.Models;

namespace ReviewAppProject.Controllers
{
    [ApiController]
    [Route("User")]
    public class UserController : Controller
    {
        private readonly UserRepository _userRepository;

        public UserController(UserRepository userRepository) {
            _userRepository = userRepository;
        }

        [HttpGet("All")]
        public async Task<IActionResult> GetAllUsersAsync()
        {
            try
            {
                var users = await _userRepository.GetAllUsersAsync();
                return Ok(users);
            }
            catch (Exception ex) {
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost("register")]
        public async Task<IActionResult> CreateUserAsync(UserPostModel postModel)
        {
            try
            {
                if (postModel == null)
                {
                    return BadRequest("UserObject is null");
                }
                if (!ModelState.IsValid)
                {
                    return BadRequest("Invalid model object");
                }
                var user = new User
                {
                    FirstName = postModel.FirstName,
                    LastName = postModel.LastName,
                    Email = postModel.Email,
                    Password = postModel.Password
                };
                await _userRepository.CreateUser(user);
                await _userRepository.SaveAsync();

                return Ok(user);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("signin")]
        public async Task<IActionResult> SignInUserAsync(UserSignInModel signInModel)
        {
            try
            {
                if (signInModel == null)
                {
                    return BadRequest("UserObject is null");
                }
                if (!ModelState.IsValid)
                {
                    return BadRequest("Invalid model object");
                }
                
                var user = await _userRepository.GetUserByEmailAndPassword(signInModel.Email, signInModel.Password);
                if (user.Value == null)
                {
                    return BadRequest($"User not found, {signInModel.Email} {signInModel.Password}");
                }
                return Ok(user);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
