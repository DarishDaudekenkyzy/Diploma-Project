namespace ReviewAppProject.Data.Models
{
    public class UserReviewProfessorLike
    {
        public int UserId { get; set; }
        public User User { get; set; }

        public int ReviewId { get; set; }
        public ReviewProfessor Review { get; set; }
    }
}
