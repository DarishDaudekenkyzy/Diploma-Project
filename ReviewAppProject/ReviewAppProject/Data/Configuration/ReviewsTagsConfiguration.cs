using ReviewAppProject.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ReviewAppProject.Data.Configuration
{
    public class ReviewsTagsConfiguration : IEntityTypeConfiguration<ReviewProfessorReviewTag>
    {
        public void Configure(EntityTypeBuilder<ReviewProfessorReviewTag> builder) {
            builder.HasKey(rt => new { rt.ReviewId, rt.TagId });

            builder.HasOne(rt => rt.ReviewProfessor)
                .WithMany(r => r.Tags)
                .HasForeignKey(rt => rt.ReviewId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(rt => rt.Tag)
                .WithMany(t => t.Reviews)
                .HasForeignKey(rt => rt.TagId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
