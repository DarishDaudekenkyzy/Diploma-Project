using ReviewAppProject.Data.Models;

namespace ReviewAppProject.ViewModels
{   
    public class ReviewTagViewModel
    {
        public int TagId { get; set; }
        public string Tag { get; set; }

        public ReviewTagViewModel() { }
        public ReviewTagViewModel(ReviewProfessorTag tag) { 
            TagId= tag.Id;
            Tag = tag.Tag;
        }
    }
}
