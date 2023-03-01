using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReviewAppProject.Data.Models;

namespace ReviewAppProject.Data.Repository
{
    public class FacultyRepository
    {
        private readonly AppDbContext _context;

        public FacultyRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Faculty>> GetAllFacultiesAsync()
        {
            return await _context.Faculties.OrderBy(f => f.FacultyId)
                .ToListAsync();
        }

        public Task CreateFaculty(Faculty faculty)
        {
            _context.Faculties.Add(faculty);
            return Task.CompletedTask;
        }

        public async Task SaveAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
