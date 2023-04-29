namespace ReviewAppProject.Data.Models
{
    public class ReviewProfessor
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string? Content { get; set; }
        public int Rating { get; set; }
        public int Difficulty { get; set; }
        public bool WasAttendanceMandatory { get; set; }
        public bool WouldTakeAgain { get; set; }
        public DateTime CreatedOn { get; set; }
        public int Likes { get; set; }
        public int Dislikes { get; set; }
        public int CourseId { get; set; }
        public int Saves { get; set; }
        public int ProfessorId { get; set; }
        public int UserId { get; set; }
        public Course Course { get; set; }
        public Professor Professor { get; set; }
        public User User { get; set; }
        
        public ICollection<ReviewProfessorReviewTag> Tags { get; set; }
        public ICollection<UserReviewProfessorLike> LikedUsers { get; set; }
        public ICollection<UserReviewProfessorDislike> DislikedUsers { get; set; }
        public ICollection<UserSavedReviewProfessor> SavedUsers { get; set; }
    }
}
