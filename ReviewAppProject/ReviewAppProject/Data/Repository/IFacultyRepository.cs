using ReviewAppProject.Data.Models;
using ReviewAppProject.Models;

namespace ReviewAppProject.Data.Repository
{
    public interface IFacultyRepository
    {
        public IAsyncEnumerable<Faculty> GetAllFacultiesAsync();
        public Task<Faculty> GetFacultyByIdAsync(int id);
        public Task<Faculty> GetFacultyByNameAsync(string facultyName);
        public Task<bool> CreateFacultyAsync(string facultyName);
    }
}
