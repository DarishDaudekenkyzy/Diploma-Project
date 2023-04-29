using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ReviewAppProject.Data.Models;

namespace ReviewAppProject.Data.Configuration
{
    public class ReviewProfessorConfiguration : IEntityTypeConfiguration<ReviewProfessor>
    {
        public void Configure(EntityTypeBuilder<ReviewProfessor> builder) { 
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Difficulty).HasDefaultValue(0);
            builder.Property(x => x.Rating).HasDefaultValue(0);
            builder.Property(x => x.Likes).HasDefaultValue(0);
            builder.Property(x => x.Dislikes).HasDefaultValue(0);
            builder.Property(x => x.Saves).HasDefaultValue(0);
            builder.Property(x => x.WouldTakeAgain).HasDefaultValue(false);
            builder.Property(x => x.WasAttendanceMandatory).HasDefaultValue(false);

            builder.HasOne(r => r.Course)
                .WithMany(c => c.Reviews)
                .HasForeignKey(r => r.CourseId)
                .OnDelete(DeleteBehavior.Cascade);
            builder.HasOne(r => r.Professor)
                .WithMany(p => p.Reviews)
                .HasForeignKey(r => r.ProfessorId)
                .OnDelete(DeleteBehavior.ClientSetNull);
            builder.HasOne(r => r.User)
                .WithMany(u => u.ReviewsProfessors)
                .HasForeignKey(r => r.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
