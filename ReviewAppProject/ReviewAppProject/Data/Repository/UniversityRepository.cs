using Microsoft.EntityFrameworkCore;
using ReviewAppProject.Data.Models;
using ReviewAppProject.Data.Repository.Interfaces;
using ReviewAppProject.Models;
using ReviewAppProject.Exceptions;
using Microsoft.Identity.Client;

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

        public async Task<University> GetUniversityByNameAsync(string name) {
            return await _context.Universities
                .Where(u => u.Name.Equals(name))
                .FirstOrDefaultAsync()
                ?? throw new UniversityNotFoundException();
        }

        /*GET BY ID*/
        public async Task<University> GetUniversityByIdAsync(int id)
        {
            return await _context.Universities
                .Where(u => u.Id == id)
                .Include(u => u.Faculties)
                .FirstOrDefaultAsync()
                ?? throw new UniversityNotFoundException();
        }

        public async Task CreateUniversityAsync(UniversityCreateModel model) {
            var university = new University
            {
                Name = model.Name,
                Acronym = model.Acronym,
                Description = model.Description
            };
            await _context.Universities.AddAsync(university);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateUniversityAsync(University uni, UniversityUpdateModel model) {

            if(model.Name != null && !uni.Name.Equals(model.Name))
                uni.Name = model.Name;
            if(model.Description != null && !uni.Description.Equals(model.Description))
                uni.Description = model.Description;
            if (model.Acronym != null && !uni.Acronym.Equals(model.Acronym))
                uni.Acronym = model.Acronym;

            _context.Entry(uni).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteUniversityAsync(University uni) {

            _context.Universities.Remove(uni);
            _context.Entry(uni).State = EntityState.Deleted;
            await _context.SaveChangesAsync();
        }
    }
}
