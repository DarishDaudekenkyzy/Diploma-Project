using Microsoft.EntityFrameworkCore;
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
        public DbSet<ReviewUniversity> ReviewUniversities { get; set; }
        public DbSet<UserReviewProfessorLike> UserReviewProfessorLikes { get; set; }
        public DbSet<UserReviewProfessorDislike> UserReviewProfessorDislikes { get; set; }
        public DbSet<UserReviewUniversityLike> UserReviewUniversityLikes { get; set; }
        public DbSet<UserReviewUniversityDislike> UserReviewUniversityDislikes { get; set; }

        public DbSet<UserSavedReviewProfessor> UserSavedReviewProfessors { get; set; }
        public DbSet<ReviewProfessorTag> ReviewProfessorTags { get; set; }
        public DbSet<ReviewProfessorReviewTag> ReviewsProfessorTags { get; set; }

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
            new ReviewUniversityConfiguration().Configure(modelBuilder.Entity<ReviewUniversity>());

            new ReviewsTagsConfiguration().Configure(modelBuilder.Entity<ReviewProfessorReviewTag>());

            new UserReviewProfessorLikeConfiguration().Configure(modelBuilder.Entity<UserReviewProfessorLike>());
            new UserReviewProfessorDislikeConfiguration().Configure(modelBuilder.Entity<UserReviewProfessorDislike>());

            new UserReviewUniversityLikeConfiguration().Configure(modelBuilder.Entity<UserReviewUniversityLike>());
            new UserReviewUniversityDislikeConfiguration().Configure(modelBuilder.Entity<UserReviewUniversityDislike>());

            new UserSavedReviewProfessorConfiguration().Configure(modelBuilder.Entity<UserSavedReviewProfessor>());
        }
    }
}
