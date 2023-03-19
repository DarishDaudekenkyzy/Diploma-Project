using Newtonsoft.Json;

namespace ReviewAppProject.Data.Models.Review
{
    public class ReviewTag
    {
        public int Id { get; set; }
        public string Tag { get; set; }
        public ICollection<ReviewProfessorReviewTag> Reviews { get; set; }
    }
}
