namespace ReviewAppProject.Data.Models
{
    public class ReviewPost
    {
        public Guid ReviewPostId { get; set; }

        public string ReviewTitle { get; set; }

        public string ReviewContent { get; set; }

        public Guid UserId   { get; set; }
        public User User { get; set; }
    }
}
