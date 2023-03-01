using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReviewAppProject.Data.Models;
using ReviewAppProject.Models;
using System.Collections;
using System.ComponentModel;

namespace ReviewAppProject.Data.Repository
{
    public class UserRepository
    {
        private readonly AppDbContext _context;

        public UserRepository(AppDbContext context) 
        {
            _context = context;    
        }

        public async Task<IEnumerable<User>> GetAllUsersAsync()
        {
            return await _context.Users.OrderBy(user => user.UserId)
                .ToListAsync();
        }

        public async Task<ActionResult<User>> GetUserByEmailAndPassword(string email, string password)
        {
            var users = await _context.Users.AsQueryable()
                .Where(u => u.Email.Equals(email))
                .Where(u => u.Password.Equals(password)).ToListAsync();
            return users.FirstOrDefault();
        }

        public Task CreateUser(User user)
        {
            _context.Users.Add(user);
            return Task.CompletedTask;
        }

        public async Task SaveAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
