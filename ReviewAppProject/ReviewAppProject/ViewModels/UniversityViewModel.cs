using Microsoft.IdentityModel.Tokens;
using ReviewAppProject.Data.Models;

namespace ReviewAppProject.ViewModels
{
    public class UniversityViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string? Acronym { get; set; }
        public string? Description { get; set; }

        public ICollection<FacultyViewModel>? Faculties { get; set; }
        public ICollection<ProfessorViewModel>? Professors { get; set; }

        public UniversityViewModel(University uni) { 
            Id = uni.Id;
            Name = uni.Name;
            if(uni.Description != null)
                Description = uni.Description;
            if(uni.Acronym != null)
                Acronym = uni.Acronym;
            if (!uni.Faculties.IsNullOrEmpty()) {
                Faculties = new List<FacultyViewModel>();
                foreach (var faculty in uni.Faculties) {
                    Faculties.Add(new FacultyViewModel(faculty));
                }
            }
            
            if (!uni.Professors.IsNullOrEmpty())
            {
                Professors = new List<ProfessorViewModel>();
                foreach (var professor in uni.Professors)
                {
                    Professors.Add(new ProfessorViewModel(professor));
                }
            }
        }
    }
}
