using ReviewAppProject.Data.Models;
using ReviewAppProject.Models;

namespace ReviewAppProject.Data.Repository
{
    public interface IProfessorRepository
    {
        public IAsyncEnumerable<Professor> GetAllProfessorsAsync();
        public IAsyncEnumerable<Professor> GetProfessorsWithPatternAsync(string pattern);
        public Task<Professor> GetProfessorByIdAsync(int id);
        public Task<Professor> GetProfessorByEmailAsync(string email);
        public Task<bool> CreateProfessorAsync(ProfessorCreateModel model);

        public Task Update(Professor professor);
    }
}
