using Microsoft.EntityFrameworkCore;
using ReviewAppProject.Data.Models;
using ReviewAppProject.Data.Repository.Interfaces;
using ReviewAppProject.Exceptions;

namespace ReviewAppProject.Services
{
    public class CourseService
    {
        private readonly ICourseRepository _courseRepo;
        private readonly IProfessorRepository _profRepo;

        public CourseService(ICourseRepository courseRepo, IProfessorRepository profRepo)
        {
            _courseRepo = courseRepo;
            _profRepo = profRepo;
        }

        public async IAsyncEnumerable<Course> GetAllCoursesAsync()
        {
            var courses = _courseRepo.GetAllCoursesAsync();

            await foreach (var course in courses)
            {
                yield return course;
            }
        }

        public async Task AddProfessorToCourse(int courseId, int professorId)
        {
            Professor professor;
            try
            {
                professor = await _profRepo.GetProfessorByIdAsync(professorId);
                await _courseRepo.AddProfessorToCourse(courseId, professor);
            }
            catch (ProfessorNotFoundException e) { throw e; }
            catch (CourseNotFoundException e) { throw e; }
            catch (Exception e) { throw; }

        }

        public async Task<Course> GetCourseByIdAsync(int courseId) {
            try { 
                return await _courseRepo.GetCourseByIdAsync(courseId);
            } catch(CourseNotFoundException e) { throw e; }
        }
    }
}
