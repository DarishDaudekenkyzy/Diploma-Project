using Microsoft.EntityFrameworkCore;
using ReviewAppProject.Data.Models;
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
                .Include(rp => rp.Tags)
                .ThenInclude(t => t.Tag)
                .AsAsyncEnumerable();

            await foreach (var review in reviews)
            {
                yield return review;
            }
        }

        public async IAsyncEnumerable<ReviewProfessor> GetAllReviewsOfUserAsync(int userId)
        {
            var reviews = _context.ReviewProfessors
                .Where(rp => rp.UserId == userId)
                .Include(rp => rp.Professor)
                .ThenInclude(p => p.Faculty)
                .ThenInclude(f => f.University)
                .Include(rp => rp.Course)
                .Include(rp => rp.User)
                .Include(rp => rp.Tags)
                .ThenInclude(t => t.Tag)
                .AsAsyncEnumerable();

            await foreach (var review in reviews)
            {
                yield return review;
            }
        }

        public async IAsyncEnumerable<ReviewProfessor> GetAllReviewsOfProfessorAsync(int professorId)
        {
            var reviews = _context.ReviewProfessors
                .Where(rp => rp.ProfessorId == professorId)
                .Include(rp => rp.Professor)
                .ThenInclude(p => p.Faculty)
                .ThenInclude(f => f.University)
                .Include(rp => rp.Course)
                .Include(rp => rp.User)
                .Include(rp => rp.Tags)
                .ThenInclude(t => t.Tag)
                .AsAsyncEnumerable();

            await foreach (var review in reviews)
            {
                yield return review;
            }
        }

        public async IAsyncEnumerable<ReviewProfessor> GetAllReviewsOfCourseAsync(int courseId) {
            var reviews = _context.ReviewProfessors
                .Where(rp => rp.CourseId == courseId)
                .Include(rp => rp.Professor)
                .ThenInclude(p => p.Faculty)
                .ThenInclude(f => f.University)
                .Include(rp => rp.Course)
                .Include(rp => rp.User)
                .Include(rp => rp.Tags)
                .ThenInclude(t => t.Tag)
                .AsAsyncEnumerable();

            await foreach (var review in reviews)
            {
                yield return review;
            }
        }

        public async IAsyncEnumerable<ReviewProfessor> GetSavedReviewsOfUser(int userId)
        {
            var reviews = _context.ReviewProfessors
                .Where(rp => _context.UserSavedReviewProfessors.Any(s => s.UserId == userId && s.ReviewId == rp.Id))
                .Include(rp => rp.Professor)
                .ThenInclude(p => p.Faculty)
                .ThenInclude(f => f.University)
                .Include(rp => rp.Course)
                .Include(rp => rp.User)
                .Include(rp => rp.Tags)
                .ThenInclude(t => t.Tag)
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
                .Include(rp => rp.Tags)
                .ThenInclude(t => t.Tag)
                .FirstOrDefaultAsync()
                ?? throw new ReviewNotFoundException();
        }

        public async Task CreateReviewAsync(ReviewProfessorCreateModel rpModel)
        {
            var review = new ReviewProfessor
                {
                    Title = rpModel.Title,
                    Content = rpModel.Content,
                    Rating = rpModel.Rating,
                    Difficulty = rpModel.Difficulty,
                    WouldTakeAgain= rpModel.WouldTakeAgain,
                    WasAttendanceMandatory = rpModel.WasAttendanceMandatory,
                    CreatedOn = DateTime.Now,

                    CourseId = rpModel.CourseId,
                    ProfessorId = rpModel.ProfessorId,
                    UserId = rpModel.UserId,
            };

            await _context.ReviewProfessors.AddAsync(review);
            _context.Entry(review).State = EntityState.Added;
            await _context.SaveChangesAsync();
                
            foreach (var tag in rpModel.tags)
                _context.ReviewsProfessorTags.Add(new ReviewProfessorReviewTag { ReviewId = review.Id, TagId = tag.TagId });
            
            await _context.SaveChangesAsync();
        }

        public async Task LikeReviewAsync(ReviewProfessor review, User user)
        {
            var like = new UserReviewProfessorLike { ReviewId = review.Id, UserId = user.Id };
            await _context.UserReviewProfessorLikes.AddAsync(like);
            review.Likes++;
            _context.Entry(like).State = EntityState.Added;
            _context.Entry(review).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DislikeReviewAsync(ReviewProfessor review, User user)
        {
            var dislike = new UserReviewProfessorDislike { ReviewId = review.Id, UserId = user.Id };
            await _context.UserReviewProfessorDislikes.AddAsync(dislike);
            review.Dislikes++;
            _context.Entry(dislike).State = EntityState.Added;
            _context.Entry(review).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task RemoveLikeAsync(ReviewProfessor review, User user) {
            var like = await _context.UserReviewProfessorLikes.Where(l => l.UserId == user.Id && l.ReviewId == review.Id).FirstAsync();
            _context.UserReviewProfessorLikes.Remove(like);
            review.Likes--;
            _context.Entry(like).State = EntityState.Deleted;
            _context.Entry(review).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task RemoveDisikeAsync(ReviewProfessor review, User user)
        {
            var dislike = await _context.UserReviewProfessorDislikes.Where(d => d.UserId == user.Id && d.ReviewId == review.Id).FirstAsync();
            _context.UserReviewProfessorDislikes.Remove(dislike);
            review.Dislikes--;
            _context.Entry(dislike).State = EntityState.Deleted;
            _context.Entry(review).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task<bool> DidUserLikedReview(int reviewId, int userId) {
            return await _context.UserReviewProfessorLikes.Where(l => l.UserId == userId && l.ReviewId == reviewId).AnyAsync();
        }
        public async Task<bool> DidUserDislikedReview(int reviewId, int userId)
        {
            return await _context.UserReviewProfessorDislikes.Where(d => d.UserId == userId && d.ReviewId == reviewId).AnyAsync();
        }

        public async Task DeleteReviewAsync(ReviewProfessor review)
        {
            _context.ReviewProfessors.Remove(review);
            _context.Entry(review).State = EntityState.Deleted;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAllReviewsWithProfessorId(int professorId) {
            var reviews = _context.ReviewProfessors.Where(r => r.ProfessorId == professorId);
            _context.RemoveRange(reviews);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> IsReviewByUserExists(int userId, int courseId, int professorId) {
            return await _context.ReviewProfessors
                .Where(r => r.UserId == userId &&
                r.ProfessorId == professorId &&
                r.CourseId == courseId).AnyAsync();
        }

        public async Task<bool> IsReviewSavedByUserAsync(int userId, int reviewId) {
            return await _context.UserSavedReviewProfessors
                .Where(s => s.UserId == userId &&
                s.ReviewId == reviewId)
                .AnyAsync();
        }

        public async Task SaveReviewAsync(ReviewProfessor review, User user) {
            var savedReview = new UserSavedReviewProfessor
            {
                UserId = user.Id,
                ReviewId = review.Id,
            };
            await _context.UserSavedReviewProfessors.AddAsync(savedReview);
            review.Saves++;
            _context.Entry(savedReview).State = EntityState.Added;
            _context.Entry(review).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task UnsaveReviewAsync(ReviewProfessor review, User user)
        {
            var savedReview = await _context.UserSavedReviewProfessors
                .Where(s => s.UserId == user.Id && s.ReviewId == review.Id).FirstAsync();

            _context.UserSavedReviewProfessors.Remove(savedReview);
            review.Saves--;
            _context.Entry(savedReview).State = EntityState.Deleted;
            _context.Entry(review) .State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }
    }
}
