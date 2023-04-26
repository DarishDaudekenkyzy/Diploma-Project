using ReviewAppProject.Data.Models;
using ReviewAppProject.Models;

namespace ReviewAppProject.Data.Repository.Interfaces
{
    public interface IReviewUniversityRepository
    {
        public IAsyncEnumerable<ReviewUniversity> GetAllReviewsAsync();
        public IAsyncEnumerable<ReviewUniversity> GetAllReviewsOfUniversityAsync(int universityId);
        public IAsyncEnumerable<ReviewUniversity> GetAllUniversityReviewsOfUser(int userId);
        public Task<ReviewUniversity> GetUniversityReviewById(int id);
        public Task CreateUniversityReviewAsync(ReviewUniversityCreateModel model);
        public Task DeleteAllReviewsWithUniversityIdAsync(int universityId);
        public Task LikeReviewAsync(ReviewUniversity review, User user);
        public Task DislikeReviewAsync(ReviewUniversity review, User user);
        public Task RemoveLikeAsync(ReviewUniversity review, User user);
        public Task RemoveDislikeAsync(ReviewUniversity review, User user);
        public Task DeleteReviewAsync(ReviewUniversity review);

        public Task<bool> IsReviewByUserExists(int userId, int universityId);
        public Task<bool> DidUserLikedReview(int reviewId, int userId);
        public Task<bool> DidUserDislikedReview(int reviewId, int userId);
    }
}
