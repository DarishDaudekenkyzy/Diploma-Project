namespace ReviewAppProject.Data.Models
{
    public class Faculty
    {
        public int FacultyId { get; set; }

        public string FacultyName { get; set; }

        public string? Description { get; set; }

        public int UniversityId { get; set; }
        public University University { get; set; }
        public virtual ICollection<Professor> Professors { get; set; }
        public virtual ICollection<Course> Courses{ get; set; }
        public virtual ICollection<User> Users{ get; set; }
    }
}
