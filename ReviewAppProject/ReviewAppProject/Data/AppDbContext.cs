using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;
using ReviewAppProject.Data.Configuration;
using ReviewAppProject.Data.Models;
using System.Reflection.Metadata;

namespace ReviewAppProject.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Faculty> Faculties { get; set; }
        public DbSet<Professor> Professors { get; set; }
        public DbSet<Course> Courses { get; set; }
        public DbSet<ReviewProfessor> ReviewProfessors { get; set; }
        public DbSet<LikedUserReview> UserReviewLikes { get; set; }
        public DbSet<DislikedUserReview> UserReviewDislikes { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) 
            : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder) 
        {
            new ProfessorEntityTypeConfiguration().Configure(modelBuilder.Entity<Professor>());
            new CourseEntityTypeConfiguration().Configure(modelBuilder.Entity<Course>());
            new ReviewProfessorEntityTypeConfiguration().Configure(modelBuilder.Entity<ReviewProfessor>());

            modelBuilder.Entity<LikedUserReview>().HasKey(lur => new { lur.UserId, lur.ReviewId });
            modelBuilder.Entity<DislikedUserReview>().HasKey(dlur => new { dlur.UserId, dlur.ReviewId });

            modelBuilder.Entity<LikedUserReview>()
                .HasOne<User>(lur => lur.User)
                .WithMany(u => u.LikedReviews)
                .HasForeignKey(lur => lur.UserId);
            modelBuilder.Entity<LikedUserReview>()
                .HasOne<ReviewProfessor>(lur => lur.ReviewProfessor)
                .WithMany(r => r.LikedUsers)
                .HasForeignKey(lur => lur.ReviewId);

            modelBuilder.Entity<DislikedUserReview>()
                .HasOne<User>(dlur => dlur.User)
                .WithMany(u => u.DislikedReviews)
                .HasForeignKey(dlur => dlur.UserId);

            modelBuilder.Entity<DislikedUserReview>()
                .HasOne<ReviewProfessor>(dlur => dlur.ReviewProfessor)
                .WithMany(r => r.DislikedUsers)
                .HasForeignKey(dlur => dlur.ReviewId);
        }
    }
}
