using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReviewAppProject.Data.Models;
using ReviewAppProject.Data.Repository.Interfaces;
using ReviewAppProject.Exceptions;
using ReviewAppProject.Models;

namespace ReviewAppProject.Data.Repository
{
    public class ProfessorRepository : IProfessorRepository
    {
        private readonly AppDbContext _context;

        public ProfessorRepository(AppDbContext context)
        {
            _context = context;
        }

        public async IAsyncEnumerable<Professor> GetAllProfessorsAsync()
        {
            var professors = _context.Professors
                .OrderBy(prof => prof.ProfessorId)
                .Include(prof => prof.Courses)
                .Include(prof => prof.Faculty)
                .AsAsyncEnumerable();

            await foreach (var professor in professors)
            {
                yield return professor;
            }
        }

        public async IAsyncEnumerable<Professor> GetProfessorsWithPatternAsync(string pattern)
        {
            var professors = _context.Professors.
                Where(p => p.FirstName.StartsWith(pattern) || p.LastName.StartsWith(pattern))
                .Include(p => p.University)
                .Include(p => p.Faculty)
                .Include(p => p.Courses)
                .ThenInclude(cp => cp.Course)
                .AsAsyncEnumerable();

            await foreach (var professor in professors)
            {
                yield return professor;
            }
        }

        public async IAsyncEnumerable<Professor> GetProfessorsInUniversityWithPatternAsync(int universityId, string pattern)
        {
            var professors = _context.Professors
                .Where(p => p.UniversityId == universityId)
                .Where(p => p.FirstName.StartsWith(pattern) || p.LastName.StartsWith(pattern))
                .Include(p => p.University)
                .Include(p => p.Faculty)
                .Include(p => p.Courses)
                .ThenInclude(cp => cp.Course)
                .AsAsyncEnumerable();

            await foreach (var professor in professors)
            {
                yield return professor;
            }
        }
        public async Task<Professor> GetProfessorByEmailAsync(string email)
        {
            return await _context.Professors
                .Where(p => p.Email.Equals(email))
                .Include(p => p.Faculty)
                .Include(p => p.Courses)
                .FirstOrDefaultAsync()
                ?? throw new ProfessorNotFoundException();

        }

        public async Task<Professor> GetProfessorByIdAsync(int id)
        {
            return await _context.Professors
                .Where(p => p.ProfessorId == id)
                .Include(p => p.Faculty)
                .Include(p => p.Courses)
                .FirstOrDefaultAsync()
                ?? throw new ProfessorNotFoundException();

        }

        public async Task<bool> CreateProfessorAsync(ProfessorCreateModel pModel)
        {
            if (pModel == null) { throw new ArgumentException(); }
            Professor professor;
            try
            {
                professor = await GetProfessorByEmailAsync(pModel.Email);
                if (professor != null) throw new ProfessorWithEmailExistsException();
                return false;
            }
            catch (ProfessorNotFoundException)
            {
                professor = new Professor
                {
                    FirstName = pModel.FirstName,
                    LastName = pModel.LastName,
                    Email = pModel.Email,
                    FacultyId = pModel.FacultyId,
                    WouldTakeAgainPercentage = 0.0,
                    DifficultyPercentage = 0.0,
                    Rating = 0.0,
                    ReviewsCount = 0
                };

                _context.Professors.Add(professor);
                await _context.SaveChangesAsync();

                return true;
            }

        }

        public async Task Update(Professor professor)
        {
            _context.Professors.Attach(professor);
            _context.Entry(professor).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task<Professor> GetProfessorByIdWithReviews(int professorId)
        {
            return await _context.Professors
                .Where(p => p.ProfessorId == professorId)
                .Include(p => p.Courses)
                .Include (p => p.Reviews)
                .FirstOrDefaultAsync()
               
                ?? throw new ProfessorNotFoundException();
        }
    }
}
