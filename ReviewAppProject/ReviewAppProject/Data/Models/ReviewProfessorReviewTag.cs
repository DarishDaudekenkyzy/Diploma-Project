namespace ReviewAppProject.Data.Models
{
    public class ReviewProfessorReviewTag
    {
        public int ReviewId { get; set; }
        public ReviewProfessor ReviewProfessor { get; set; }

        public int TagId { get; set; }
        public ReviewProfessorTag Tag { get; set; }
    }
}
