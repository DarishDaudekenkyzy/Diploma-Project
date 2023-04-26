using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ReviewAppProject.Data.Models;

namespace ReviewAppProject.Data.Configuration
{
    public class ReviewUniversityConfiguration : IEntityTypeConfiguration<ReviewUniversity>
    {
        public void Configure(EntityTypeBuilder<ReviewUniversity> builder) {
            builder.HasKey(ru => ru.Id);
            builder.Property(ru => ru.Likes)
                .HasDefaultValue(0);
            builder.Property(ru => ru.Dislikes)
                .HasDefaultValue(0);

            builder.HasOne(ru => ru.University)
                .WithMany(u => u.Reviews)
                .HasForeignKey(ru => ru.UniversityId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(ru => ru.User)
                .WithMany(u => u.ReviewsUniversities)
                .HasForeignKey(ru => ru.UserId) 
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
