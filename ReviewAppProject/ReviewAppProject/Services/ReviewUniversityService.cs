using ReviewAppProject.Data.Models;
using ReviewAppProject.Data.Repository.Interfaces;
using ReviewAppProject.Exceptions;
using ReviewAppProject.Models;

namespace ReviewAppProject.Services
{
    public class ReviewUniversityService
    {
        private readonly IReviewUniversityRepository _repository;
        private readonly IUniversityRepository _universityRepository;
        private readonly IUserRepository _userRepository;

        public ReviewUniversityService(
            IReviewUniversityRepository repository,
            IUniversityRepository universityRepository,
            IUserRepository userRepository) { 
            _repository = repository;
            _universityRepository = universityRepository;
            _userRepository = userRepository;
        }

        public async IAsyncEnumerable<ReviewUniversity> GetAllReviewsAsync() {
            var reviews = _repository.GetAllReviewsAsync();

            await foreach (var review in reviews) {
                yield return review;
            }
        }

        public async IAsyncEnumerable<ReviewUniversity> GetAllReviewsOfUniversityAsync(int universityId) {
            var reviews = _repository.GetAllReviewsOfUniversityAsync(universityId);

            await foreach (var review in reviews)
            {
                yield return review;
            }
        }

        public async IAsyncEnumerable<ReviewUniversity> GetAllUniversityReviewsOfUser(int userId) {
            var reviews = _repository.GetAllUniversityReviewsOfUser(userId);

            await foreach (var review in reviews)
            {
                yield return review;
            }
        }

        public async Task<(ReviewUniversity?, Exception?)> GetUniversityReviewById(int id) {
            try
            {
                var review = await _repository.GetUniversityReviewById(id);

                return (review, null);
            }
            catch (ReviewNotFoundException e) { return (null, e); }
            catch (Exception e) { return (null, e); };
        }

        public async Task<(bool, Exception?)> CreateUniversityReviewAsync(ReviewUniversityCreateModel model) {
            try
            {
                if (!await _repository.IsReviewByUserExists(model.UserId, model.UniversityId))
                {
                    await _repository.CreateUniversityReviewAsync(model);

                    var university = await _universityRepository.GetUniversityByIdAsync(model.UniversityId);
                    await _universityRepository.UpdateReviewAddedAsync(university);
                    return (true, null);
                }
                else throw new ReviewUniversityByUserExistsException();
            }
            catch (UniversityNotFoundException e) { return (false, e); }
            catch (ReviewUniversityByUserExistsException e) { return (false, e); }
            catch (Exception e) { return (false, e); }
        }

        public async Task<(bool, Exception?)> DeleteReviewAsync(int reviewId) {
            try { 
                var review = await _repository.GetUniversityReviewById(reviewId);
                var uni = await _universityRepository.GetUniversityByIdAsync(review.UniversityId);

                await _repository.DeleteReviewAsync(review);
                await _universityRepository.UpdateReviewDeletedAsync(uni);

                return (true, null);
            }
            catch(ReviewNotFoundException e) {return (false, e); }
            catch(Exception e) { return (false, e); }
        }

        public async Task<(bool, Exception?)> LikeReviewAsync(int reviewId, int userId) {
            try {
                var review = await _repository.GetUniversityReviewById(reviewId);
                var user = await _userRepository.GetUserByIdAsync(userId);

                if (await _repository.DidUserLikedReview(reviewId, userId))
                {
                    await _repository.RemoveLikeAsync(review, user);
                }
                else { 
                    await _repository.LikeReviewAsync(review, user);
                    if(await _repository.DidUserDislikedReview(reviewId, userId)) 
                        await _repository.RemoveDislikeAsync(review, user);
                }
                return (true, null);
            }
            catch(UserNotFoundException e) { return (false, e); }
            catch(AlreadyLikedException e) { return (false, e); }
            catch(ReviewNotFoundException e) { return (false, e);}
            catch(Exception e) { return (false, e); };
        }

        public async Task<(bool, Exception?)> DislikeReviewAsync(int reviewId, int userId) {
            try
            {
                var review = await _repository.GetUniversityReviewById(reviewId);
                var user = await _userRepository.GetUserByIdAsync(userId);

                if (await _repository.DidUserDislikedReview(reviewId, userId))
                {
                    await _repository.RemoveDislikeAsync(review, user);
                }
                else
                {
                    await _repository.DislikeReviewAsync(review, user);
                    if (await _repository.DidUserLikedReview(reviewId, userId))
                        await _repository.RemoveLikeAsync(review, user);
                }
                return (true, null);
            }
            catch (UserNotFoundException e) { return (false, e); }
            catch (AlreadyDislikedException e) { return (false, e); }
            catch (ReviewNotFoundException e) { return (false, e); }
            catch (Exception e) { return (false, e); };
        }
    }
}
