using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ReviewAppProject.Data.Models;

namespace ReviewAppProject.Data.Configuration
{
    public class UserEntityTypeConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder) {
            builder.HasKey(u => u.UserId);
            builder.HasOne(u => u.University)
                .WithMany(u => u.Students)
                .HasForeignKey(u => u.UniversityId)
                .OnDelete(DeleteBehavior.Restrict);
            builder.HasOne(u => u.Faculty)
                .WithMany(f => f.Users)
                .HasForeignKey(u => u.FacultyId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
