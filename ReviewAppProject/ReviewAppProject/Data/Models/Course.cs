using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReviewAppProject.Data.Models
{

    public class Course
    {
        public int Id { get; set; }
        public string CourseCode { get; set; }
        public string CourseName { get; set; }
        public string? CourseDescription { get; set; }

        public int FacultyId { get; set; }
        public Faculty Faculty { get; set; }

        public ICollection<CourseProfessor> Professors { get; set; }
        public ICollection<ReviewProfessor> Reviews { get; set; }
    }
}
