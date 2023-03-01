using ReviewAppProject.Data.Models;

namespace ReviewAppProject.Models
{
    public class ProfessorCreateModel
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }

        public int FacultyId { get; set; }
    }
}
