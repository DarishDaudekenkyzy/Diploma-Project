namespace ReviewAppProject.Data.Models
{
    public class UserReviewUniversityDislike
    {
        public int UserId { get; set; }
        public User User { get; set; }

        public int ReviewId { get; set; }
        public ReviewUniversity Review { get; set; }
    }
}
