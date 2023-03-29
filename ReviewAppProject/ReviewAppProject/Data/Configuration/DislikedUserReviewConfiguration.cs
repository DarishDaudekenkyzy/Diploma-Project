using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ReviewAppProject.Data.Models.Review;

namespace ReviewAppProject.Data.Configuration
{
    public class DislikedUserReviewConfiguration : IEntityTypeConfiguration<DislikedUserReview>
    {
        public void Configure(EntityTypeBuilder<DislikedUserReview> builder)
        {
            builder.HasKey(dlur => new { dlur.UserId, dlur.ReviewId });
            builder
                .HasOne(dlur => dlur.User)
                .WithMany(u => u.DislikedReviews)
                .HasForeignKey(dlur => dlur.UserId)
                .OnDelete(DeleteBehavior.Restrict);
            builder
                .HasOne(dlur => dlur.ReviewProfessor)
                .WithMany(r => r.DislikedUsers)
                .HasForeignKey(dlur => dlur.ReviewId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
