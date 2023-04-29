using ReviewAppProject.Data.Models;
using ReviewAppProject.ViewModels;
using Microsoft.IdentityModel.Tokens;

namespace ReviewAppProject.ViewModels
{
    public class ReviewProfessorViewModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public int Rating { get; set; }
        public int Difficulty { get; set; }
        public bool WouldTakeAgain { get; set; }
        public bool WasAttendanceMandatory { get; set; }
        public int Likes { get; set; }
        public int Dislikes { get; set; }
        public int Saves { get; set; }
        public string CreatedOn { get; set; }

        public CourseViewModel? Course { get; set; }
        public ProfessorViewModel? Professor { get; set; }
        public UserViewModel? User { get; set; }
        public ICollection<ReviewTagViewModel>? Tags { get; set; }

        public ReviewProfessorViewModel() { }
        public ReviewProfessorViewModel(ReviewProfessor rp) { 
            Id = rp.Id;
            Title = rp.Title;
            Content = rp.Content;
            Rating = rp.Rating;
            Difficulty = rp.Difficulty;
            WouldTakeAgain= rp.WouldTakeAgain;
            WasAttendanceMandatory= rp.WasAttendanceMandatory;
            Likes= rp.Likes;
            Dislikes= rp.Dislikes;
            Saves= rp.Saves;
            CreatedOn = rp.CreatedOn.ToString("MMMM dd, yyyy");

            if (rp.Professor != null)
                Professor = new ProfessorViewModel(rp.Professor);
            if (rp.User != null)
                User = new UserViewModel(rp.User);
            if (rp.Course != null)
                Course = new CourseViewModel(rp.Course);
            if (!rp.Tags.IsNullOrEmpty()) {
                Tags = new List<ReviewTagViewModel>();
                foreach (var tag in rp.Tags)
                {
                    Tags.Add(new ReviewTagViewModel(tag.Tag));
                }
            }
        }
    }
}
