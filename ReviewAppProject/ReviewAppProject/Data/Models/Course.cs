using Newtonsoft.Json;

namespace ReviewAppProject.Data.Models
{
    public class Course
    {
        public int CourseId { get; set; }
        public string CourseCode { get; set; }
        public string CourseName { get; set; }
        public int FacultyId { get; set; }
        public Faculty Faculty { get; set; }
        public virtual ICollection<Professor> Professors { get; set; }
    }
}
