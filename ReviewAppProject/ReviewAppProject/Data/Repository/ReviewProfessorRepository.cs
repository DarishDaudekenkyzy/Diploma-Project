using Microsoft.EntityFrameworkCore;
using ReviewAppProject.Data.Models;
using ReviewAppProject.Data.Models.Review;
using ReviewAppProject.Data.Repository.Interfaces;
using ReviewAppProject.Exceptions;
using ReviewAppProject.Models;

namespace ReviewAppProject.Data.Repository
{
    public class ReviewProfessorRepository : IReviewProfessorRepository
    {
        private readonly AppDbContext _context;

        public ReviewProfessorRepository(AppDbContext context)
        {
            _context = context;
        }
        public async IAsyncEnumerable<ReviewProfessor> GetAllReviewsAsync()
        {
            var reviews = _context.ReviewProfessors.OrderBy(rp => rp.Id)
                .Include(rp => rp.Course)
                .Include(rp => rp.Professor)
                .Include(rp => rp.User)
                .Include(rp => rp.Tags)
                .AsAsyncEnumerable();

            await foreach (var review in reviews)
            {
                yield return review;
            }
        }

        public async IAsyncEnumerable<ReviewProfessor> GetAllReviewsOfUserAsync(int userId)
        {
            var reviews = _context.ReviewProfessors.Where(rp => rp.UserId == userId)
                .Include(rp => rp.Course)
                .Include(rp => rp.User)
                .Include(rp => rp.Tags)
                .AsAsyncEnumerable();

            await foreach (var review in reviews)
            {
                yield return review;
            }
        }

        public async IAsyncEnumerable<ReviewProfessor> GetAllReviewsOfProfessorAsync(int professorId)
        {
            var reviews = _context.ReviewProfessors.Where(rp => rp.ProfessorId == professorId)
                .Include(rp => rp.Course)
                .Include(rp => rp.User)
                .Include(rp => rp.Tags)
                .AsAsyncEnumerable();

            await foreach (var review in reviews)
            {
                yield return review;
            }
        }

        public async Task<ReviewProfessor> GetReviewByIdAsync(int? id)
        {
            return await _context.ReviewProfessors
                .Where(rp => rp.Id == id)
                .Include(rp => rp.Course)
                .Include(rp => rp.Professor)
                .Include(rp => rp.User)
                .Include(rp => rp.Tags)
                .FirstOrDefaultAsync()
                ?? throw new ReviewNotFoundException();
        }

        public async Task<ReviewProfessor> GetReviewByTitleAsync(string title)
        {
            return await _context.ReviewProfessors.FirstOrDefaultAsync(rp => rp.Title == title)
                ?? throw new ReviewNotFoundException();
        }

        public async Task<ReviewProfessor> GetReviewByUserAndProfessorAndCourseAsync(int userId, int professorId, int courseId)
        {
            return await _context.ReviewProfessors
                .Where(rp => rp.ProfessorId == professorId 
                && rp.UserId == userId 
                && rp.CourseId == courseId).FirstOrDefaultAsync()
                ?? throw new ReviewNotFoundException();
        }

        public async Task<bool> CreateReviewProfessorAsync(ReviewProfessorCreateModel rpModel)
        {
            if (rpModel == null) { throw new ArgumentException(); }
            ReviewProfessor rp;
            try
            {
                rp = await GetReviewByUserAndProfessorAndCourseAsync(rpModel.UserId, rpModel.ProfessorId, rpModel.CourseId);
                if (rp != null) throw new ReviewProfessorByUserExistsException();
                return false;
            }
            catch (ReviewNotFoundException)
            {
                rp = new ReviewProfessor
                {
                    CourseId = rpModel.CourseId,
                    Title = rpModel.Title,
                    Content = rpModel.Content,
                    Rating = rpModel.Rating,
                    Difficulty = rpModel.Difficulty,
                    ProfessorId = rpModel.ProfessorId,
                    UserId = rpModel.UserId,
                    WouldTakeAgain= rpModel.WouldTakeAgain,
                    WasAttendanceMandatory = rpModel.WasAttendanceMandatory,

                };

                _context.ReviewProfessors.Add(rp);
                await _context.SaveChangesAsync();
                var review = await GetReviewByUserAndProfessorAndCourseAsync(rpModel.UserId, rpModel.ProfessorId, rpModel.CourseId);
                foreach (var tag in rpModel.tags) {
                    _context.ReviewsTags.Add(new ReviewProfessorReviewTag { ReviewId = review.Id, TagId = tag.TagId });
                }
                await _context.SaveChangesAsync();

                return true;
            }
        }

        public async Task LikeReview(int reviewId, int userId)
        {
            var review = GetReviewByIdAsync(reviewId).Result;
            var lur = await _context.UserReviewLikes.FirstOrDefaultAsync(lur => lur.UserId == userId && lur.ReviewId == reviewId);
            if (lur == null)
            {
                _context.UserReviewLikes.Add(new LikedUserReview { ReviewId = reviewId, UserId = userId });
                review.Likes++;

                var dlur = await _context.UserReviewDislikes.FirstOrDefaultAsync(lur => lur.UserId == userId && lur.ReviewId == reviewId);
                if (dlur != null)
                {
                    _context.UserReviewDislikes.Remove(dlur);
                    review.Dislikes--;
                }

                await _context.SaveChangesAsync();
            }
            else throw new AlreadyLikedException();
            
        }

        public async Task DislikeReview(int reviewId, int userId)
        {
            var review = GetReviewByIdAsync(reviewId).Result;
            var dlur = await _context.UserReviewDislikes.FirstOrDefaultAsync(lur => lur.UserId == userId && lur.ReviewId == reviewId);
            if (dlur == null)
            {
                _context.UserReviewDislikes.Add(new DislikedUserReview { ReviewId = reviewId, UserId = userId });
                review.Dislikes++;

                var lur = await _context.UserReviewLikes.FirstOrDefaultAsync(lur => lur.UserId == userId && lur.ReviewId == reviewId);
                if (lur != null)
                {
                    _context.UserReviewLikes.Remove(lur);
                    review.Likes--;
                }
                await _context.SaveChangesAsync();
            }
            else throw new AlreadyDislikedException();
        }

        public async Task<int> GetLikesAsync(int reviewId) 
        {
            try
            {
                var review = await GetReviewByIdAsync(reviewId);
                return review.Likes;
            }
            catch (ReviewNotFoundException) {
                return 0;
            }
        }

        public async Task<int> GetDislikesAsync(int reviewId)
        {
            try
            {
                var review = await GetReviewByIdAsync(reviewId);
                return review.Dislikes;
            }
            catch (ReviewNotFoundException)
            {
                return 0;
            }
        }
    }
}
