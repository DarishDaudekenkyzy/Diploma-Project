using ReviewAppProject.Data.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel;

namespace ReviewAppProject.Models
{
    public class ReviewProfessorCreateModel
    {
        
        [Required]
        public int CourseId { get; set; }

        [Required]
        public string Title { get; set; }
        [Required]
        public string Content { get; set; }
        [Required]
        public int Rating { get; set; }
        [Required]
        public int Difficulty { get; set; }

        [Required]
        public bool WouldTakeAgain { get; set; }
        
        [Required]
        public bool WasAttendanceMandatory { get; set; }

        [Required]
        public int UserId { get; set; }
        [Required]
        public int ProfessorId { get; set; }

        public ICollection<ReviewTagModel> tags{ get; set; }

    }
}
