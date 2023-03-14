using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReviewAppProject.Data.Models;
using ReviewAppProject.Exceptions;
using ReviewAppProject.Models;
using System.Collections;
using System.ComponentModel;

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
            var users = _context.Users.OrderBy(user => user.UserId).AsAsyncEnumerable();

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
            return await _context.Users.FirstOrDefaultAsync(u => u.UserId.Equals(id)) 
                ?? throw new UserNotFoundException();
                
        }

        public async Task<bool> CreateUserAsync(UserCreateModel userModel)
        {
            if (userModel == null) { throw new ArgumentException(); }
            User user;
            try
            {
                user = await GetUserByEmailAsync(userModel.Email);
                if(user != null) throw new UserWithEmailExistsException();
                return false;
            }
            catch (UserNotFoundException) {
                user = new User
                {
                    FirstName = userModel.FirstName,
                    LastName = userModel.LastName,
                    Email = userModel.Email,
                    Password = userModel.Password,
                    Course = userModel.Course,
                    FacultyId = userModel.FacultyId
                };
                
                _context.Users.Add(user);
                await _context.SaveChangesAsync();

                return true;
            }
            
        }

        public async Task<bool> UpdateUserAsync(int id, UserCreateModel userModel)
        {
            return false;

        }
    }
}
