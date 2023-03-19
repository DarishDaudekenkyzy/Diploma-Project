namespace ReviewAppProject.Data.Models.Review
{
    public class DislikedUserReview
    {
        public int UserId { get; set; }
        public User User { get; set; }

        public int ReviewId { get; set; }
        public ReviewProfessor ReviewProfessor { get; set; }
    }
}
