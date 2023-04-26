using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ReviewAppProject.Data.Models;

namespace ReviewAppProject.Data.Configuration
{
    public class UniversityConfiguration : IEntityTypeConfiguration<University>
    {
        public void Configure(EntityTypeBuilder<University> builder) { 
            builder.HasKey(x => x.Id);
            builder.Property(u => u.Rating)
                .HasDefaultValue(0.0);
            builder.Property(u => u.ReviewsCount)
                .HasDefaultValue(0);

            builder.Property(u => u.Reputation).HasDefaultValue(0.0);
            builder.Property(u => u.Opportunities).HasDefaultValue(0.0);
            builder.Property(u => u.Safety).HasDefaultValue(0.0);
            builder.Property(u => u.Happiness).HasDefaultValue(0.0);
            builder.Property(u => u.Location).HasDefaultValue(0.0);
            builder.Property(u => u.Clubs).HasDefaultValue(0.0);
            builder.Property(u => u.Facilities).HasDefaultValue(0.0);
            builder.Property(u => u.Food).HasDefaultValue(0.0);
            builder.Property(u => u.Internet).HasDefaultValue(0.0);
            builder.Property(u => u.Social).HasDefaultValue(0.0);
        }
    }
}
