using ReviewAppProject.Data.Models;
using ReviewAppProject.Models;

namespace ReviewAppProject.Data.Repository.Interfaces
{
    public interface IFacultyRepository
    {
        public IAsyncEnumerable<Faculty> GetAllFacultiesAsync();
        public IAsyncEnumerable<Faculty> GetUniversityFaculties(int universityId);
        public Task<Faculty> GetFacultyByIdAsync(int id);
        public Task<Faculty> GetFacultyByNameAsync(string facultyName);
        public Task<bool> CreateFacultyAsync(string facultyName);
    }
}
