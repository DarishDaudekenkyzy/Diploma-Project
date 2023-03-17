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

        public AppDbContext(DbContextOptions<AppDbContext> options) 
            : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder) 
        {
            new ProfessorEntityTypeConfiguration().Configure(modelBuilder.Entity<Professor>());
            new CourseEntityTypeConfiguration().Configure(modelBuilder.Entity<Course>());
            new ReviewProfessorEntityTypeConfiguration().Configure(modelBuilder.Entity<ReviewProfessor>());
        }
    }
}
