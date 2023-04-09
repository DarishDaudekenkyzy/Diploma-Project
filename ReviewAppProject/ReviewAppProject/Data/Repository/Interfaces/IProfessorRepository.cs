using ReviewAppProject.Data.Models;
using ReviewAppProject.Models;

namespace ReviewAppProject.Data.Repository.Interfaces
{
    public interface IProfessorRepository
    {
        public IAsyncEnumerable<Professor> GetAllProfessorsAsync();
        public IAsyncEnumerable<Professor> GetProfessorsInFacultyAsync(int facultyId);
        public IAsyncEnumerable<Professor> GetProfessorsWithPatternAsync(string pattern);
        public IAsyncEnumerable<Professor> GetProfessorsInUniversityWithPatternAsync(int universityId, string pattern);
        public IAsyncEnumerable<Professor> GetProfessorsInFacultyWithPatternAsync(int facultyId, string pattern);
        public IAsyncEnumerable<Professor> GetProfessorsInCourse(int courseId);
        public Task<Professor> GetProfessorByIdAsync(int id);
        public Task<Professor> GetProfessorByEmailAsync(string email);
        public Task CreateProfessorAsync(ProfessorCreateModel model);
        public Task UpdateProfessorAsync(Professor professor, ProfessorCreateModel model);

        public Task UpdateReviewAdded(Professor professor);
        public Task UpdateReviewDeleted(Professor professor);
        public Task DeleteProfessorAsync(Professor professor);
    }
}
