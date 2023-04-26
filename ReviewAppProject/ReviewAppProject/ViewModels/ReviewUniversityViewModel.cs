using ReviewAppProject.Data.Models;

namespace ReviewAppProject.ViewModels
{
    public class ReviewUniversityViewModel
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int UniversityId { get; set; }
        public double Rating { get; set; }
        public string Review { get; set; }

        public int Reputation { get; set; }
        public int Location { get; set; }
        public int Opportunities { get; set; }
        public int Facilities { get; set; }
        public int Internet { get; set; }
        public int Food { get; set; }
        public int Clubs { get; set; }
        public int Social { get; set; }
        public int Happiness { get; set; }
        public int Safety { get; set; }
        public int Likes { get; set; }
        public int Dislikes { get; set; }

        public string CreatedOn { get; set; }

        public UserViewModel? User { get; set; }
        public UniversityViewModel? University{ get; set; }

        public ReviewUniversityViewModel(ReviewUniversity ru) { 
            Id = ru.Id;
            UserId = ru.UserId;
            UniversityId = ru.UniversityId;

            Review = ru.Review;
            Rating = ru.Rating;

            Reputation = ru.Reputation;
            Location = ru.Location;
            Opportunities = ru.Opportunities;
            Facilities = ru.Facilities;
            Internet = ru.Internet;
            Food = ru.Food;
            Clubs = ru.Clubs;
            Social = ru.Social;
            Happiness = ru.Happiness;
            Safety = ru.Safety;
            Likes = ru.Likes;
            Dislikes = ru.Dislikes;
            CreatedOn = ru.CreatedOn.ToString("MMMM dd, yyyy");

            if(ru.User != null)
                User = new UserViewModel(ru.User);
            if (ru.University != null)
                University = new UniversityViewModel(ru.University);

        }


    }
}
