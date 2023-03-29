using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ReviewAppProject.Data.Models;

namespace ReviewAppProject.Data.Configuration
{
    public class ProfessorEntityTypeConfiguration : IEntityTypeConfiguration<Professor>
    {
        public void Configure(EntityTypeBuilder<Professor> builder) {
            builder.HasKey(p => p.ProfessorId);
            builder.Property(p => p.FirstName).IsRequired().HasMaxLength(128);
            builder.Property(p => p.LastName).IsRequired().HasMaxLength(128);

            builder.HasOne(p => p.University)
                .WithMany(u => u.Professors)
                .HasForeignKey(p => p.UniversityId)
                .OnDelete(DeleteBehavior.Restrict);
            builder.HasOne(p => p.Faculty)
                .WithMany(f => f.Professors)
                .HasForeignKey(p => p.FacultyId)
                .OnDelete(DeleteBehavior.Cascade);

        }
    }
}
