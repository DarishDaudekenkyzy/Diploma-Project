using ReviewAppProject.Data.Models;

namespace ReviewAppProject.Models
{
    public class CourseCreateModel
    {
        public string CourseCode { get; set; }

        public string CourseName { get; set; }

        public string? CourseDescription { get; set; }

        public int UniversityId { get; set; }
        
        public int FacultyId { get; set; }
    }
}
