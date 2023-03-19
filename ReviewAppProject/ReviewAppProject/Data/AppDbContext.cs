using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;
using ReviewAppProject.Data.Configuration;
using ReviewAppProject.Data.Models;
using ReviewAppProject.Data.Models.Review;
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
        public DbSet<ReviewTag> Tags{ get; set; }
        public DbSet<ReviewProfessorReviewTag> ReviewsTags{ get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) 
            : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder) 
        {
            new ProfessorEntityTypeConfiguration().Configure(modelBuilder.Entity<Professor>());
            new FacultyEntityTypeConfiguration().Configure(modelBuilder.Entity<Faculty>());
            new CourseEntityTypeConfiguration().Configure(modelBuilder.Entity<Course>());
            new ReviewProfessorEntityTypeConfiguration().Configure(modelBuilder.Entity<ReviewProfessor>());

            modelBuilder.Entity<LikedUserReview>().HasKey(lur => new { lur.UserId, lur.ReviewId });
            modelBuilder.Entity<DislikedUserReview>().HasKey(dlur => new { dlur.UserId, dlur.ReviewId });
            modelBuilder.Entity<ReviewProfessorReviewTag>().HasKey(rprt => new { rprt.ReviewId, rprt.TagId});

            modelBuilder.Entity<LikedUserReview>()
                .HasOne<User>(lur => lur.User)
                .WithMany(u => u.LikedReviews)
                .HasForeignKey(lur => lur.UserId)
                .OnDelete(DeleteBehavior.NoAction);
            modelBuilder.Entity<LikedUserReview>()
                .HasOne<ReviewProfessor>(lur => lur.ReviewProfessor)
                .WithMany(r => r.LikedUsers)
                .HasForeignKey(lur => lur.ReviewId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<DislikedUserReview>()
                .HasOne<User>(lur => lur.User)
                .WithMany(u => u.DislikedReviews)
                .HasForeignKey(lur => lur.UserId)
                .OnDelete(DeleteBehavior.NoAction);
            modelBuilder.Entity<DislikedUserReview>()
                .HasOne<ReviewProfessor>(lur => lur.ReviewProfessor)
                .WithMany(r => r.DislikedUsers)
                .HasForeignKey(lur => lur.ReviewId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<ReviewProfessorReviewTag>()
                .HasOne<ReviewProfessor>(rprt => rprt.ReviewProfessor)
                .WithMany(r => r.Tags)
                .HasForeignKey(rprt => rprt.ReviewId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<ReviewProfessorReviewTag>()
                .HasOne<ReviewTag>(rprt => rprt.Tag)
                .WithMany(tag => tag.Reviews)
                .HasForeignKey(rprt => rprt.TagId);
        }
    }
}
