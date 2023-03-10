using Microsoft.EntityFrameworkCore;
using ReviewAppProject.Data.Models;
using ReviewAppProject.Data.Repository;
using ReviewAppProject.Exceptions;
using ReviewAppProject.Models;

namespace ReviewAppProject.Services
{
    public class ReviewProfessorService
    {
        private readonly IReviewProfessorRepository _repository;
        private readonly IUserRepository _userRepository;
        private readonly IProfessorRepository _profRepository;

        public ReviewProfessorService(
            IReviewProfessorRepository repository,
            IUserRepository userRepository,
            IProfessorRepository profRepository)
        {
            _repository = repository;
            _userRepository = userRepository;
            _profRepository = profRepository;
        }

        public async IAsyncEnumerable<ReviewProfessor> GetAllReviewsAsync()
        {
            var reviews = _repository.GetAllReviewsAsync();

            await foreach (var r in reviews)
            {
                yield return r;
            }
        }
        
        public async IAsyncEnumerable<ReviewProfessor> GetAllReviewsWithProfessorAsync(int professorId)
        {
            var reviews = _repository.GetAllReviewsWithProfessorAsync(professorId);

            await foreach (var r in reviews)
            {
                yield return r;
            }
        }

        public async IAsyncEnumerable<ReviewProfessor> GetAllReviewsOfUserAsync(int userId)
        {
            var reviews = _repository.GetAllReviewsOfUserAsync(userId);

            await foreach (var r in reviews)
            {
                yield return r;
            }
        }

        public async Task<(ReviewProfessor?, Exception?)> GetReviewByIdAsync(int id)
        {
            try
            {
                var review = await _repository.GetReviewByIdAsync(id);
                return (review, null);
            }

            catch (ReviewNotFoundException e) { return (null, e); }
        }

        public async Task<(ReviewProfessor?, Exception?)> CreateReviewProfessorAsync(ReviewProfessorCreateModel rpModel)
        {
            try
            {
                bool result = await _repository.CreateReviewProfessorAsync(rpModel);

                var review = await _repository.GetReviewByUserAndProfessorAndCourseAsync(rpModel.UserId, rpModel.ProfessorId, rpModel.CourseId);

                double wouldTakeAgainPercent = await _repository.GetWouldTakeAgainPercentOfProfessor(rpModel.ProfessorId);
                double professorRating = await _repository.GetTotalRatingOfProfessor(rpModel.ProfessorId);

                var professor = await _profRepository.GetProfessorByIdAsync(rpModel.ProfessorId);
                professor.WouldTakeAgainPercentage = wouldTakeAgainPercent;
                professor.Rating = professorRating;
                professor.ReviewsCount += 1;
                await _profRepository.Update(professor);
                return (review, null);
            }
            catch (ArgumentException e) { return (null, e); }
            catch (ReviewProfessorByUserExistsException e) { return (null, e); }
            catch (Exception e) { return (null, e); }
        }
    }
}
