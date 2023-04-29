using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ReviewAppProject.Data.Models;

namespace ReviewAppProject.Data.Configuration
{
    public class UserSavedReviewProfessorConfiguration : IEntityTypeConfiguration<UserSavedReviewProfessor>
    {
        public void Configure(EntityTypeBuilder<UserSavedReviewProfessor> builder) {
            builder.HasKey(s => new { s.UserId, s.ReviewId });

            builder.HasOne(s => s.User)
                .WithMany(u => u.SavedReviewProfessors)
                .HasForeignKey(s => s.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull);
            builder.HasOne(s => s.Review)
                .WithMany(r => r.SavedUsers)
                .HasForeignKey(s => s.ReviewId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
