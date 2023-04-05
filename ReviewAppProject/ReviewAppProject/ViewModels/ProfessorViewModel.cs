using Microsoft.IdentityModel.Tokens;
using ReviewAppProject.Data.Models;

namespace ReviewAppProject.ViewModels
{
    public class ProfessorViewModel
    {
        public int ProfessorId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public double WouldTakeAgainPercentage { get; set; }
        public double DifficultyPercentage { get; set; }
        public double Rating { get; set; }
        public int ReviewsCount { get; set; }

        public UniversityViewModel? University { get; set; }
        public FacultyViewModel? Faculty { get; set; }
        public ICollection<CourseViewModel>? Courses { get; set; } = new List<CourseViewModel>();

        public ProfessorViewModel() {
        }

        public ProfessorViewModel(Professor professor) {
            ProfessorId = professor.ProfessorId;
            FirstName = professor.FirstName;
            LastName = professor.LastName;
            Email = professor.Email;
            DifficultyPercentage = professor.DifficultyPercentage;
            WouldTakeAgainPercentage = professor.WouldTakeAgainPercentage;
            Rating = professor.Rating;
            ReviewsCount = professor.ReviewsCount;

            if (professor.University != null)
                University = new UniversityViewModel(new University { 
                    Id = professor.University.Id,
                    Name = professor.University.Name,
                    Acronym = professor.University.Acronym
                });
            if (professor.Faculty != null)
                Faculty = new FacultyViewModel { FacultyId = professor.FacultyId, FacultyName = professor.Faculty.FacultyName };
            if (!professor.Courses.IsNullOrEmpty()) {
                foreach (var course in professor.Courses) {
                    Courses.Add(new CourseViewModel(course.Course));
                }
            }
        }
    }
}
