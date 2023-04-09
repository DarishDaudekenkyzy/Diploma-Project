using ReviewAppProject.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ReviewAppProject.Data.Configuration
{
    public class UserReviewDislikeConfiguration : IEntityTypeConfiguration<UserReviewDislike>
    {
        public void Configure(EntityTypeBuilder<UserReviewDislike> builder) {
            builder.HasKey(d => new { d.UserId, d.ReviewId });

            builder.HasOne(d => d.User)
                .WithMany(d => d.DislikedReviews)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull);

            builder.HasOne(d => d.Review)
                .WithMany(d => d.DislikedUsers)
                .HasForeignKey(d => d.ReviewId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
