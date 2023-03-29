using Microsoft.AspNetCore.Mvc;
using ReviewAppProject.Services;
using ReviewAppProject.ViewModels;

namespace ReviewAppProject.Controllers
{
    [ApiController]
    [Route("University")]
    public class UniversityController : Controller
    {
        private readonly UniversityService _service;

        public UniversityController(UniversityService service)
        {
            _service = service;
        }

        [HttpGet("All")]
        public async IAsyncEnumerable<UniversityViewModel> GetAllUniversities() { 
            var universities = _service.GetAllUniversitiesAsync();

            await foreach (var university in universities) {
                yield return new UniversityViewModel(university);
            }
        }

        [HttpGet("Search/{searchInput}")]
        public async IAsyncEnumerable<UniversityViewModel> GetUniversitiesStartingWithPattern(string searchInput)
        {
            var universities = _service.GetUniversitiesStartingWithPatternAsync(searchInput);

            await foreach (var university in universities)
            {
                yield return new UniversityViewModel(university);
            }
        }
    }
}
