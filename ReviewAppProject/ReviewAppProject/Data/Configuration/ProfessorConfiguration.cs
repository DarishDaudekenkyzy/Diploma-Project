using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ReviewAppProject.Data.Models;

namespace ReviewAppProject.Data.Configuration
{
    internal class ProfessorConfiguration : IEntityTypeConfiguration<Professor>
    {
        public void Configure(EntityTypeBuilder<Professor> builder) {
            builder.HasKey(p => p.Id);
            builder.Property(p => p.WouldTakeAgainPercentage)
                .HasDefaultValue(0.0);
            builder.Property(p => p.DifficultyPercentage)
                .HasDefaultValue(0.0);
            builder.Property(p => p.AverageRating)
                .HasDefaultValue(0.0);
            builder.Property(p => p.ReviewsCount)
                .HasDefaultValue(0);

            builder.HasOne(p => p.Faculty)
                .WithMany(f => f.Professors)
                .HasForeignKey(p => p.FacultyId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
