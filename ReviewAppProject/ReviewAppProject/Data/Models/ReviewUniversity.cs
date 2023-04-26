namespace ReviewAppProject.Data.Models
{
    public class ReviewUniversity
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int UniversityId { get; set; }
        public string Review { get; set; }
        public double Rating { get; set; }
        
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

        public DateTime CreatedOn { get; set; }
        public int Likes { get; set; }
        public int Dislikes { get; set; }
        
        public University University { get; set; }
        public User User { get; set; }

        public ICollection<UserReviewUniversityLike> LikedUsers { get; set; }
        public ICollection<UserReviewUniversityDislike> DislikedUsers { get; set; }
    }
}
