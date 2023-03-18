using System.ComponentModel.DataAnnotations;

namespace ReviewAppProject.Models
{
    public class ReviewProfessorLikeDislikeModel
    {
        [Required]
        public int UserId { get; set; }
        [Required]
        public int ReviewId { get; set; }
        [Required]
        public bool Like { get; set; }
    }
}
