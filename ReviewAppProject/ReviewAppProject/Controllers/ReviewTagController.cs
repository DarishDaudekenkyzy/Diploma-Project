using Microsoft.AspNetCore.Mvc;
using ReviewAppProject.Data.Repository.Interfaces;
using ReviewAppProject.ViewModels;

namespace ReviewAppProject.Controllers
{
    [ApiController]
    [Route("Tag")]
    public class ReviewTagController : Controller
    {
        private readonly IReviewTagRepository _reviewTagRepository;

        public ReviewTagController(IReviewTagRepository reviewTagRepository)
        {
            _reviewTagRepository = reviewTagRepository;
        }

        [HttpGet("All")]
        public async IAsyncEnumerable<ReviewTagViewModel> GetAllReviewTags()
        {
            var tags = _reviewTagRepository.GetAllReviewTags();

            await foreach (var tag in tags) {
                yield return new ReviewTagViewModel(tag);
            }
        }
    }
}
