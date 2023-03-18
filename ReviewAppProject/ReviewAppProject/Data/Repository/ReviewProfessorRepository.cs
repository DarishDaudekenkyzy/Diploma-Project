using Microsoft.EntityFrameworkCore;
using ReviewAppProject.Data.Models;
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
            var reviews = _context.ReviewProfessors.OrderBy(rp => rp.Id).AsAsyncEnumerable();

            await foreach (var review in reviews)
            {
                yield return review;
            }
        }

        public async IAsyncEnumerable<ReviewProfessor> GetAllReviewsOfUserAsync(int userId)
        {
            var reviews = _context.ReviewProfessors.Where(rp => rp.UserId == userId).AsAsyncEnumerable();

            await foreach (var review in reviews)
            {
                yield return review;
            }
        }

        public async IAsyncEnumerable<ReviewProfessor> GetAllReviewsWithProfessorAsync(int professorId)
        {
            var reviews = _context.ReviewProfessors.Where(rp => rp.ProfessorId == professorId)
                .Include(rp => rp.Course)
                .Include(rp => rp.User)
                .AsAsyncEnumerable();

            await foreach (var review in reviews)
            {
                yield return review;
            }
        }

        public async Task<ReviewProfessor> GetReviewByIdAsync(int? id)
        {
            return await _context.ReviewProfessors.FirstOrDefaultAsync(rp => rp.Id == id)
                ?? throw new ReviewNotFoundException();
        }

        public async Task<ReviewProfessor> GetReviewByTitleAsync(string title)
        {
            return await _context.ReviewProfessors.FirstOrDefaultAsync(rp => rp.Title == title)
                ?? throw new ReviewNotFoundException();
        }

        public async Task<ReviewProfessor> GetReviewByUserAndProfessorAndCourseAsync(int userId, int professorId, int courseId)
        {
            return await _context.ReviewProfessors.Where(rp => rp.ProfessorId == professorId && rp.UserId == userId && rp.CourseId == courseId).FirstOrDefaultAsync()
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

                return true;
            }
        }
    }
}
