using Microsoft.EntityFrameworkCore;
using ReviewAppProject.Data.Models;
using ReviewAppProject.Data.Repository.Interfaces;
using ReviewAppProject.Exceptions;
using ReviewAppProject.Models;

namespace ReviewAppProject.Data.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly AppDbContext _context;

        public UserRepository(AppDbContext context) 
        {
            _context = context;    
        }

        public async IAsyncEnumerable<User> GetAllUsersAsync()
        {
            var users = _context.Users
                .OrderBy(user => user.Id).AsAsyncEnumerable();

            await foreach (var user in users) {
                yield return user;
            }
        }

        public async IAsyncEnumerable<User> GetUsersWithPatternAsync(string pattern) {
            var users = _context.Users
                .Where(u => u.FirstName.StartsWith(pattern) || u.LastName.StartsWith(pattern))
                .AsAsyncEnumerable();

            await foreach (var user in users) {
                yield return user;
            }
        }

        public async Task<User> GetUserByEmailAsync(string email)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Email.Equals(email)) 
                ?? throw new UserNotFoundException();
                
        }
        
        public async Task<User> GetUserByIdAsync(int id)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Id.Equals(id)) 
                ?? throw new UserNotFoundException();
                
        }

        public async Task<User> CreateUserAsync(UserCreateModel userModel)
        {
            var user = new User
            {
                FirstName = userModel.FirstName,
                LastName = userModel.LastName,
                Email = userModel.Email,
                Password = userModel.Password,
                Year = userModel.Year,
                FacultyId = userModel.FacultyId
            };
                
            _context.Users.Add(user);
            _context.Entry(user).State = EntityState.Added;
            await _context.SaveChangesAsync();

            return (user);
        }

        public async Task UpdateUserAsync(User user, UserCreateModel model)
        {
            user.FirstName = model.FirstName;
            user.LastName = model.LastName;
            user.Email = model.Email;
            user.Password = model.Password;
            user.Year = model.Year;
            
            _context.Entry(user).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteUserAsync(User user) {
            _context.Users.Remove(user);
            _context.Entry(user).State = EntityState.Deleted;
            await _context.SaveChangesAsync();
        }

        public async Task<bool> IsUserWithEmailExists(string email) {
            return await _context.Users.Where(u => u.Email.Equals(email)).AnyAsync();
        }
    }
}
