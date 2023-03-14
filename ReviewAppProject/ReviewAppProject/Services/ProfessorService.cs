using Microsoft.Extensions.Configuration.EnvironmentVariables;
using ReviewAppProject.Data.Models;
using ReviewAppProject.Data.Repository;
using ReviewAppProject.Exceptions;
using ReviewAppProject.Models;

namespace ReviewAppProject.Services
{
    public class ProfessorService
    {
        private readonly IProfessorRepository _profRepository;

        public ProfessorService(IProfessorRepository profRepository)
        {
            _profRepository = profRepository;
        }

        public async IAsyncEnumerable<Professor> GetAllProfessorsAsync()
        {
            var professors = _profRepository.GetAllProfessorsAsync();

            await foreach (var professor in professors)
            {
                yield return professor;
            }
        }

        public async IAsyncEnumerable<Professor> GetProfessorsWithPatternAsync(string pattern)
        {
            var professors = _profRepository.GetProfessorsWithPatternAsync(pattern);

            await foreach (var professor in professors)
            {
                yield return professor;
            }
        }

        public async Task<(Professor?, Exception?)> GetProfessorById(int id)
        {
            try
            {
                var professor = await _profRepository.GetProfessorByIdAsync(id);
                return (professor, null);
            }
            catch (ArgumentException e) { return (null, e); }
            catch (ProfessorNotFoundException e) { return (null, e); }
            catch (Exception e) { return (null, e); }
        }

        public async Task<(Professor?, Exception?)> CreateProfessorAsync(ProfessorCreateModel pModel)
        {
            try
            {
                bool result = await _profRepository.CreateProfessorAsync(pModel);

                var professor = await _profRepository.GetProfessorByEmailAsync(pModel.Email);
                return (professor, null);
            }
            catch (ArgumentException e) { return (null, e); }
            catch (ProfessorWithEmailExistsException e) { return (null, e); }
            catch (Exception e) { return (null, e); }
        }
    }
}
