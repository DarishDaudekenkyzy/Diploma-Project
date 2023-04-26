using ReviewAppProject.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ReviewAppProject.Data.Configuration
{
    public class UserReviewProfessorLikeConfiguration : IEntityTypeConfiguration<UserReviewProfessorLike>
    {
        public void Configure(EntityTypeBuilder<UserReviewProfessorLike> builder) {
            builder.HasKey(l => new { l.UserId, l.ReviewId });

            builder.HasOne(l => l.User)
                .WithMany(u => u.LikedReviewsProfessors)
                .HasForeignKey(l => l.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull);

            builder.HasOne(l => l.Review)
                .WithMany(r => r.LikedUsers)
                .HasForeignKey(l => l.ReviewId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
