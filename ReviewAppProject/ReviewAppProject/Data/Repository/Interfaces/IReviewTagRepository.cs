using ReviewAppProject.Data.Models.Review;

namespace ReviewAppProject.Data.Repository.Interfaces
{
    public interface IReviewTagRepository
    {
        public IAsyncEnumerable<ReviewTag> GetAllReviewTags();

        public Task<ReviewTag> GetTagByIdAsync(int tagId);
    }
}
