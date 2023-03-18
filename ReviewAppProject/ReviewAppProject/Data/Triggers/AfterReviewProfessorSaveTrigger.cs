using EntityFrameworkCore.Triggered;
using EntityFrameworkCore.Triggered.Lifecycles;
using Microsoft.EntityFrameworkCore;
using ReviewAppProject.Data.Models;
using ReviewAppProject.Data.Repository;
using Serilog;

namespace ReviewAppProject.Data.Triggers
{
    public class AfterReviewProfessorSaveTrigger : IAfterSaveTrigger<ReviewProfessor>
    {
        private readonly AppDbContext _dbContext;
        private readonly IProfessorRepository _profRepo;

        public AfterReviewProfessorSaveTrigger(AppDbContext dbContext, IProfessorRepository profRepo)
        {
            _dbContext = dbContext;
            _profRepo = profRepo;
        }

        public async Task AfterSave(ITriggerContext<ReviewProfessor> context, CancellationToken cancellationToken)
        {
            if (context.ChangeType == ChangeType.Added)
            {
                await UpdateProfessor(context);
            }
        }

        private async Task UpdateProfessor(ITriggerContext<ReviewProfessor> context)
        {
            var professor = await _profRepo.GetProfessorByIdAsync(context.Entity.ProfessorId);
            professor.ReviewsCount++;
            professor.Rating = await GetAverageRatingOfProfessor(professor.ProfessorId);
            professor.WouldTakeAgainPercentage = CalculateWouldTakeAgainPercentage(professor.ProfessorId);
            professor.DifficultyPercentage = await CalculateDifficultyPercentage(professor.ProfessorId);
            await _profRepo.Update(professor);
        }

        private double CalculateWouldTakeAgainPercentage(int professorId)
        {
            var reviews = _dbContext.ReviewProfessors.Where(rp => rp.ProfessorId == professorId);
            var wouldTakeAgainCount = reviews.Where(rp => rp.WouldTakeAgain == true).Count();
            return Math.Round((double)wouldTakeAgainCount / reviews.Count() * 100.0, 2);
        }

        private async Task<double> CalculateDifficultyPercentage(int professorId)
        {
            var average = await _dbContext.ReviewProfessors.Where(rp => rp.ProfessorId == professorId).Select(rp => rp.Difficulty).AverageAsync();
            return Math.Round((average / 5.0) * 100.0, 2);
        }

        private async Task<double> GetAverageRatingOfProfessor(int professorId)
        {
            var averageRating = await _dbContext.ReviewProfessors.Where(rp => rp.ProfessorId == professorId).Select(rp => rp.Rating).AverageAsync();
            Log.Information($"averageRating: {averageRating}");
            return averageRating;
        }
    }
}
