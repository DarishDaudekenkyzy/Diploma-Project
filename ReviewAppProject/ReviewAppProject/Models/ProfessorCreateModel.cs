using ReviewAppProject.Data.Models;
using System.ComponentModel.DataAnnotations;

namespace ReviewAppProject.Models
{
    public class ProfessorCreateModel
    {
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public int FacultyId { get; set; }
        [Required]
        public int UniversityId { get; set; }
    }
}
