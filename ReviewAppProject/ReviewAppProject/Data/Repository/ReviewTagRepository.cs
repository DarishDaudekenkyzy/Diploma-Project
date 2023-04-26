using Microsoft.EntityFrameworkCore;
using ReviewAppProject.Data.Models;
using ReviewAppProject.Data.Repository.Interfaces;
using ReviewAppProject.Exceptions;

namespace ReviewAppProject.Data.Repository
{
    public class ReviewTagRepository : IReviewTagRepository
    {
        private readonly AppDbContext _context;

        public ReviewTagRepository(AppDbContext context)
        {
            _context = context;
        }
        public async IAsyncEnumerable<ReviewProfessorTag> GetAllReviewTags()
        {
            var tags = _context.ReviewProfessorTags.AsAsyncEnumerable();

            await foreach (var tag in tags)
            {
                yield return tag;
            }
        }

        public async Task<ReviewProfessorTag> GetTagByIdAsync(int tagId) { 
            return await _context.ReviewProfessorTags
                .Where(t=> t.Id == tagId)
                .FirstOrDefaultAsync() ?? throw new ReviewTagNotFound();
        }
    }
}
