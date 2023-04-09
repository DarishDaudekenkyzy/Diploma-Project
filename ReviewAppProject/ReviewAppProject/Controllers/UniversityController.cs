using Microsoft.AspNetCore.Mvc;
using ReviewAppProject.Data.Models;
using ReviewAppProject.Exceptions;
using ReviewAppProject.Models;
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


        [HttpGet("{id}")]
        public async Task<IActionResult> GetUniversityByIdAsync(int id)
        {
            (University? uni, Exception? e) = await _service.GetUniversityByIdAsync(id);

            if (uni != null && e == null)
            {
                return Ok(new UniversityViewModel(uni));
            }

            if (e is UniversityNotFoundException) return BadRequest("University Not Found");
            else return StatusCode(500, e.StackTrace);
        }

        [HttpPost("Create")]
        public async Task<IActionResult> CreateUniversityAsync(UniversityCreateModel model) {

            if (!ModelState.IsValid) { 
                return BadRequest(ModelState);
            }

            (bool created, Exception? e) = await _service.CreateUniversityAsync(model);

            if (created && e is null) {
                return Ok();
            }

            if (e is UniversityExistsException) return BadRequest("University already exists");
            else return StatusCode(500, e.StackTrace);
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUniversityAsync(int id, UniversityUpdateModel model) {
            (bool updated, Exception? e) = await _service.UpdateUniversityAsync(id, model);

            if (updated && e is null) {
                return Ok();
            }

            if (e is UniversityNotFoundException) return BadRequest("University Not Found");
            else return StatusCode(500, e.StackTrace);

        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUniversityAsync(int id) {
            (bool deleted, Exception? e) = await _service.DeleteUniversityAsync(id);

            if (deleted && e is null) {
                return Ok();
            }

            if (e is UniversityNotFoundException) return BadRequest("University Not Found");
            else return StatusCode(500, e.StackTrace);
        }
    }
}
