using ReviewAppProject.Data.Models;

namespace ReviewAppProject.Models
{
    public class ReviewUniversityCreateModel
    {
        public int UserId { get; set; }
        public int UniversityId { get; set; }
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
    }
}
