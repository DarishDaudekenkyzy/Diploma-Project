using Microsoft.Extensions.Configuration.UserSecrets;
using ReviewAppProject.Models;
using ReviewAppProject.Data.Models;

namespace ReviewAppProject.Data.Repository.Interfaces
{
    public interface IReviewProfessorRepository
    {
        public IAsyncEnumerable<ReviewProfessor> GetAllReviewsAsync();
        public IAsyncEnumerable<ReviewProfessor> GetAllReviewsOfProfessorAsync(int professorId);
        public IAsyncEnumerable<ReviewProfessor> GetAllReviewsOfUserAsync(int userId);
        public IAsyncEnumerable<ReviewProfessor> GetAllReviewsOfCourseAsync(int courseId);
        public IAsyncEnumerable<ReviewProfessor> GetSavedReviewsOfUser(int userId);
        public Task<ReviewProfessor> GetReviewByIdAsync(int? id);
        public Task CreateReviewAsync(ReviewProfessorCreateModel model);
        public Task DeleteAllReviewsWithProfessorId(int professorId);
        public Task LikeReviewAsync(ReviewProfessor review, User user);
        public Task DislikeReviewAsync(ReviewProfessor review, User user);

        public Task RemoveLikeAsync(ReviewProfessor review, User user);
        public Task RemoveDisikeAsync(ReviewProfessor review, User user);
        public Task DeleteReviewAsync(ReviewProfessor reivew);
        public Task SaveReviewAsync(ReviewProfessor reivew, User user);
        public Task UnsaveReviewAsync(ReviewProfessor reivew, User user);

        public Task<bool> IsReviewByUserExists(int userId, int courseId, int professorId);
        public Task<bool> DidUserLikedReview(int reviewId, int userId);
        public Task<bool> DidUserDislikedReview(int reviewId, int userId);

        public Task<bool> IsReviewSavedByUserAsync(int userId, int reviewId);
    }
}
