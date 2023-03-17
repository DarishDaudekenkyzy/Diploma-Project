using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ReviewAppProject.Data.Models;

namespace ReviewAppProject.Data.Configuration
{
    public class ReviewProfessorEntityTypeConfiguration : IEntityTypeConfiguration<ReviewProfessor>
    {
        public void Configure(EntityTypeBuilder<ReviewProfessor> builder) { 
            builder.HasKey(x => x.Id);
            builder
                .HasOne(review => review.Course)
                .WithMany(c => c.ReviewProfessors)
                .HasPrincipalKey(c => c.CourseId)
                .HasForeignKey(review => review.CourseId)
                .OnDelete(DeleteBehavior.NoAction);
        }
    }
}
