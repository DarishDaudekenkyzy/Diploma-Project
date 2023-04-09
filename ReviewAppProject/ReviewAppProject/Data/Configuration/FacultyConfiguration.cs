using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ReviewAppProject.Data.Models;

namespace ReviewAppProject.Data.Configuration
{
    internal class FacultyConfiguration : IEntityTypeConfiguration<Faculty>
    {
        public void Configure(EntityTypeBuilder<Faculty> builder) {
            builder.HasKey(f => f.FacultyId);
            builder.HasOne(f => f.University)
                .WithMany(u => u.Faculties)
                .HasForeignKey(f => f.UniversityId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
