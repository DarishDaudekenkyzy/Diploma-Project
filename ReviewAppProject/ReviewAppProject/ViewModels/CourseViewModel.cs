using ReviewAppProject.Data.Models;

namespace ReviewAppProject.ViewModels
{
    public class CourseViewModel
    {
        public int CourseId { get; set; }
        public string CourseCode { get; set; }
        public string CourseName { get; set; }
        public int FacultyId { get; set; }

        public CourseViewModel() { }
        public CourseViewModel(Course c) { 
            CourseId = c.CourseId;
            CourseCode = c.CourseCode;
            CourseName = c.CourseName;
            FacultyId = c.FacultyId;
        }
    }
}
