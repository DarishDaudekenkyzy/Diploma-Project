using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReviewAppProject.Data.Models
{
    public class CourseProfessor
    {
        public int ProfessorId { get; set; }

        public int CourseId { get; set; }
        public Professor Professor { get; set; } = null!;
        public Course Course { get; set; } = null!;
    }
}
