using ReviewAppProject.Data.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel;

namespace ReviewAppProject.Views
{
    public class ReviewProfessorView
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public int Rating { get; set; }
        public int Difficulty { get; set; }
        public bool WouldTakeAgain { get; set; }
        public bool WasAttendanceMandatory { get; set; }
        public int Likes { get; set; }
        public int Dislikes { get; set; }
        public string CreatedOn { get; set; }
        public int CourseId { get; set; }
        public string CourseCode { get; set; }
        public int ProfessorId { get; set; }
        public int UserId { get; set; }
        public string UserName { get; set; }
    }
}
