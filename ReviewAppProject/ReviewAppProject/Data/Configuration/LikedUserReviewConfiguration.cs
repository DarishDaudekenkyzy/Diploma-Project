using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ReviewAppProject.Data.Models;
using ReviewAppProject.Data.Models.Review;
using System.Reflection.Emit;

namespace ReviewAppProject.Data.Configuration
{
    public class LikedUserReviewConfiguration : IEntityTypeConfiguration<LikedUserReview>
    {
        public void Configure(EntityTypeBuilder<LikedUserReview> builder)
        {
            builder.HasKey(lur => new { lur.UserId, lur.ReviewId });
            
            builder
                .HasOne(lur => lur.User)
                .WithMany(u => u.LikedReviews)
                .HasForeignKey(lur => lur.UserId)
                .OnDelete(DeleteBehavior.Restrict);
            builder
                .HasOne(lur => lur.ReviewProfessor)
                .WithMany(r => r.LikedUsers)
                .HasForeignKey(lur => lur.ReviewId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
