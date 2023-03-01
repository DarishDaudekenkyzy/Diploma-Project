using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReviewAppProject.Data.Models;

namespace ReviewAppProject.Data.Repository
{
    public class ProfessorRepository
    {
        private readonly AppDbContext _context;

        public ProfessorRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Professor>> GetAllProfessorsAsync()
        {
            return await _context.Professors.OrderBy(p => p.ProfessorId)
                .ToListAsync();
        }

        public Task CreateProfessor(Professor professor)
        {
            _context.Professors.Add(professor);
            return Task.CompletedTask;
        }

        public async Task<IEnumerable<Professor>> Search(string name)
        {
            IQueryable<Professor> professors = _context.Professors;

            if (!string.IsNullOrEmpty(name)) { 
                professors = professors.Where(p => p.FirstName.Contains(name)
                || p.LastName.Contains(name));
            }

            return await professors.ToListAsync();
        }

        public async Task SaveAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
