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
                .OrderBy(prof => prof.Id)
                .AsAsyncEnumerable();

            await foreach (var professor in professors)
            {
                yield return professor;
            }
        }

        public async IAsyncEnumerable<Professor> GetProfessorsInFacultyAsync(int facultyId) {
            var professors = _context.Professors
                .Where(prof => prof.FacultyId == facultyId)
                .OrderBy(prof => prof.Id)
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
                .AsAsyncEnumerable();

            await foreach (var professor in professors)
            {
                yield return professor;
            }
        }

        public async IAsyncEnumerable<Professor> GetProfessorsInUniversityWithPatternAsync(int universityId, string pattern)
        {
            var professors = _context.Professors
                .Where(p => p.Faculty.UniversityId == universityId)
                .Where(p => p.FirstName.StartsWith(pattern) || p.LastName.StartsWith(pattern))
                .AsAsyncEnumerable();

            await foreach (var professor in professors)
            {
                yield return professor;
            }
        }

        public async IAsyncEnumerable<Professor> GetProfessorsInFacultyWithPatternAsync(int facultyId, string pattern) {
            var professors = _context.Professors
                .Where(p => p.FacultyId == facultyId)
                .Where(p => p.FirstName.StartsWith(pattern) || p.LastName.StartsWith(pattern))
                .AsAsyncEnumerable();

            await foreach (var professor in professors)
            {
                yield return professor;
            }
        }

        public async IAsyncEnumerable<Professor> GetProfessorsInCourse(int courseId) {
            var professors = _context.CoursesProfessors
                .Where(cp => cp.CourseId == courseId)
                .Select(cp => cp.Professor)
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
                .FirstOrDefaultAsync()
                ?? throw new ProfessorNotFoundException();

        }

        public async Task<Professor> GetProfessorByIdAsync(int id)
        {
            return await _context.Professors
                .Where(p => p.Id == id)
                .Include(p => p.Faculty)
                .ThenInclude(p => p.University)
                .FirstOrDefaultAsync()
                ?? throw new ProfessorNotFoundException();

        }

        public async Task CreateProfessorAsync(ProfessorCreateModel pModel)
        {
            if (pModel == null) { throw new ArgumentException(); }
            
            var professor = new Professor
            {
                FirstName = pModel.FirstName,
                LastName = pModel.LastName,
                Email = pModel.Email,
                FacultyId = pModel.FacultyId,
                WouldTakeAgainPercentage = 0.0,
                DifficultyPercentage = 0.0,
                AverageRating = 0.0,
                ReviewsCount = 0
            };

            await _context.Professors.AddAsync(professor);
            _context.Entry(professor).State = EntityState.Added;
            await _context.SaveChangesAsync();

        }

        public async Task DeleteProfessorAsync(Professor professor)
        {
            _context.Entry(professor).State = EntityState.Deleted;
            _context.Professors.Remove(professor);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateProfessorAsync(Professor professor, ProfessorCreateModel model) {
            professor.FirstName = model.FirstName;
            professor.LastName = model.LastName;
            professor.Email = model.Email;
            professor.FacultyId = model.FacultyId;

            _context.Entry(professor).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task UpdateReviewAdded(Professor professor) {
            professor.ReviewsCount++;
            professor.AverageRating = await GetAverageRatingOfProfessor(professor.Id);
            professor.WouldTakeAgainPercentage = await CalculateWouldTakeAgainPercentage(professor.Id);
            professor.DifficultyPercentage = await CalculateDifficultyPercentage(professor.Id);
            _context.Entry(professor).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task UpdateReviewDeleted(Professor professor) {
            var isThereAnyReviews = await _context.ReviewProfessors.Where(rp => rp.ProfessorId == professor.Id).AnyAsync();

            if (isThereAnyReviews)
            {
                professor.ReviewsCount--;
                professor.AverageRating = await GetAverageRatingOfProfessor(professor.Id);
                professor.WouldTakeAgainPercentage = await CalculateWouldTakeAgainPercentage(professor.Id);
                professor.DifficultyPercentage = await CalculateDifficultyPercentage(professor.Id);
            }
            else
            {
                professor.ReviewsCount = 0;
                professor.AverageRating = 0.0;
                professor.WouldTakeAgainPercentage = 0.0;
                professor.DifficultyPercentage = 0.0;
            }
            _context.Entry(professor).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        private async Task<double> CalculateWouldTakeAgainPercentage(int professorId)
        {
            var reviews = _context.ReviewProfessors.Where(rp => rp.ProfessorId == professorId);
            var wouldTakeAgainCount = await reviews.Where(rp => rp.WouldTakeAgain == true).CountAsync();
            return Math.Round((double)wouldTakeAgainCount / reviews.Count() * 100.0, 2);
        }

        private async Task<double> CalculateDifficultyPercentage(int professorId)
        {
            var average = await _context.ReviewProfessors.Where(rp => rp.ProfessorId == professorId)
                .Select(rp => rp.Difficulty).AverageAsync();
            return Math.Round((average / 5.0) * 100.0, 2);
        }

        private async Task<double> GetAverageRatingOfProfessor(int professorId)
        {
            var averageRating = await _context.ReviewProfessors
            .Where(rp => rp.ProfessorId == professorId)
            .Select(rp => rp.Rating)
            .AverageAsync();
            return Math.Round(averageRating, 2);
        }
    }
}
