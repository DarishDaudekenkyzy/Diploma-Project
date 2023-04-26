using Microsoft.EntityFrameworkCore;
using ReviewAppProject.Data.Models;
using ReviewAppProject.Data.Repository.Interfaces;
using ReviewAppProject.Models;
using ReviewAppProject.Exceptions;
using Microsoft.Identity.Client;

namespace ReviewAppProject.Data.Repository
{
    public class UniversityRepository : IUniversityRepository
    {
        private readonly AppDbContext _context;

        public UniversityRepository(AppDbContext context)
        {
            _context = context;
        }
        public async IAsyncEnumerable<University> GetAllUniversitiesAsync()
        {
            var universities = _context.Universities.OrderBy(u => u.Id)
                .AsAsyncEnumerable();

            await foreach (var university in universities) {
                yield return university;
            }
        }

        public async IAsyncEnumerable<University> GetUniversitiesStartingWithPatternAsync(string searchInput)
        {
            var universities = _context.Universities
                .Where(u => u.Name.StartsWith(searchInput) || u.Acronym.StartsWith(searchInput))
                .OrderBy(u => u.Id)
                .AsAsyncEnumerable();

            await foreach (var university in universities)
            {
                yield return university;
            }
        }

        public async Task<University> GetUniversityByNameAsync(string name) {
            return await _context.Universities
                .Where(u => u.Name.Equals(name))
                .FirstOrDefaultAsync()
                ?? throw new UniversityNotFoundException();
        }

        /*GET BY ID*/
        public async Task<University> GetUniversityByIdAsync(int id)
        {
            return await _context.Universities
                .Where(u => u.Id == id)
                .Include(u => u.Faculties)
                .FirstOrDefaultAsync()
                ?? throw new UniversityNotFoundException();
        }

        public async Task CreateUniversityAsync(UniversityCreateModel model) {
            var university = new University
            {
                Name = model.Name,
                Acronym = model.Acronym,
                Description = model.Description
            };
            await _context.Universities.AddAsync(university);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateUniversityAsync(University uni, UniversityUpdateModel model) {

            if(model.Name != null && !uni.Name.Equals(model.Name))
                uni.Name = model.Name;
            if(model.Description != null && !uni.Description.Equals(model.Description))
                uni.Description = model.Description;
            if (model.Acronym != null && !uni.Acronym.Equals(model.Acronym))
                uni.Acronym = model.Acronym;

            _context.Entry(uni).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task UpdateReviewAddedAsync(University uni) {
            uni.ReviewsCount++;
            uni.Rating = await GetAverageRatingOfUniversity(uni.Id);

            uni.Reputation = await GetAverageReputationOfUniversity(uni.Id);
            uni.Opportunities = await GetAverageOpportunitiesOfUniversity(uni.Id);
            uni.Happiness = await GetAverageHappinessRateOfUniversity(uni.Id);
            uni.Social = await GetAverageSocialRateOfUniversity(uni.Id);
            uni.Safety = await GetAverageSafetyRateOfUniversity(uni.Id);
            uni.Internet = await GetAverageInternetOfUniversity(uni.Id);
            uni.Food = await GetAverageFoodOfUniversity(uni.Id);
            uni.Clubs = await GetAverageClubsRateOfUniversity(uni.Id);
            uni.Facilities = await GetAverageFacilitiesRateOfUniversity(uni.Id);
            uni.Location = await GetAverageLocationRateOfUniversity(uni.Id);

            _context.Entry(uni).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task UpdateReviewDeletedAsync(University uni) {
            var isThereAnyReviews = await _context.ReviewUniversities.Where(ru => ru.UniversityId == uni.Id).AnyAsync();

            if (isThereAnyReviews)
            {
                uni.ReviewsCount--;
                uni.Rating = await GetAverageRatingOfUniversity(uni.Id);
                uni.Reputation = await GetAverageReputationOfUniversity(uni.Id);
                uni.Opportunities = await GetAverageOpportunitiesOfUniversity(uni.Id);
                uni.Happiness = await GetAverageHappinessRateOfUniversity(uni.Id);
                uni.Social = await GetAverageSocialRateOfUniversity(uni.Id);
                uni.Safety = await GetAverageSafetyRateOfUniversity(uni.Id);
                uni.Internet = await GetAverageInternetOfUniversity(uni.Id);
                uni.Food = await GetAverageFoodOfUniversity(uni.Id);
                uni.Clubs = await GetAverageClubsRateOfUniversity(uni.Id);
                uni.Facilities = await GetAverageFacilitiesRateOfUniversity(uni.Id);
                uni.Location = await GetAverageLocationRateOfUniversity(uni.Id);
            }
            else {
                uni.ReviewsCount = 0;
                uni.Rating = 0.0;
                uni.Reputation = 0.0;
                uni.Opportunities = 0.0;
                uni.Happiness = 0.0;
                uni.Social = 0.0;
                uni.Safety = 0.0;
                uni.Internet = 0.0;
                uni.Food = 0.0;
                uni.Clubs = 0.0;
                uni.Facilities = 0.0;
                uni.Location = 0.0;
            }

            _context.Entry(uni).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteUniversityAsync(University uni) {

            _context.Universities.Remove(uni);
            _context.Entry(uni).State = EntityState.Deleted;
            await _context.SaveChangesAsync();
        }

        private async Task<double> GetAverageRatingOfUniversity(int universityId) {
            var averageRating = await _context.ReviewUniversities
                .Where(ru => ru.UniversityId == universityId)
                .Select(ru => ru.Rating)
                .AverageAsync();

            return Math.Round(averageRating, 2);
        }

        private async Task<double> GetAverageReputationOfUniversity(int universityId)
        {
            var averageReputation = await _context.ReviewUniversities
                .Where(ru => ru.UniversityId == universityId)
                .Select(ru => ru.Reputation)
                .AverageAsync();

            return Math.Round(averageReputation, 2);
        }

        private async Task<double> GetAverageOpportunitiesOfUniversity(int universityId)
        {
            var averageOpportunities = await _context.ReviewUniversities
                .Where(ru => ru.UniversityId == universityId)
                .Select(ru => ru.Opportunities)
                .AverageAsync();

            return Math.Round(averageOpportunities, 2);
        }

        private async Task<double> GetAverageInternetOfUniversity(int universityId)
        {
            var averageInternet = await _context.ReviewUniversities
                .Where(ru => ru.UniversityId == universityId)
                .Select(ru => ru.Internet)
                .AverageAsync();

            return Math.Round(averageInternet, 2);
        }

        private async Task<double> GetAverageFoodOfUniversity(int universityId)
        {
            var averageFoodRate = await _context.ReviewUniversities
                .Where(ru => ru.UniversityId == universityId)
                .Select(ru => ru.Food)
                .AverageAsync();

            return Math.Round(averageFoodRate, 2);
        }

        private async Task<double> GetAverageSafetyRateOfUniversity(int universityId)
        {
            var averageSafetyRate = await _context.ReviewUniversities
                .Where(ru => ru.UniversityId == universityId)
                .Select(ru => ru.Safety)
                .AverageAsync();

            return Math.Round(averageSafetyRate, 2);
        }

        private async Task<double> GetAverageHappinessRateOfUniversity(int universityId)
        {
            var averageHappinessRate = await _context.ReviewUniversities
                .Where(ru => ru.UniversityId == universityId)
                .Select(ru => ru.Happiness)
                .AverageAsync();

            return Math.Round(averageHappinessRate, 2);
        }

        private async Task<double> GetAverageSocialRateOfUniversity(int universityId)
        {
            var averageSocialRate = await _context.ReviewUniversities
                .Where(ru => ru.UniversityId == universityId)
                .Select(ru => ru.Social)
                .AverageAsync();

            return Math.Round(averageSocialRate, 2);
        }

        private async Task<double> GetAverageClubsRateOfUniversity(int universityId)
        {
            var averageClubsRate = await _context.ReviewUniversities
                .Where(ru => ru.UniversityId == universityId)
                .Select(ru => ru.Clubs)
                .AverageAsync();

            return Math.Round(averageClubsRate, 2);
        }

        private async Task<double> GetAverageFacilitiesRateOfUniversity(int universityId)
        {
            var averageFacilitiesRate = await _context.ReviewUniversities
                .Where(ru => ru.UniversityId == universityId)
                .Select(ru => ru.Facilities)
                .AverageAsync();

            return Math.Round(averageFacilitiesRate, 2);
        }

        private async Task<double> GetAverageLocationRateOfUniversity(int universityId)
        {
            var averageLocationRate = await _context.ReviewUniversities
                .Where(ru => ru.UniversityId == universityId)
                .Select(ru => ru.Location)
                .AverageAsync();

            return Math.Round(averageLocationRate, 2);
        }
    }
}
