using Microsoft.IdentityModel.Tokens;
using ReviewAppProject.Data.Models;

namespace ReviewAppProject.ViewModels
{
    public class UserViewModel
    {
        public int UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public int Year { get; set; }
        public int? FacultyId { get; set; }

        public UserViewModel() { }

        public UserViewModel(User user) {
            UserId = user.Id;
            FirstName = user.FirstName;
            LastName = user.LastName;
            Email = user.Email;
            Year = user.Year;
            FacultyId = user.FacultyId;
        }
    }
}
