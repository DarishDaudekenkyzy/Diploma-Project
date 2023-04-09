using ReviewAppProject.Data.Models;

namespace ReviewAppProject.ViewModels
{
    public class FacultyViewModel
    {
        public int FacultyId { get; set; }
        public string FacultyName { get; set; }
        public string? Description { get; set; }

        public int? CoursesCount { get; set; }

        public int UniversityId { get; set; }

        public UniversityViewModel? University { get; set; }


        public FacultyViewModel() { }

        public FacultyViewModel(Faculty faculty) {
            FacultyId = faculty.FacultyId;
            FacultyName= faculty.FacultyName;
            Description = faculty.FacultyDescription;
            CoursesCount = faculty.CoursesCount;
            UniversityId = faculty.UniversityId;
        }
    }
}
