using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ReviewAppProject.Data.Models;

namespace ReviewAppProject.Data.Configuration
{
    public class CourseProfessorEntityTypeConfiguration : IEntityTypeConfiguration<CourseProfessor>
    {
        public void Configure(EntityTypeBuilder<CourseProfessor> builder)
        {
            builder.HasKey(cp => new { cp.ProfessorId, cp.CourseId });

            builder.HasOne(cp => cp.Professor)
                .WithMany(p => p.Courses)
                .HasForeignKey(cp => cp.ProfessorId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(cp => cp.Course)
                .WithMany(c => c.Professors)
                .HasForeignKey(cp => cp.CourseId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
