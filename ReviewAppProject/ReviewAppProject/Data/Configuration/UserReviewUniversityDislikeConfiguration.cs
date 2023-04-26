using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ReviewAppProject.Data.Models;

namespace ReviewAppProject.Data.Configuration
{
    public class UserReviewUniversityDislikeConfiguration : IEntityTypeConfiguration<UserReviewUniversityDislike>
    {
        public void Configure(EntityTypeBuilder<UserReviewUniversityDislike> builder) {
            builder.HasKey(d => new { d.UserId, d.ReviewId });

            builder.HasOne(d => d.User)
                .WithMany(u => u.DislikedReviewsUniversities)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull);

            builder.HasOne(d => d.Review)
                .WithMany(r => r.DislikedUsers)
                .HasForeignKey(d => d.ReviewId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
