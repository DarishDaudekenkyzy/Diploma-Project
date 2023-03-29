using Microsoft.EntityFrameworkCore;
using ReviewAppProject.Data.Models;
using ReviewAppProject.Data.Repository.Interfaces;
using ReviewAppProject.Exceptions;

namespace ReviewAppProject.Data.Repository
{
    public class CourseRepository : ICourseRepository
    {
        private readonly AppDbContext _context;

        public CourseRepository(AppDbContext context)
        {
            _context = context;
        }

        public async IAsyncEnumerable<Course> GetAllCoursesAsync()
        {
            var courses = _context.Courses.OrderBy(course => course.CourseCode).Include(c => c.Professors).AsNoTracking().AsAsyncEnumerable();

            await foreach (var course in courses)
            {
                yield return course;
            }
        }

        public async Task AddProfessorToCourse(int courseId, Professor professor) {
            /*var course = _context.Courses.FirstOrDefault(c => c.CourseId == courseId) ?? throw new CourseNotFoundException();
            
            course.Professors.Add(professor);

            _context.Courses.Attach(course);
            _context.Entry(course).State = EntityState.Modified;
            await _context.SaveChangesAsync();*/
        }

        public async Task<Course> GetCourseByIdAsync(int courseId)
        {
            return await _context.Courses.Where(c => c.CourseId == courseId).Include(c => c.Professors).FirstOrDefaultAsync()
                ?? throw new CourseNotFoundException();
        }
    }
}
