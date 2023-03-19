using ReviewAppProject.Data.Models.Review;

namespace ReviewAppProject.ViewModels
{
    public class ReviewTagViewModel
    {
        public int TagId { get; set; }
        public string Tag { get; set; }

        public ReviewTagViewModel() { }
        public ReviewTagViewModel(ReviewTag tag) { 
            TagId= tag.Id;
            Tag = tag.Tag;
        }
    }
}
