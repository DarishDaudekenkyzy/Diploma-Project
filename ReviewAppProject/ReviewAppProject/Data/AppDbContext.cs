using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;
using ReviewAppProject.Data.Models;

namespace ReviewAppProject.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Faculty> Faculties { get; set; }
        public DbSet<Professor> Professors { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) 
            : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder) 
        {

            
        }
    }
}
