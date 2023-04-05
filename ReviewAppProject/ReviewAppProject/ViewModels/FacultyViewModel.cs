using ReviewAppProject.Data.Models;

namespace ReviewAppProject.ViewModels
{
    public class FacultyViewModel
    {
        public int FacultyId { get; set; }
        public string FacultyName { get; set; }
        public string? Description { get; set; }

        public UniversityViewModel? University { get; set; }

        public ICollection<CourseViewModel>? Courses { get; set; } = new List<CourseViewModel>();
        public ICollection<ProfessorViewModel>? Professors { get; set; } = new List<ProfessorViewModel>();

        public FacultyViewModel() { }

        public FacultyViewModel(Faculty faculty) {
            FacultyId = faculty.FacultyId;
            FacultyName= faculty.FacultyName;
            Description = faculty.Description;
            if (faculty.University != null) {
                University = new UniversityViewModel(new University
                {
                    Id = faculty.University.Id,
                    Name = faculty.University.Name,
                    Acronym = faculty.University.Acronym
                });
            }
            if (faculty.Courses != null) {
                foreach (var course in faculty.Courses)
                {
                    Courses.Add(new CourseViewModel(course));
                }
            }
            if (faculty.Professors != null)
            {
                foreach (var professor in faculty.Professors)
                {
                    Professors.Add(new ProfessorViewModel {
                        ProfessorId = professor.ProfessorId,
                        FirstName = professor.FirstName,
                        LastName = professor.LastName,
                        Email = professor.Email
                    });
                }
            }
        }
    }
}
