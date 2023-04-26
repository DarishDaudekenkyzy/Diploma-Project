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
        public double Rating { get; set; }

        public double Reputation { get; set; }
        public double Opportunities { get; set; }
        public double Location { get; set; }
        public double Happiness { get; set; }
        public double Social { get; set; }
        public double Food { get; set; }
        public double Internet { get; set; }
        public double Facilities { get; set; }
        public double Clubs { get; set; }
        public double Safety { get; set; }

        public UniversityViewModel(University uni) { 
            Id = uni.Id;
            Name = uni.Name;
            Rating = uni.Rating;
            
            Reputation= uni.Reputation;
            Opportunities = uni.Opportunities;
            Location = uni.Location;
            Happiness = uni.Happiness;
            Food = uni.Food;
            Internet = uni.Internet;
            Facilities = uni.Facilities;
            Clubs = uni.Clubs;
            Safety = uni.Safety;
            Social = uni.Social;
            

            if(uni.Description != null)
                Description = uni.Description;
            if(uni.Acronym != null)
                Acronym = uni.Acronym;
        }
    }
}
