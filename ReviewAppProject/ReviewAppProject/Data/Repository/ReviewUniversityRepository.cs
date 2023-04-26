using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using ReviewAppProject.Data.Models;
using ReviewAppProject.Data.Repository.Interfaces;
using ReviewAppProject.Exceptions;
using ReviewAppProject.Models;

namespace ReviewAppProject.Data.Repository
{
    public class ReviewUniversityRepository : IReviewUniversityRepository
    {
        private readonly AppDbContext _context;

        public ReviewUniversityRepository(AppDbContext context) { 
            _context = context;
        }
        public async IAsyncEnumerable<ReviewUniversity> GetAllReviewsAsync()
        {
            var reviews = _context.ReviewUniversities
                .AsAsyncEnumerable();

            await foreach (var review in reviews) {
                yield return review;
            }
        }

        public async IAsyncEnumerable<ReviewUniversity> GetAllReviewsOfUniversityAsync(int universityId)
        {
            var reviews = _context.ReviewUniversities
                .Where(ru => ru.UniversityId == universityId)
                .Include(ru => ru.User)
                .AsAsyncEnumerable();

            await foreach (var review in reviews)
            {
                yield return review;
            }
        }

        public async IAsyncEnumerable<ReviewUniversity> GetAllUniversityReviewsOfUser(int userId)
        {
            var reviews = _context.ReviewUniversities
                .Where(ru => ru.UserId == userId)
                .Include(ru => ru.User)
                .AsAsyncEnumerable();

            await foreach (var review in reviews)
            {
                yield return review;
            }
        }

        public async Task<ReviewUniversity> GetUniversityReviewById(int id)
        {
            return await _context.ReviewUniversities
                .Where(ru => ru.Id == id)
                .FirstOrDefaultAsync() ?? throw new ReviewNotFoundException();
        }

        public async Task<bool> IsReviewByUserExists(int userId, int universityId)
        {
            return await _context.ReviewUniversities
                .Where(ru => ru.UserId == userId && ru.UniversityId == universityId)
                .AnyAsync();
        }

        public async Task CreateUniversityReviewAsync(ReviewUniversityCreateModel model)
        {
            var sum = 0;
            var reviewUniversity = new ReviewUniversity { 
                Reputation = model.Reputation,
                Review = model.Review,
                Safety = model.Safety,
                Social = model.Social,
                Opportunities= model.Opportunities,
                Facilities = model.Facilities,
                Clubs= model.Clubs,
                Internet= model.Internet,
                Food= model.Food,
                Location=model.Location,
                Happiness=model.Happiness,

                UniversityId=model.UniversityId,
                UserId=model.UserId,
                
                CreatedOn = DateTime.Now,
            };
            sum += model.Reputation + model.Safety + model.Social + model.Opportunities + model.Facilities + model.Clubs + model.Internet + model.Food + model.Location + model.Happiness;
            reviewUniversity.Rating = (double)sum / 10;

            await _context.ReviewUniversities.AddAsync(reviewUniversity);
            _context.Entry(reviewUniversity).State = EntityState.Added;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAllReviewsWithUniversityIdAsync(int universityId)
        {
            var reviews = _context.ReviewUniversities.Where(ru => ru.UniversityId == universityId);
            _context.RemoveRange(reviews);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteReviewAsync(ReviewUniversity review)
        {
            _context.ReviewUniversities.Remove(review);
            _context.Entry(review).State = EntityState.Deleted;
            await _context.SaveChangesAsync();
        }

        public async Task LikeReviewAsync(ReviewUniversity review, User user)
        {
            var like = new UserReviewUniversityLike { ReviewId = review.Id, UserId = user.Id };
            await _context.UserReviewUniversityLikes.AddAsync(like);
            review.Likes++;
            _context.Entry(like).State = EntityState.Added;
            _context.Entry(review).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DislikeReviewAsync(ReviewUniversity review, User user)
        {
            var dislike = new UserReviewUniversityDislike { ReviewId = review.Id, UserId = user.Id };
            await _context.UserReviewUniversityDislikes.AddAsync(dislike);
            review.Dislikes++;
            _context.Entry(dislike).State = EntityState.Added;
            _context.Entry(review).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task RemoveLikeAsync(ReviewUniversity review, User user)
        {
            var like = await _context.UserReviewUniversityLikes.Where(l => l.UserId == user.Id && l.ReviewId == review.Id).FirstAsync();
            _context.UserReviewUniversityLikes.Remove(like);
            review.Likes--;
            _context.Entry(like).State = EntityState.Deleted;
            _context.Entry(review).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }
        public async Task RemoveDislikeAsync(ReviewUniversity review, User user)
        {
            var dislike = await _context.UserReviewUniversityDislikes.Where(d => d.UserId == user.Id && d.ReviewId == review.Id).FirstAsync();
            _context.UserReviewUniversityDislikes.Remove(dislike);
            review.Dislikes--;
            _context.Entry(dislike).State = EntityState.Deleted;
            _context.Entry(review).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }



        public async Task<bool> DidUserLikedReview(int reviewId, int userId)
        {
            return await _context.UserReviewUniversityLikes.Where(x => x.UserId == userId && x.ReviewId == reviewId).AnyAsync();
        }
        public async Task<bool> DidUserDislikedReview(int reviewId, int userId)
        {
            return await _context.UserReviewUniversityDislikes.Where(x => x.UserId == userId && x.ReviewId == reviewId).AnyAsync();
        }
    }
}
