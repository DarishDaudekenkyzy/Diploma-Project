using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ReviewAppProject.Data.Models;

namespace ReviewAppProject.Data.Configuration
{
    public class UserReviewUniversityLikeConfiguration : IEntityTypeConfiguration<UserReviewUniversityLike>
    {
        public void Configure(EntityTypeBuilder<UserReviewUniversityLike> builder) {
            builder.HasKey(l => new { l.UserId, l.ReviewId });

            builder.HasOne(l => l.User)
                .WithMany(u => u.LikedReviewsUniversities)
                .HasForeignKey(l => l.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull);

            builder.HasOne(l => l.Review)
                .WithMany(r => r.LikedUsers)
                .HasForeignKey(l => l.ReviewId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
