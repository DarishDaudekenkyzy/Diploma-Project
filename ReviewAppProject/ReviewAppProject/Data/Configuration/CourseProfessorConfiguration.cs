using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ReviewAppProject.Data.Models;

namespace ReviewAppProject.Data.Configuration
{
    internal class CourseProfessorConfiguration : IEntityTypeConfiguration<CourseProfessor>
    {
        public void Configure(EntityTypeBuilder<CourseProfessor> builder) {
            builder.HasKey(cp => new { cp.CourseId, cp.ProfessorId});

            builder.HasOne(cp => cp.Professor)
                .WithMany(p => p.Courses)
                .HasForeignKey(cp => cp.ProfessorId)
                .OnDelete(DeleteBehavior.ClientSetNull);

            builder.HasOne(cp => cp.Course)
                .WithMany(c => c.Professors)
                .HasForeignKey(cp => cp.CourseId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
