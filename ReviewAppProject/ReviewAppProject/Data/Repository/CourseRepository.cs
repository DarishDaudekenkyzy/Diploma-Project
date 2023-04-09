using Microsoft.EntityFrameworkCore;
using ReviewAppProject.Data.Models;
using ReviewAppProject.Data.Repository.Interfaces;
using ReviewAppProject.Exceptions;
using ReviewAppProject.Models;

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
            var courses = _context.Courses
                .OrderBy(course => course.CourseCode)
                .AsAsyncEnumerable();

            await foreach (var course in courses)
            {
                yield return course;
            }
        }

        public async IAsyncEnumerable<Course> GetAllCoursesInUniversityAsync(int uniId) {
            var courses = _context.Courses
                .Where(c => c.Faculty.UniversityId == uniId)
                .AsAsyncEnumerable();

            await foreach (var course in courses)
            {
                yield return course;
            }
        }

        public async IAsyncEnumerable<Course> GetAllCoursesInFacultyAsync(int facultyId)
        {
            var courses = _context.Courses
                .Where(c => c.FacultyId == facultyId)
                .AsAsyncEnumerable();

            await foreach (var course in courses)
            {
                yield return course;
            }
        }

        public async IAsyncEnumerable<Course> GetCoursesOfProfessorAsync(int professorId) {
            var courses = _context.CoursesProfessors
                .Where(cp => cp.ProfessorId == professorId)
                .Select(cp => cp.Course)
                .AsAsyncEnumerable();

            await foreach (var course in courses) { 
                yield return course;
            }
        }

        public async IAsyncEnumerable<Course> GetCoursesWithPatternAsync(string pattern) {
            var courses = _context.Courses.Where(c => c.CourseName.Contains(pattern) ||
            c.CourseCode.Contains(pattern)).AsAsyncEnumerable();

            await foreach (var course in courses) { 
                yield return course;
            }
        }

        public async Task<Course> GetCourseByIdAsync(int courseId)
        {
            return await _context.Courses
                .Where(c => c.Id == courseId)
                .FirstOrDefaultAsync()
                ?? throw new CourseNotFoundException();
        }

        public async Task CreateCourseAsync(CourseCreateModel model) {
            var newCourse = new Course { 
                CourseCode= model.CourseCode,
                CourseName= model.CourseName,
                CourseDescription= model.CourseDescription,
                FacultyId= model.FacultyId,
            };
            await _context.Courses.AddAsync(newCourse);
            _context.Entry(newCourse).State = EntityState.Added;
            await _context.SaveChangesAsync();
        }

        public async Task AddProfessorToCourseAsync(int courseId, int professorId) {
            var courseProfessor = new CourseProfessor
            {
                CourseId = courseId,
                ProfessorId = professorId
            };
            await _context.CoursesProfessors.AddAsync(courseProfessor);
            _context.Entry(courseProfessor).State = EntityState.Added;
            await _context.SaveChangesAsync();
        }

        public async Task UpdateCourseAsync(Course course, CourseCreateModel model) { 
            if (!course.CourseCode.Equals(model.CourseCode)) 
                course.CourseCode = model.CourseCode;
            if(!course.CourseName.Equals(model.CourseName))
                course.CourseName= model.CourseName;
            if (course.FacultyId != model.FacultyId)
                course.FacultyId = model.FacultyId;
            if(course.CourseDescription == null || !course.CourseDescription.Equals(model.CourseDescription))
                course.CourseDescription= model.CourseDescription;
            
            _context.Entry(course).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteCourseAsync(Course course) { 
            _context.Courses.Remove(course);
            _context.Entry(course).State= EntityState.Deleted;
            await _context.SaveChangesAsync();
        }

        public async Task<bool> IsCourseWithCodeExistsInUniversity(string courseCode, int uniId) {
            return await _context.Courses
                    .Where(c => c.CourseCode.Equals(courseCode)
                    && c.Faculty.UniversityId == uniId)
                    .AnyAsync();
        }

        public async Task<bool> IsProfessorInCourse(int courseId, int professorId) {
            return await _context.CoursesProfessors.Where(cp => cp.CourseId == courseId && cp.ProfessorId == professorId)
                .AnyAsync();
        }
    }
}
