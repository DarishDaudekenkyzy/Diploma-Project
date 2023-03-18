using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace ReviewAppProject.Data.Models
{
    public class ReviewProfessor
    {
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }
        [Required]
        public string Content { get; set; }
        
        [Required]
        public int Rating { get; set; }
        [Required]
        public int Difficulty { get; set; }

        [Required]
        public bool WasAttendanceMandatory { get; set; }


        [Required]
        public bool WouldTakeAgain { get; set; }

        [Required]
        public DateTime CreatedOn{ get; set; }

        [Required]
        public int CourseId { get; set; }
        public virtual Course Course { get; set; }

        [Required]
        public int UserId { get; set; }
        public User User{ get; set; }
        [Required]
        public int ProfessorId { get; set; }
        public Professor Professor { get; set; }
    }
}
