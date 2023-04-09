using Microsoft.AspNetCore.Mvc;
using ReviewAppProject.Data.Models;
using ReviewAppProject.Models;

namespace ReviewAppProject.Data.Repository.Interfaces
{
    public interface IUserRepository
    {
        public IAsyncEnumerable<User> GetAllUsersAsync();
        public IAsyncEnumerable<User> GetUsersWithPatternAsync(string pattern);
        public Task<User> GetUserByIdAsync(int id);
        public Task<User> GetUserByEmailAsync(string email);
        public Task<User> CreateUserAsync(UserCreateModel user);
        public Task UpdateUserAsync(User user, UserCreateModel model);

        public Task DeleteUserAsync(User user);
        public Task<bool> IsUserWithEmailExists(string email);
    }
}
