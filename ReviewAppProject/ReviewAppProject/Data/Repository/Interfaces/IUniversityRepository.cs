using ReviewAppProject.Data.Models;
using ReviewAppProject.Models;

namespace ReviewAppProject.Data.Repository.Interfaces
{
    public interface IUniversityRepository
    {
        /*GET*/
        public IAsyncEnumerable<University> GetAllUniversitiesAsync();
        public IAsyncEnumerable<University> GetUniversitiesStartingWithPatternAsync(string searchInput);

        public Task<University> GetUniversityByNameAsync(string name);
        public Task<University> GetUniversityByIdAsync(int id);

        /*CREATE*/
        public Task CreateUniversityAsync(UniversityCreateModel model);

        /*UPDATE|*/
        public Task UpdateUniversityAsync(University uni, UniversityUpdateModel model);
        public Task UpdateReviewAddedAsync(University uni);
        public Task UpdateReviewDeletedAsync(University uni);

        /*DELETE*/
        public Task DeleteUniversityAsync(University uni);
    }
}
