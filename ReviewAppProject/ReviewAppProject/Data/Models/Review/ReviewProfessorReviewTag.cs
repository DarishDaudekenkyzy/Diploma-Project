namespace ReviewAppProject.Data.Models.Review
{
    public class ReviewProfessorReviewTag
    {
        public int ReviewId { get; set; }
        public ReviewProfessor ReviewProfessor{ get; set; }

        public int TagId { get; set; }
        public ReviewTag Tag { get; set; }
    }
}
