using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ReviewAppProject.Data.Models;

namespace ReviewAppProject.Data.Configuration
{
    public class FacultyEntityTypeConfiguration : IEntityTypeConfiguration<Faculty>
    {
        public void Configure(EntityTypeBuilder<Faculty> builder)
        {
            builder.Property(p => p.FacultyName)
                .IsRequired();
            builder.HasMany(f => f.Professors)
                .WithOne(p => p.Faculty)
                .OnDelete(DeleteBehavior.Restrict);
            builder.HasMany(f => f.Users)
                .WithOne(u => u.Faculty)
                .OnDelete(DeleteBehavior.Restrict);
            builder.HasMany(f => f.Courses)
                .WithOne(c => c.Faculty)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
