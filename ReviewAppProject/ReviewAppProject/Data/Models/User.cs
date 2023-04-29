namespace ReviewAppProject.Data.Models
{
    public class User
    {
        public int Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public int Year { get; set; }
        public int? FacultyId { get; set; } = 0;
        public Faculty? Faculty { get; set; }

        public ICollection<ReviewProfessor> ReviewsProfessors { get; set; }
        public ICollection<ReviewUniversity> ReviewsUniversities { get; set; }

        public ICollection<UserSavedReviewProfessor> SavedReviewProfessors { get; set; }

        public ICollection<UserReviewProfessorLike> LikedReviewsProfessors { get; set; }
        public ICollection<UserReviewProfessorDislike> DislikedReviewsProfessors { get; set; }
        public ICollection<UserReviewUniversityLike> LikedReviewsUniversities { get; set; }
        public ICollection<UserReviewUniversityDislike> DislikedReviewsUniversities { get; set; }
    }
}
