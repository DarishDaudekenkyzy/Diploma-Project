using ReviewAppProject.Data.Models;

namespace ReviewAppProject.Data.Repository.Interfaces
{
    public interface IReviewTagRepository
    {
        public IAsyncEnumerable<ReviewProfessorTag> GetAllReviewTags();

        public Task<ReviewProfessorTag> GetTagByIdAsync(int tagId);
    }
}
