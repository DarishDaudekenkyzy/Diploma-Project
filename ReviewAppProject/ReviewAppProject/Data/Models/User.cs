namespace ReviewAppProject.Data.Models
{
    public class User
    {
        public int UserId { get; set; } = 0;

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }
    }
}
