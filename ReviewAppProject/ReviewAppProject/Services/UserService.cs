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

        public async IAsyncEnumerable<User> GetUsersWithPatternAsync(string pattern) {
            var users = _userRepository.GetUsersWithPatternAsync(pattern);

            await foreach (var user in users) {
                yield return user;
            }
        }

        public async Task<(User?, Exception?)> CreateUserAsync(UserCreateModel userModel)
        {
            try
            {
                if (!await _userRepository.IsUserWithEmailExists(userModel.Email))
                {
                    var user = await _userRepository.CreateUserAsync(userModel);

                    return (user, null);
                }
                else throw new UserWithEmailExistsException();
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
                } else return (user, null);
            }
            catch (ArgumentException e) { return (null, e); }
            catch (UserNotFoundException e) { return (null, e); }
            catch (Exception e) { return (null, e); }
        }

        public async Task<(bool, Exception?)> DeleteUserAsync(int userId) {
            try
            {
                var user = await _userRepository.GetUserByIdAsync(userId);
                await _userRepository.DeleteUserAsync(user);
                return (true, null);
            }
            catch (UserNotFoundException e) { return (false, e); }
            catch (Exception e) { return (false, e); }
        }
    }
}
