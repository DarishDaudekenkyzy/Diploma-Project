using ReviewAppProject.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ReviewAppProject.Data.Configuration
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder) { 
            builder.HasKey(x => x.Id);

            builder.HasOne(u => u.Faculty)
                .WithMany(f => f.Students)
                .HasForeignKey(u => u.FacultyId)
                .OnDelete(DeleteBehavior.SetNull);
        }
    }
}
