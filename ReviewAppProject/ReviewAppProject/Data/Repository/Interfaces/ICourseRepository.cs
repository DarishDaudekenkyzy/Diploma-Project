using ReviewAppProject.Data.Models;
using ReviewAppProject.Models;

namespace ReviewAppProject.Data.Repository.Interfaces
{
    public interface ICourseRepository
    {
        public IAsyncEnumerable<Course> GetAllCoursesAsync();
        public IAsyncEnumerable<Course> GetAllCoursesInUniversityAsync(int uniId);
        public IAsyncEnumerable<Course> GetAllCoursesInFacultyAsync(int facultyId);
        public IAsyncEnumerable<Course> GetCoursesOfProfessorAsync(int professorId);
        public IAsyncEnumerable<Course> GetCoursesWithPatternAsync(string pattern);
        public Task<Course> GetCourseByIdAsync(int courseId);

        public Task CreateCourseAsync(CourseCreateModel model);

        public Task AddProfessorToCourseAsync(int courseId, int professorId);
        public Task UpdateCourseAsync(Course course, CourseCreateModel model);
        public Task DeleteCourseAsync(Course course);

        public Task<bool> IsCourseWithCodeExistsInUniversity(string courseCode, int uniId);
        public Task<bool> IsProfessorInCourse(int courseId, int professorId);
    }
}
