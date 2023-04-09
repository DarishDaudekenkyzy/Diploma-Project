namespace ReviewAppProject.Data.Models
{
    public class University
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string? Acronym { get; set; }
        public string? Description { get; set; }

        public ICollection<Faculty> Faculties { get; set; }
    }
}
