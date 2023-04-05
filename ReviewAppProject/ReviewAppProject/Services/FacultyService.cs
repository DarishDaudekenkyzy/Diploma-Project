using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using ReviewAppProject.Data.Models;
using ReviewAppProject.Data.Repository.Interfaces;
using ReviewAppProject.Exceptions;
using ReviewAppProject.Models;

namespace ReviewAppProject.Services
{
    public class FacultyService
    {
        private readonly IFacultyRepository _facultyRepository;
        private readonly IUniversityRepository _uniRepository;

        public FacultyService(IFacultyRepository repository, IUniversityRepository uniRepository)
        {
            _facultyRepository = repository;
            _uniRepository = uniRepository;
        }

        public async IAsyncEnumerable<Faculty> GetAllFacultiesAsync()
        {
            var faculties = _facultyRepository.GetAllFacultiesAsync();

            await foreach (var faculty in faculties)
            {
                yield return faculty;
            }
        }

        public async IAsyncEnumerable<Faculty> GetUniversityFaculties(int universityId)
        {
            var faculties = _facultyRepository.GetUniversityFaculties(universityId);

            await foreach (var faculty in faculties)
            {
                yield return faculty;
            }
        }

        public async Task<Faculty> GetFacultyByIdAsync(int id) {
            return await _facultyRepository.GetFacultyByIdAsync(id);
        }

        public async Task<(bool, Exception?)> CreateFacultyAsync(FacultyCreateModel model)
        {
            try
            {
                //check if university exists
                _ = await _uniRepository.GetUniversityByIdAsync(model.UniversityId);

                bool result = await _facultyRepository.CreateFacultyAsync(model);

                return (result, null);
            }
            catch (UniversityNotFoundException e) { return (false, e); }
            catch (ArgumentException e) { return (false, e); }
            catch (FacultyWithNameExistsException e) { return (false, e); }
            catch (Exception e) { return (false, e); }
        }

        public async Task<(bool, Exception?)> UpdateFacultyAsync(int id, FacultyCreateModel model) {
            try
            {
                await _facultyRepository.UpdateFacultyAsync(id, model);
                return (true, null);
            }
            catch (FacultyNotFoundException e) { return (false, e); }
            catch (Exception e) { return (false, e); }
        }

        public async Task<(bool, Exception?)> DeleteFacultyAsync(int id) {
            try {
                await _facultyRepository.DeleteFacultyAsync(id);
                return (true, null);
            }
            catch (FacultyNotFoundException e) { return (false, e); }
            catch (Exception e) { return (false, e); }
        }
    }
}
