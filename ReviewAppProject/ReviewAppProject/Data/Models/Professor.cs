namespace ReviewAppProject.Data.Models
{
    public class Professor
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }

        public double WouldTakeAgainPercentage { get; set; }
        public double DifficultyPercentage { get; set; }
        public double AverageRating { get; set; }
        public int ReviewsCount { get; set; }

        public int FacultyId { get; set; }
        public Faculty Faculty { get; set; }

        public ICollection<CourseProfessor> Courses { get; set; }
        public ICollection<ReviewProfessor> Reviews { get; set; }
    }
}
