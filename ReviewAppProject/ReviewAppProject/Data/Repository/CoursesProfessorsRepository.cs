using ReviewAppProject.Data.Repository.Interfaces;

namespace ReviewAppProject.Data.Repository
{
    public class CoursesProfessorsRepository : ICoursesProfessorsRepository
    {
        private readonly AppDbContext _context;

        public CoursesProfessorsRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task DeleteAllCourseProfessorsWithProfessorId(int professorId)
        {
            var coursesProfessors = _context.CoursesProfessors.Where(cp => cp.ProfessorId == professorId);
            _context.CoursesProfessors.RemoveRange(coursesProfessors);
            await _context.SaveChangesAsync();
        }
    }
}
