using ReviewAppProject.Data.Models;
using ReviewAppProject.Data.Repository.Interfaces;
using ReviewAppProject.Exceptions;
using ReviewAppProject.Models;

namespace ReviewAppProject.Services
{
    public class UserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async IAsyncEnumerable<User> GetAllUsersAsync()
        {
            var users = _userRepository.GetAllUsersAsync();

            await foreach (var user in users)
            {
                yield return user;
            }
        }

        public async Task<(User?, Exception?)> CreateUserAsync(UserCreateModel userModel)
        {
            try
            {
                bool result = await _userRepository.CreateUserAsync(userModel);

                var user = await _userRepository.GetUserByEmailAsync(userModel.Email);
                return (user, null);
            }
            catch (ArgumentException e)             { return (null, e); }
            catch (UserWithEmailExistsException e)  { return (null, e); }
            catch (Exception e)                     { return (null, e); }
        }

        public async Task<(User?, Exception?)> SignInUserAsync(UserSignInModel userSignInModel) 
        {
            try
            {
                var user = await _userRepository.GetUserByEmailAsync(userSignInModel.Email);
                if (!user.Password.Equals(userSignInModel.Password)) {
                    return (user, new WrongPasswordException());
                }
                return (user, null);
            }
            catch (ArgumentException e) { return (null, e); }
            catch (UserNotFoundException e) { return (null, e); }
            catch (Exception e) { return (null, e); }
        }
    }
}
