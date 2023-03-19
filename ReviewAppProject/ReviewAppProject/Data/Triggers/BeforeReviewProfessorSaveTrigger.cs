using EntityFrameworkCore.Triggered;
using ReviewAppProject.Data.Models.Review;

namespace ReviewAppProject.Data.Triggers
{
    public class BeforeReviewProfessorSaveTrigger : IBeforeSaveTrigger<ReviewProfessor>
    {
        private readonly AppDbContext _dbContext;

        public BeforeReviewProfessorSaveTrigger(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public Task BeforeSave(ITriggerContext<ReviewProfessor> context, CancellationToken cancellationToken)
        {
            if (context.ChangeType == ChangeType.Added)
            {
                context.Entity.CreatedOn = DateTime.Now;
            }
            return Task.CompletedTask;
        }
    }
}
