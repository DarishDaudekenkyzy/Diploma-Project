using ReviewAppProject.Data.Models;

namespace ReviewAppProject.ViewModels
{
    public class UniversityViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string? Acronym { get; set; }
        public string? Description { get; set; }

        public UniversityViewModel(University uni) { 
            Id = uni.Id;
            Name = uni.Name;
            if(uni.Description != null)
                Description = uni.Description;
            if(uni.Acronym != null)
                Acronym = uni.Acronym;
        }
    }
}
