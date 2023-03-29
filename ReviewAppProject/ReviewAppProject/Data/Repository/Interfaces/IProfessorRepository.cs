using ReviewAppProject.Data.Models;
using ReviewAppProject.Models;

namespace ReviewAppProject.Data.Repository.Interfaces
{
    public interface IProfessorRepository
    {
        public IAsyncEnumerable<Professor> GetAllProfessorsAsync();
        public IAsyncEnumerable<Professor> GetProfessorsWithPatternAsync(string pattern);
        public IAsyncEnumerable<Professor> GetProfessorsInUniversityWithPatternAsync(int universityId, string pattern);
        public Task<Professor> GetProfessorByIdAsync(int id);
        public Task<Professor> GetProfessorByEmailAsync(string email);
        public Task<Professor> GetProfessorByIdWithReviews(int professorId);
        public Task<bool> CreateProfessorAsync(ProfessorCreateModel model);

        public Task Update(Professor professor);
    }
}
