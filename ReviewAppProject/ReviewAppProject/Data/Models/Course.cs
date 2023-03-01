namespace ReviewAppProject.Data.Models
{
    public class Course
    {
        public Guid CourseId { get; set; }
        public string CourseName { get; set; }

        public ICollection<Professor> Professors{ get; set; }

        public Guid FacultyId { get; set; }
        public Faculty Faculty { get; set; }
    }
}
