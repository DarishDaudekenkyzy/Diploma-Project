using Microsoft.EntityFrameworkCore;
using ReviewAppProject.Data.Models;
using ReviewAppProject.Data.Repository.Interfaces;

namespace ReviewAppProject.Data.Repository
{
    public class UniversityRepository : IUniversityRepository
    {
        private readonly AppDbContext _context;

        public UniversityRepository(AppDbContext context)
        {
            _context = context;
        }
        public async IAsyncEnumerable<University> GetAllUniversitiesAsync()
        {
            var universities = _context.Universities.OrderBy(u => u.Id)
                .AsAsyncEnumerable();

            await foreach (var university in universities) {
                yield return university;
            }
        }

        public async IAsyncEnumerable<University> GetUniversitiesStartingWithPatternAsync(string searchInput)
        {
            var universities = _context.Universities
                .Where(u => u.Name.StartsWith(searchInput) || u.Acronym.StartsWith(searchInput))
                .OrderBy(u => u.Id)
                .AsAsyncEnumerable();

            await foreach (var university in universities)
            {
                yield return university;
            }
        }
    }
}
