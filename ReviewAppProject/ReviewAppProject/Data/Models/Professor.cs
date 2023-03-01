namespace ReviewAppProject.Data.Models
{
    public class Professor
    {
        public Guid ProfessorId { get; set; }

        public string FirstName { get; set; }
        public string LastName { get; set; }

        public string Email { get; set; }

        public int FacultyId { get; set; }
        public Faculty Faculty { get; set; }

    }
}
