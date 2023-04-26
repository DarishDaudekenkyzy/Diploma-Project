namespace ReviewAppProject.Data.Models
{
    public class University
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string? Acronym { get; set; }
        public string? Description { get; set; }
        public double Rating { get; set; }
        public int ReviewsCount { get; set; }

        public double Reputation { get; set; }
        public double Location { get; set; }
        public double Opportunities { get; set; }
        public double Facilities { get; set; }
        public double Internet { get; set; }
        public double Food { get; set; }
        public double Clubs { get; set; }
        public double Social { get; set; }
        public double Happiness { get; set; }
        public double Safety { get; set; }

        public ICollection<Faculty> Faculties { get; set; }
        public ICollection<ReviewUniversity> Reviews { get; set; }
    }
}
