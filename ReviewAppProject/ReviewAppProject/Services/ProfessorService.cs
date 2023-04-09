using Microsoft.Extensions.Configuration.EnvironmentVariables;
using ReviewAppProject.Data.Models;
using ReviewAppProject.Data.Repository.Interfaces;
using ReviewAppProject.Exceptions;
using ReviewAppProject.Models;
using ReviewAppProject.ViewModels;

namespace ReviewAppProject.Services
{
    public class ProfessorService
    {
        private readonly IProfessorRepository _profRepository;
        private readonly ICoursesProfessorsRepository _coursesProfessorsRepository;
        private readonly IReviewProfessorRepository _reviewsRepository;

        public ProfessorService(IProfessorRepository profRepository, 
            ICoursesProfessorsRepository coursesProfessorsRepository,
            IReviewProfessorRepository reviewsRepository)
        {
            _profRepository = profRepository;
            _coursesProfessorsRepository = coursesProfessorsRepository;
            _reviewsRepository = reviewsRepository;
        }

        public async IAsyncEnumerable<Professor> GetAllProfessorsAsync()
        {
            var professors = _profRepository.GetAllProfessorsAsync();

            await foreach (var professor in professors)
            {
                yield return professor;
            }
        }

        public async IAsyncEnumerable<Professor> GetProfessorsInFacultyAsync(int facultyId)
        {
            var professors = _profRepository.GetProfessorsInFacultyAsync(facultyId);

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

        public async IAsyncEnumerable<Professor> GetProfessorsInUniversityWithPatternAsync(int universityId, string pattern)
        {
            var professors = _profRepository.GetProfessorsInUniversityWithPatternAsync(universityId, pattern);

            await foreach (var professor in professors)
            {
                yield return professor;
            }
        }

        public async IAsyncEnumerable<Professor> GetProfessorsInFacultyWithPatternAsync(int facultyId, string pattern)
        {
            var professors = _profRepository.GetProfessorsInFacultyWithPatternAsync(facultyId, pattern);

            await foreach (var professor in professors)
            {
                yield return professor;
            }
        }

        public async IAsyncEnumerable<Professor> GetProfessorsInCourseAsync(int courseId)
        {
            var professors = _profRepository.GetProfessorsInCourse(courseId);

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

        public async Task<(bool, Exception?)> CreateProfessorAsync(ProfessorCreateModel pModel)
        {
            try
            {
                try
                {
                    await _profRepository.GetProfessorByEmailAsync(pModel.Email);
                    throw new ProfessorWithEmailExistsException();
                }
                catch (ProfessorNotFoundException) { 
                    await _profRepository.CreateProfessorAsync(pModel);
                    return (true, null);
                }
            }
            catch (ArgumentException e) { return (false, e); }
            catch (ProfessorWithEmailExistsException e) { return (false, e); }
            catch (Exception e) { return (false, e); }
        }

        public async Task<(bool, Exception?)> UpdateProfessorAsync(int professorId, ProfessorCreateModel model) {
            try
            {
                var professor = await _profRepository.GetProfessorByIdAsync(professorId);

                if (!professor.Email.Equals(model.Email))
                {
                    try
                    {
                        await _profRepository.GetProfessorByEmailAsync(model.Email);
                        throw new ProfessorWithEmailExistsException();
                    }
                    catch (ProfessorNotFoundException) { }
                }

                await _profRepository.UpdateProfessorAsync(professor, model);

                return (true, null);
            }
            catch (ArgumentException e) { return (false, e); }
            catch (ProfessorNotFoundException e) { return (false, e); }
            catch (ProfessorWithEmailExistsException e) { return (false, e); }
            catch (Exception e) { return (false, e); }
        }

        public async Task<(bool, Exception?)> DeleteProfessorAsync(int professorId) {
            try
            {
                var professor = await _profRepository.GetProfessorByIdAsync(professorId);
                await _coursesProfessorsRepository.DeleteAllCourseProfessorsWithProfessorId(professorId);
                await _reviewsRepository.DeleteAllReviewsWithProfessorId(professorId);

                await _profRepository.DeleteProfessorAsync(professor);

                return (true, null);
            }
            catch (ProfessorNotFoundException e) { return (false, e); }
            catch (Exception e) { return (false, e); }
        }
    }
}
