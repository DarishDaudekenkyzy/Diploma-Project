using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using ReviewAppProject.Data.Models.Review;
using ReviewAppProject.Data.Repository.Interfaces;
using ReviewAppProject.Exceptions;
using ReviewAppProject.Models;
using ReviewAppProject.ViewModels;
using Serilog;

namespace ReviewAppProject.Services
{
    public class ReviewProfessorService
    {
        private readonly IReviewProfessorRepository _repository;
        private readonly IReviewTagRepository _tagRepo;

        public ReviewProfessorService(
            IReviewProfessorRepository repository, IReviewTagRepository tagRepo)
        {
            _repository = repository;
            _tagRepo = tagRepo;
        }

        public async IAsyncEnumerable<ReviewProfessor> GetAllReviewsAsync()
        {
            var reviews = _repository.GetAllReviewsAsync();

            await foreach (var r in reviews)
            {
                yield return r;
            }
        }

        public async IAsyncEnumerable<ReviewProfessorViewModel> GetReviewsOfProfessorAsync(int professorId)
        {
            var reviews = await _repository.GetAllReviewsOfProfessorAsync(professorId).ToListAsync();

            foreach (var r in reviews)
            {
                var rpView = new ReviewProfessorViewModel(r);
                if (!r.Tags.IsNullOrEmpty())
                {
                    rpView.Tags = new List<ReviewTagViewModel>();
                    foreach (var tag in r.Tags)
                    {
                        rpView.Tags.Add(new ReviewTagViewModel(await _tagRepo.GetTagByIdAsync(tag.TagId)));
                    }
                }
                yield return rpView;
            }
        }

        public async IAsyncEnumerable<ReviewProfessor> GetReviewsOfUserAsync(int userId)
        {
            var reviews = _repository.GetAllReviewsOfUserAsync(userId);

            await foreach (var r in reviews)
            {
                yield return r;
            }
        }

        public async Task<(ReviewProfessor?, Exception?)> GetReviewByIdAsync(int id)
        {
            try
            {
                var review = await _repository.GetReviewByIdAsync(id);
                return (review, null);
            }

            catch (ReviewNotFoundException e) { return (null, e); }
        }

        public async Task<(ReviewProfessor?, Exception?)> CreateReviewProfessorAsync(ReviewProfessorCreateModel rpModel)
        {
            try
            {
                bool result = await _repository.CreateReviewProfessorAsync(rpModel);

                var review = await _repository.GetReviewByUserAndProfessorAndCourseAsync(rpModel.UserId, rpModel.ProfessorId, rpModel.CourseId);
                return (review, null);
            }
            catch (ArgumentException e) { return (null, e); }
            catch (ReviewProfessorByUserExistsException e) { return (null, e); }
            catch (Exception e) { return (null, e); }
        }

        public async Task<(bool, Exception?)> LikeDislikeReview(ReviewProfessorLikeDislikeModel model) {
            try
            {
                if (model.Like)
                {
                    await _repository.LikeReview(model.ReviewId, model.UserId);
                }
                else {
                    await _repository.DislikeReview(model.ReviewId, model.UserId);
                }
                return (true, null);
            }
            catch (AlreadyDislikedException e) { return (false, e); }
            catch (AlreadyLikedException e) { return (false, e); }
            catch (UserNotFoundException e) { return (false, e); }
            catch (ReviewNotFoundException e) { return (false, e); }
            catch (Exception e) {return (false, e); }
        }

        public async Task<int> GetLikes(int reviewId) { 
            return await _repository.GetLikesAsync(reviewId);
        }

        public async Task<int> GetDislikes(int reviewId)
        {
            return await _repository.GetDislikesAsync(reviewId);
        }
    }
}
