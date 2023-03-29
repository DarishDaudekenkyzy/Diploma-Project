using ReviewAppProject.Data.Models;
using ReviewAppProject.Data.Repository.Interfaces;

namespace ReviewAppProject.Services
{
    public class UniversityService
    {
        private readonly IUniversityRepository _repository;

        public UniversityService(IUniversityRepository repository)
        {
            _repository = repository;
        }

        public async IAsyncEnumerable<University> GetAllUniversitiesAsync() { 
            var universities = _repository.GetAllUniversitiesAsync();

            await foreach (var university in universities) { 
                yield return university;
            }
        }

        public async IAsyncEnumerable<University> GetUniversitiesStartingWithPatternAsync(string searchInput) {
            var universities = _repository.GetUniversitiesStartingWithPatternAsync(searchInput);

            await foreach (var university in universities)
            {
                yield return university;
            }
        }
    }
}
