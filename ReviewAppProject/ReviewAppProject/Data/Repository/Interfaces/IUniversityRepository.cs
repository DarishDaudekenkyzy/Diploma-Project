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
        public Task<University> CreateUniversityAsync(UniversityCreateModel model);

        /*UPDATE|*/
        public Task<bool> UpdateUniversityAsync(int id, UniversityUpdateModel model);

        /*DELETE*/
        public Task<bool> DeleteUniversityAsync(int id);
    }
}
