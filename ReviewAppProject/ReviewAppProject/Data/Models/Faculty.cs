namespace ReviewAppProject.Data.Models
{
    public class Faculty
    {
        public int FacultyId { get; set; }

        public string FacultyName { get; set; }

        public virtual ICollection<Professor> Professors { get; set; }
        public virtual ICollection<Course> Courses{ get; set; }
    }
}
