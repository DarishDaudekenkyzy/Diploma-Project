using Microsoft.AspNetCore.Mvc;
using ReviewAppProject.Data.Models;
using ReviewAppProject.Models;

namespace ReviewAppProject.Data.Repository.Interfaces
{
    public interface IUserRepository
    {
        public IAsyncEnumerable<User> GetAllUsersAsync();
        public Task<User> GetUserByIdAsync(int id);
        public Task<User> GetUserByEmailAsync(string email);
        public Task<bool> CreateUserAsync(UserCreateModel user);
        public Task<bool> UpdateUserAsync(int id, UserCreateModel user);
    }
}
