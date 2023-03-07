using System.ComponentModel.DataAnnotations;

namespace ReviewAppProject.Models
{
    public class UserSignInModel
    {
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
