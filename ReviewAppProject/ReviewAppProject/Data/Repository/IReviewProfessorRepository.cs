using Microsoft.Extensions.Configuration.UserSecrets;
using ReviewAppProject.Data.Models;
using ReviewAppProject.Models;

namespace ReviewAppProject.Data.Repository
{
    public interface IReviewProfessorRepository
    {
        public IAsyncEnumerable<ReviewProfessor> GetAllReviewsAsync();
        public IAsyncEnumerable<ReviewProfessor> GetAllReviewsWithProfessorAsync(int professorId);
        public IAsyncEnumerable<ReviewProfessor> GetAllReviewsOfUserAsync(int userId);

        public Task<ReviewProfessor> GetReviewByIdAsync(int? id);
        public Task<ReviewProfessor> GetReviewByTitleAsync(string title);
        public Task<ReviewProfessor> GetReviewByUserAndProfessorAndCourseAsync(int userId, int professorId, int courseId);

        public Task<bool> CreateReviewProfessorAsync(ReviewProfessorCreateModel model);

        public Task<double> GetWouldTakeAgainPercentOfProfessor(int professorId);
        public Task<double> GetTotalRatingOfProfessor(int professorId);
    }
}
