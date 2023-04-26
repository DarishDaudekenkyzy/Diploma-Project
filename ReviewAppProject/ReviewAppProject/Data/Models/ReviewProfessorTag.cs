namespace ReviewAppProject.Data.Models
{
    public class ReviewProfessorTag
    {
        public int Id { get; set; }
        public string Tag { get; set; }
        public ICollection<ReviewProfessorReviewTag> Reviews { get; set; }
    }
}
