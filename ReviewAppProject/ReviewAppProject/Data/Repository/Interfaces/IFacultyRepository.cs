using ReviewAppProject.Data.Models;
using ReviewAppProject.Models;

namespace ReviewAppProject.Data.Repository.Interfaces
{
    public interface IFacultyRepository
    {
        public IAsyncEnumerable<Faculty> GetAllFacultiesAsync();
        public IAsyncEnumerable<Faculty> GetUniversityFaculties(int universityId);
        public Task<Faculty> GetFacultyByIdAsync(int id);
        public Task<Faculty> GetFacultyByUniversityIdAndNameAsync(int universityId, string facultyName);
        public Task<bool> CreateFacultyAsync(FacultyCreateModel model);
        public Task UpdateFacultyAsync(int id, FacultyCreateModel model);

        public Task DeleteFacultyAsync(int id);
    }
}
