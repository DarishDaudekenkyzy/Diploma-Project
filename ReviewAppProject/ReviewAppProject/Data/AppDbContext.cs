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
        public DbSet<University> Universities { get; set; }
        public DbSet<Faculty> Faculties { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Professor> Professors { get; set; }
        public DbSet<Course> Courses { get; set; }
        public DbSet<CourseProfessor> CoursesProfessors { get; set; }
        public DbSet<ReviewProfessor> ReviewProfessors { get; set; }
        public DbSet<LikedUserReview> UserReviewLikes { get; set; }
        public DbSet<DislikedUserReview> UserReviewDislikes { get; set; }
        public DbSet<ReviewTag> Tags { get; set; }
        public DbSet<ReviewProfessorReviewTag> ReviewsTags { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) 
            : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder) 
        {
            new FacultyEntityTypeConfiguration().Configure(modelBuilder.Entity<Faculty>());
            new UserEntityTypeConfiguration().Configure(modelBuilder.Entity<User>());
            new ProfessorEntityTypeConfiguration().Configure(modelBuilder.Entity<Professor>());
            new CourseEntityTypeConfiguration().Configure(modelBuilder.Entity<Course>());
            new CourseProfessorEntityTypeConfiguration().Configure(modelBuilder.Entity<CourseProfessor>());
            new ReviewProfessorEntityTypeConfiguration().Configure(modelBuilder.Entity<ReviewProfessor>());
            new ReviewProfessorReviewTagEntityTypeConfiguration().Configure(modelBuilder.Entity<ReviewProfessorReviewTag>());
            new LikedUserReviewConfiguration().Configure(modelBuilder.Entity<LikedUserReview>());
            new DislikedUserReviewConfiguration().Configure(modelBuilder.Entity<DislikedUserReview>());
        }
    }
}
