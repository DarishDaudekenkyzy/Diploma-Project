using ReviewAppProject.Data.Models;

namespace ReviewAppProject.ViewModels
{
    public class CourseViewModel
    {
        public int CourseId { get; set; }
        public string CourseCode { get; set; }
        public string CourseName { get; set; }

        public string? CourseDescription { get; set; }
        public int FacultyId { get; set; }

        public string? FacultyName { get; set; }

        public CourseViewModel() { }
        public CourseViewModel(Course c) { 
            CourseId = c.Id;
            CourseCode = c.CourseCode;
            CourseName = c.CourseName;
            CourseDescription = c.CourseDescription;
            FacultyId = c.FacultyId;

            if (c.Faculty != null) {
                FacultyName = c.Faculty.FacultyName;
            }
        }
    }
}
