using Microsoft.Extensions.Configuration.UserSecrets;
using ReviewAppProject.Data.Models.Review;
using ReviewAppProject.Models;

namespace ReviewAppProject.Data.Repository.Interfaces
{
    public interface IReviewProfessorRepository
    {
        public IAsyncEnumerable<ReviewProfessor> GetAllReviewsAsync();
        public IAsyncEnumerable<ReviewProfessor> GetAllReviewsOfProfessorAsync(int professorId);
        public IAsyncEnumerable<ReviewProfessor> GetAllReviewsOfUserAsync(int userId);

        public Task<ReviewProfessor> GetReviewByIdAsync(int? id);
        public Task<ReviewProfessor> GetReviewByTitleAsync(string title);
        public Task<ReviewProfessor> GetReviewByUserAndProfessorAndCourseAsync(int userId, int professorId, int courseId);

        public Task<bool> CreateReviewProfessorAsync(ReviewProfessorCreateModel model);

        public Task LikeReview(int reviewId, int userId);
        public Task DislikeReview(int reviewId, int userId);

        public Task<int> GetLikesAsync(int reviewId);
        public Task<int> GetDislikesAsync(int reviewId);
    }
}
