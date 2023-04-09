using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;
using ReviewAppProject.Data.Configuration;
using ReviewAppProject.Data.Models;

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
        public DbSet<UserReviewLike> UserReviewLikes { get; set; }
        public DbSet<UserReviewDislike> UserReviewDislikes { get; set; }
        public DbSet<ReviewTag> Tags { get; set; }
        public DbSet<ReviewProfessorReviewTag> ReviewsTags { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) 
            : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder) 
        {
            new ProfessorConfiguration().Configure(modelBuilder.Entity<Professor>());
            new CourseConfiguration().Configure(modelBuilder.Entity<Course>());
            new FacultyConfiguration().Configure(modelBuilder.Entity<Faculty>());
            new CourseProfessorConfiguration().Configure(modelBuilder.Entity<CourseProfessor>());
            new UserConfiguration().Configure(modelBuilder.Entity<User>());
            new ReviewProfessorConfiguration().Configure(modelBuilder.Entity<ReviewProfessor>());
            new ReviewsTagsConfiguration().Configure(modelBuilder.Entity<ReviewProfessorReviewTag>());
            new UserReviewLikeConfiguration().Configure(modelBuilder.Entity<UserReviewLike>());
            new UserReviewDislikeConfiguration().Configure(modelBuilder.Entity<UserReviewDislike>());
        }
    }
}
