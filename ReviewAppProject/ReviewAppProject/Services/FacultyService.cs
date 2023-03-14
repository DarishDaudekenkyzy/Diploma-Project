using ReviewAppProject.Data.Models;
using ReviewAppProject.Data.Repository;
using ReviewAppProject.Exceptions;
using ReviewAppProject.Models;

namespace ReviewAppProject.Services
{
    public class FacultyService
    {
        private readonly IFacultyRepository _facultyRepository;

        public FacultyService(IFacultyRepository repository)
        {
            _facultyRepository = repository;
        }

        public async IAsyncEnumerable<Faculty> GetAllFacultiesAsync()
        {
            var faculties = _facultyRepository.GetAllFacultiesAsync();

            await foreach (var faculty in faculties)
            {
                yield return faculty;
            }
        }

        public async Task<(Faculty?, Exception?)> CreateFacultyAsync(string facultyName)
        {
            try
            {
                bool result = await _facultyRepository.CreateFacultyAsync(facultyName);

                var faculty = await _facultyRepository.GetFacultyByNameAsync(facultyName);
                return (faculty, null);
            }
            catch (ArgumentException e) { return (null, e); }
            catch (FacultyWithNameExistsException e) { return (null, e); }
            catch (Exception e) { return (null, e); }
        }
    }
}
