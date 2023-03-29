using ReviewAppProject.Data.Models;

namespace ReviewAppProject.Data.Repository.Interfaces
{
    public interface IUniversityRepository
    {
        public IAsyncEnumerable<University> GetAllUniversitiesAsync();
        public IAsyncEnumerable<University> GetUniversitiesStartingWithPatternAsync(string searchInput);
    }
}
