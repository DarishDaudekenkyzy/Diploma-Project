using Microsoft.EntityFrameworkCore;
using ReviewAppProject.Data.Models;
using ReviewAppProject.Data.Repository;
using ReviewAppProject.Exceptions;
using ReviewAppProject.Models;
using ReviewAppProject.Views;

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

                double prof_total_wouldTakeAgainPercent     = await _repository.GetWouldTakeAgainPercentOfProfessor(rpModel.ProfessorId);
                double prof_total_Rating                    = await _repository.GetTotalRatingOfProfessor(rpModel.ProfessorId);
                double prof_total_difficulty               = await _repository.GetTotalDifficultyOfProfessor(rpModel.ProfessorId);

                var professor = await _profRepository.GetProfessorByIdAsync(rpModel.ProfessorId);
                professor.WouldTakeAgainPercentage          = Math.Round(prof_total_wouldTakeAgainPercent, 2);
                professor.Rating                            = Math.Round(prof_total_Rating, 2);
                professor.DifficultyPercentage             = Math.Round(prof_total_difficulty, 2);
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
