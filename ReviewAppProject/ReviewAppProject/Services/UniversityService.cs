using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using Microsoft.IdentityModel.Tokens;
using ReviewAppProject.Data.Models;
using ReviewAppProject.Data.Repository.Interfaces;
using ReviewAppProject.Exceptions;
using ReviewAppProject.Models;

namespace ReviewAppProject.Services
{
    public class UniversityService
    {
        private readonly IUniversityRepository _repository;

        public UniversityService(IUniversityRepository repository)
        {
            _repository = repository;
        }

        public async Task<(bool, Exception?)> CreateUniversityAsync(UniversityCreateModel model) {
            try
            {
                await _repository.CreateUniversityAsync(model);
                return (true, null);
            }
            catch (UniversityExistsException e) { return (false, e); }
            catch (Exception e) { return (false, e); }
        }

        /*GET*/

            /*GET ALL*/
        public async IAsyncEnumerable<University> GetAllUniversitiesAsync()
        {
            var universities = _repository.GetAllUniversitiesAsync();

            await foreach (var university in universities)
            {
                yield return university;
            }
        }

            /*GET BY ID*/
        public async Task<(University?, Exception?)> GetUniversityByIdAsync(int id) {
            try
            {
                var university = await _repository.GetUniversityByIdAsync(id);
                return (university, null);
            }
            catch (UniversityNotFoundException e) { return (null, e); }
            catch (Exception e) { return (null, e); }
        }

            /*GET WITH PATTERN*/
        public async IAsyncEnumerable<University> GetUniversitiesStartingWithPatternAsync(string searchInput)
        {
            var universities = _repository.GetUniversitiesStartingWithPatternAsync(searchInput);

            await foreach (var university in universities)
            {
                yield return university;
            }
        }

        /*UPDATE*/
        public async Task<(bool, Exception?)> UpdateUniversityAsync(int id, UniversityUpdateModel model) {
            try
            {
                var university = await _repository.GetUniversityByIdAsync(id);
                
                await _repository.UpdateUniversityAsync(university, model);

                return (true, null);
            }
            catch (UniversityNotFoundException e) { return (false, e); }
            catch (Exception e) { return (false, e); }
        }

        /*DELETE*/
        public async Task<(bool, Exception?)> DeleteUniversityAsync(int id) {
            try
            {
                var university = await _repository.GetUniversityByIdAsync(id);
                await _repository.DeleteUniversityAsync(university);

                return (true, null);
            }
            catch (UniversityNotFoundException e) { return (false, e); }
            catch (Exception e) { return (false, e); }
        }
    }
}
