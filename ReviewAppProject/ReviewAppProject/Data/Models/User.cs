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

        public ICollection<ReviewProfessor> Reviews { get; set; }
        public ICollection<UserReviewLike> LikedReviews { get; set; }
        public ICollection<UserReviewDislike> DislikedReviews { get; set; }
    }
}
