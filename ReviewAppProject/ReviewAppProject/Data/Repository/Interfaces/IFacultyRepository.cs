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

        public Task CreateFacultyAsync(FacultyCreateModel model);
        public Task UpdateFacultyAsync(Faculty faculty, FacultyCreateModel model);
        public Task DeleteFacultyAsync(Faculty faculty);

        public Task IncrementCoursesCount(Faculty faculty);
        public Task DecrementCoursesCount(Faculty faculty);
    }
}
