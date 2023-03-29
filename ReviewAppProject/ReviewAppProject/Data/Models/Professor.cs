using Azure.Core.Pipeline;
using Newtonsoft.Json;
using ReviewAppProject.Data.Models.Review;
using System.ComponentModel.DataAnnotations;

namespace ReviewAppProject.Data.Models
{
    public class Professor
    {
        public int ProfessorId { get; set; }

        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public string Email { get; set; }

        public double WouldTakeAgainPercentage { get; set; }
        public double DifficultyPercentage { get; set; }

        public double Rating {get; set; }

        public int ReviewsCount { get; set; }
        public int UniversityId { get; set; }
        public University University { get; set; }
        [Required]
        public int FacultyId { get; set; }
        public Faculty Faculty { get; set; }

        public virtual ICollection<CourseProfessor> Courses{ get; set; }
        public virtual ICollection<ReviewProfessor> Reviews{ get; set; }

    }
}
