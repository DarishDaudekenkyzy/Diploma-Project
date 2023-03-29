using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ReviewAppProject.Data.Models.Review;

namespace ReviewAppProject.Data.Configuration
{
    public class ReviewProfessorEntityTypeConfiguration : IEntityTypeConfiguration<ReviewProfessor>
    {
        public void Configure(EntityTypeBuilder<ReviewProfessor> builder) { 
            builder.HasKey(x => x.Id);
            builder.HasOne(review => review.Professor)
                .WithMany(p => p.Reviews)
                .HasForeignKey(review => review.ProfessorId)
                .OnDelete(DeleteBehavior.Restrict);
            builder.HasOne(review => review.User)
                .WithMany(user => user.ReviewProfessors)
                .HasForeignKey(review => review.UserId)
                .OnDelete(DeleteBehavior.Restrict);
            builder
                .HasOne(review => review.Course)
                .WithMany(c => c.ReviewProfessors)
                .HasForeignKey(review => review.CourseId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
