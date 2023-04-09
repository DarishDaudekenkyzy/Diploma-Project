namespace ReviewAppProject.Data.Repository.Interfaces
{
    public interface ICoursesProfessorsRepository
    {
        public Task DeleteAllCourseProfessorsWithProfessorId(int professorId);
    }
}
