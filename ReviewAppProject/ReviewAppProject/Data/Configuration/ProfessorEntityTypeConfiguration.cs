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
            builder
                .HasMany(p => p.Courses)
                .WithMany(c => c.Professors)
                .UsingEntity<Dictionary<string, object>>(
                    "CourseProfessor",
                    x => x.HasOne<Course>().WithMany().OnDelete(DeleteBehavior.NoAction),
                    x => x.HasOne<Professor>().WithMany().OnDelete(DeleteBehavior.NoAction)
                );
        }
    }
}
