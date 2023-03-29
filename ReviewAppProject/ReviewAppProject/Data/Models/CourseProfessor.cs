namespace ReviewAppProject.Data.Models
{
    public class CourseProfessor
    {
        public int ProfessorId { get; set; }
        public Professor Professor{ get; set; }

        public int CourseId { get; set; }
        public Course Course{ get; set; }
    }
}
