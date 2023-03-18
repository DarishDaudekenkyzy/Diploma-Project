using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace ReviewAppProject.Data.Models
{
    public class ReviewProfessor
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public int Rating { get; set; }
        public int Difficulty { get; set; }
        public bool WasAttendanceMandatory { get; set; }
        public bool WouldTakeAgain { get; set; }
        public DateTime CreatedOn{ get; set; }
        public int Likes { get; set; }
        public int Dislikes { get; set; }
        public int CourseId { get; set; }
        public Course Course { get; set; }
        public int UserId { get; set; }
        public User User{ get; set; }
        public int ProfessorId { get; set; }
        public Professor Professor { get; set; }

        public ICollection<LikedUserReview> LikedUsers { get; set; }
        public ICollection<DislikedUserReview> DislikedUsers { get; set; }
    }
}
