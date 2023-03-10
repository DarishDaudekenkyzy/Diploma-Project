using ReviewAppProject.Data.Models;

namespace ReviewAppProject.Data.Repository
{
    public interface ICourseRepository
    {
        public IAsyncEnumerable<Course> GetAllCoursesAsync();
        public Task AddProfessorToCourse(int courseId, Professor professor);
        public Task<Course> GetCourseByIdAsync(int courseId);

    }
}
