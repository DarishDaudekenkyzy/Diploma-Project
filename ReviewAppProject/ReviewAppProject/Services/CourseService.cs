using ReviewAppProject.Data.Models;
using ReviewAppProject.Data.Repository.Interfaces;
using ReviewAppProject.Exceptions;
using ReviewAppProject.Models;

namespace ReviewAppProject.Services
{
    public class CourseService
    {
        private readonly ICourseRepository _courseRepo;
        private readonly IFacultyRepository _facultyRepo;
        private readonly IProfessorRepository _profRepo;

        public CourseService(ICourseRepository courseRepo, 
            IProfessorRepository profRepo,
            IFacultyRepository facultyRepo)
        {
            _courseRepo = courseRepo;
            _profRepo = profRepo;
            _facultyRepo = facultyRepo;
        }

        public async IAsyncEnumerable<Course> GetAllCoursesAsync()
        {
            var courses = _courseRepo.GetAllCoursesAsync();

            await foreach (var course in courses)
            {
                yield return course;
            }
        }

        public async IAsyncEnumerable<Course> GetAllCoursesInUniversityAsync(int uniId) {
            var courses = _courseRepo.GetAllCoursesInUniversityAsync(uniId);

            await foreach (var course in courses)
            {
                yield return course;
            }
        }

        public async IAsyncEnumerable<Course> GetAllCoursesInFacultyAsync(int facultyId)
        {
            var courses = _courseRepo.GetAllCoursesInFacultyAsync(facultyId);

            await foreach (var course in courses)
            {
                yield return course;
            }
        }

        public async IAsyncEnumerable<Course> GetCoursesOfProfessorAsync(int professorsId) {
            var courses = _courseRepo.GetCoursesOfProfessorAsync(professorsId);

            await foreach (var course in courses) {
                yield return course;
            }
        }

        public async IAsyncEnumerable<Course> GetCoursesWithPatternAsync(string pattern) {
            var courses = _courseRepo.GetCoursesWithPatternAsync(pattern);

            await foreach (var course in courses)
            {
                yield return course;
            }
        }

        public async Task<Course> GetCourseByIdAsync(int courseId) {
            try { 
                return await _courseRepo.GetCourseByIdAsync(courseId);
            } catch(CourseNotFoundException e) { throw e; }
        }

        public async Task<(bool, Exception?)> AddProfessorToCourseAsync(int courseId, int professorId) {
            try
            {
                var course = await _courseRepo.GetCourseByIdAsync(courseId);
                var professor = await _profRepo.GetProfessorByIdAsync(professorId);

                if (course != null && professor != null
                    && !await _courseRepo.IsProfessorInCourse(courseId, professorId)) 
                { 
                    await _courseRepo.AddProfessorToCourseAsync(courseId, professorId);
                }

                return (true, null);
            }
            catch (CourseNotFoundException e) { return (false, e); }
            catch (ProfessorNotFoundException e) { return (false, e); }
            catch (ProfessorAlreadyInCourse e) { return (false, e); }
            catch (Exception e) { return (false, e); }
        }

        public async Task<(bool, Exception?)> CreateCourseAsync(CourseCreateModel model) {
            try {
                var faculty = await _facultyRepo.GetFacultyByIdAsync(model.FacultyId);

                if (await _courseRepo.IsCourseWithCodeExistsInUniversity(model.CourseCode, faculty.UniversityId))
                    throw new CourseCodeExists();

                await _courseRepo.CreateCourseAsync(model);

                await _facultyRepo.IncrementCoursesCount(faculty);

                return (true, null);
            }
            catch (CourseCodeExists e) { return (false, e); }
            catch (Exception e) {return(false, e); }
        }

        public async Task<(bool, Exception?)> DeleteCourseAsync(int courseId) {
            try {
                var course = await _courseRepo.GetCourseByIdAsync(courseId);
                var faculty = await _facultyRepo.GetFacultyByIdAsync(course.FacultyId);

                await _courseRepo.DeleteCourseAsync(course);

                await _facultyRepo.DecrementCoursesCount(faculty);

                return (true, null);
            }
            catch (CourseNotFoundException e) { return (false, e); }
            catch (Exception e) { return (false, e); }
        }

        public async Task<(bool, Exception?)> UpdateCourseAsync(int courseId, CourseCreateModel model) {
            try
            {
                var course = await _courseRepo.GetCourseByIdAsync(courseId);
                var faculty = await _facultyRepo.GetFacultyByIdAsync(course.FacultyId);
                Faculty? newFaculty = null;
                if (model.FacultyId != course.FacultyId)
                    newFaculty = await _facultyRepo.GetFacultyByIdAsync(model.FacultyId);

                if (!course.CourseCode.Equals(model.CourseCode) 
                    && await _courseRepo.IsCourseWithCodeExistsInUniversity(model.CourseCode, faculty.UniversityId))
                    throw new CourseCodeExists();

                await _courseRepo.UpdateCourseAsync(course, model);

                if (newFaculty != null) {
                    await _facultyRepo.IncrementCoursesCount(newFaculty);
                    await _facultyRepo.DecrementCoursesCount(faculty);
                }

                return (true, null);
            }
            catch (CourseNotFoundException e) { return (false, null); }
            catch (CourseCodeExists e) { return (false, e); }
            catch (Exception e) { return (false, e); }
        }
    }
}
