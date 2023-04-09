namespace ReviewAppProject.Data.Models
{
    public class UserReviewDislike
    {
        public int UserId { get; set; }
        public User User { get; set; }

        public int ReviewId { get; set; }
        public ReviewProfessor Review { get; set; }
    }
}
