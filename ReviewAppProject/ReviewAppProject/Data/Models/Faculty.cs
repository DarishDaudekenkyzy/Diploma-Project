namespace ReviewAppProject.Data.Models
{
    public class Faculty
    {
        public int FacultyId { get; set; }
        public string FacultyName { get; set; }

        public string? FacultyDescription { get; set; }

        public int CoursesCount { get; set; }

        public int UniversityId { get; set; }
        public University University { get; set; }

        public ICollection<Course> Courses { get; set; }
        public ICollection<Professor> Professors { get; set; }
        public ICollection<User>? Students { get; set; }
    }
}
