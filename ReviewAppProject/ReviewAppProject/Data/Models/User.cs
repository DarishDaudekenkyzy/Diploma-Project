using ReviewAppProject.Data.Models.Review;

namespace ReviewAppProject.Data.Models
{
    public class User
    {
        public int UserId { get; set; } = 0;

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public int Year { get; set; }

        public int UniversityId { get; set; }
        public University University { get; set; }
        public int FacultyId { get; set; }
        public Faculty Faculty { get; set; }
        public virtual ICollection<ReviewProfessor>? ReviewProfessors{ get; set; }
        public virtual ICollection<LikedUserReview>? LikedReviews { get; set; }
        public virtual ICollection<DislikedUserReview>? DislikedReviews { get; set; }
    }
}
