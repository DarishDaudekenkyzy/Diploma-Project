using Microsoft.Extensions.Configuration.EnvironmentVariables;
using ReviewAppProject.Data.Models;
using ReviewAppProject.Data.Repository;
using ReviewAppProject.Exceptions;
using ReviewAppProject.Models;
using ReviewAppProject.Views;

namespace ReviewAppProject.Services
{
    public class ProfessorService
    {
        private readonly IProfessorRepository _profRepository;
        private readonly IReviewProfessorRepository _rpRepository;

        public ProfessorService(IProfessorRepository profRepository, IReviewProfessorRepository rpRepository)
        {
            _profRepository = profRepository;
            _rpRepository = rpRepository;
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

        public async IAsyncEnumerable<ReviewProfessorView> GetAllReviewsWithProfessorAsync(int professorId)
        {
            var reviews = _rpRepository.GetAllReviewsWithProfessorAsync(professorId);

            await foreach (var r in reviews)
            {
                yield return new ReviewProfessorView
                {
                    Content = r.Content,
                    Title = r.Title,
                    Id = r.Id,
                    Rating = r.Rating,
                    Difficulty = r.Difficulty,
                    WasAttendanceMandatory = r.WasAttendanceMandatory,
                    WouldTakeAgain = r.WouldTakeAgain,
                    CreatedOn = r.CreatedOn.ToString("MMMM dd, yyyy"),
                    CourseCode = r.Course.CourseCode,
                    CourseId = r.Course.CourseId,
                    ProfessorId = r.ProfessorId,
                    UserId = r.UserId,
                    UserName = r.User.FirstName + ' ' + r.User.LastName,
                };
            }
        }
    }
}
