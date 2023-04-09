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
        public async IAsyncEnumerable<ReviewTag> GetAllReviewTags()
        {
            var tags = _context.Tags.AsAsyncEnumerable();

            await foreach (var tag in tags)
            {
                yield return tag;
            }
        }

        public async Task<ReviewTag> GetTagByIdAsync(int tagId) { 
            return await _context.Tags
                .Where(t=> t.Id == tagId)
                .FirstOrDefaultAsync() ?? throw new ReviewTagNotFound();
        }
    }
}
