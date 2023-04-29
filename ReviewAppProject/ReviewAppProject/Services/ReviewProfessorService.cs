using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using ReviewAppProject.Data.Models;
using ReviewAppProject.Data.Repository.Interfaces;
using ReviewAppProject.Exceptions;
using ReviewAppProject.Models;

namespace ReviewAppProject.Services
{
    public class ReviewProfessorService
    {
        private readonly IReviewProfessorRepository _repository;
        private readonly IProfessorRepository _professorRepository;
        private readonly IUserRepository _userRepository;

        public ReviewProfessorService(
            IReviewProfessorRepository repository, 
            IUserRepository userRepository,
            IProfessorRepository professorRepository)
        {
            _repository = repository;
            _userRepository = userRepository;
            _professorRepository= professorRepository;
        }

        public async IAsyncEnumerable<ReviewProfessor> GetAllReviewsAsync()
        {
            var reviews = _repository.GetAllReviewsAsync();

            await foreach (var r in reviews)
            {
                yield return r;
            }
        }

        public async IAsyncEnumerable<ReviewProfessor> GetReviewsOfProfessorAsync(int professorId)
        {
            var reviews = _repository.GetAllReviewsOfProfessorAsync(professorId);

            await foreach (var r in reviews)
            {
                yield return r;
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

        public async IAsyncEnumerable<ReviewProfessor> GetReviewsOfCourseAsync(int courseId)
        {
            var reviews = _repository.GetAllReviewsOfCourseAsync(courseId);

            await foreach (var r in reviews)
            {
                yield return r;
            }
        }

        public async IAsyncEnumerable<ReviewProfessor> GetSavedReviewsOfUser(int userId)
        {
            var reviews = _repository.GetSavedReviewsOfUser(userId);

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

        public async Task<(bool, Exception?)> LikeReviewAsync(int reviewId, int userId) {
            try
            {
                var review = await _repository.GetReviewByIdAsync(reviewId);
                var user = await _userRepository.GetUserByIdAsync(userId);

                if (await _repository.DidUserLikedReview(reviewId, userId))
                {
                    await _repository.RemoveLikeAsync(review, user);
                }
                else {
                    await _repository.LikeReviewAsync(review, user);
                    if (await _repository.DidUserDislikedReview(reviewId, userId))
                        await _repository.RemoveDisikeAsync(review, user);
                };
                return (true, null);
            }
            catch (AlreadyLikedException e) { return (false, e); }
            catch (UserNotFoundException e) { return (false, e); }
            catch (ReviewNotFoundException e) { return (false, e); }
            catch (Exception e) {return (false, e); }
        }

        public async Task<(bool, Exception?)> DislikeReviewAsync(int reviewId, int userId)
        {
            try
            {
                var review = await _repository.GetReviewByIdAsync(reviewId);
                var user = await _userRepository.GetUserByIdAsync(userId);

                if (await _repository.DidUserDislikedReview(reviewId, userId))
                {
                    await _repository.RemoveDisikeAsync(review, user);

                } else {
                    await _repository.DislikeReviewAsync(review, user);
                    if (await _repository.DidUserLikedReview(reviewId, userId))
                        await _repository.RemoveLikeAsync(review, user);
                }
                return (true, null);
            }
            catch (UserNotFoundException e) { return (false, e); }
            catch (ReviewNotFoundException e) { return (false, e); }
            catch (Exception e) { return (false, e); }
        }

        public async Task<(bool, Exception?)> CreateReviewProfessorAsync(ReviewProfessorCreateModel rpModel)
        {
            try
            {
                if (!await _repository.IsReviewByUserExists(rpModel.UserId, rpModel.CourseId, rpModel.ProfessorId))
                {
                    await _repository.CreateReviewAsync(rpModel);

                    var professor = await _professorRepository.GetProfessorByIdAsync(rpModel.ProfessorId);
                    await _professorRepository.UpdateReviewAdded(professor);
                    return (true, null);
                }
                else throw new ReviewProfessorByUserExistsException();

            }
            catch (ArgumentException e) { return (false, e); }
            catch (ReviewProfessorByUserExistsException e) { return (false, e); }
            catch (Exception e) { return (false, e); }
        }

        public async Task<(bool, Exception?)> DeleteReviewAsync(int reviewId) {
            try
            {
                var review = await _repository.GetReviewByIdAsync(reviewId);
                
                await _repository.DeleteReviewAsync(review);

                var professor = await _professorRepository.GetProfessorByIdAsync(review.ProfessorId);
                await _professorRepository.UpdateReviewDeleted(professor);
                return (true, null);
            }
            catch (ReviewNotFoundException e) { return (false, e); }
            catch (Exception e) { return (false, e); }
        }

        public async Task<(bool, Exception?)> IsReviewLikedByUser(int userId, int reviewId) {
            try
            {
                _ = await _userRepository.GetUserByIdAsync(userId);
                _ = await _repository.GetReviewByIdAsync(reviewId);

                var liked = await _repository.DidUserLikedReview(userId, reviewId);
                return (liked, null);

            }
            catch (UserNotFoundException e) { return (false, e); }
            catch (ReviewNotFoundException e) { return (false, e); }
            catch (Exception e) { return (false, e); }
        }

        public async Task<(bool, Exception?)> IsReviewDislikedByUser(int userId, int reviewId)
        {
            try
            {
                _ = await _userRepository.GetUserByIdAsync(userId);
                _ = await _repository.GetReviewByIdAsync(reviewId);

                var disliked = await _repository.DidUserDislikedReview(userId, reviewId);
                return (disliked, null);

            }
            catch (UserNotFoundException e) { return (false, e); }
            catch (ReviewNotFoundException e) { return (false, e); }
            catch (Exception e) { return (false, e); }
        }

        public async Task<(bool, Exception?)> IsReviewSavedByUserAsync(int userId, int reviewId) {
            try { 
                _ = await _userRepository.GetUserByIdAsync(userId);
                _ = await _repository.GetReviewByIdAsync(reviewId);

                var saved = await _repository.IsReviewSavedByUserAsync(userId, reviewId);
                return (saved, null);

            }
            catch(UserNotFoundException e) { return (false, e); }
            catch(ReviewNotFoundException e) { return (false, e); }
            catch(Exception e) { return (false, e);}
        }

        public async Task<(bool, Exception?)> SaveReviewAsync(int userId, int reviewId) {
            try {
                var user = await _userRepository.GetUserByIdAsync(userId);
                var review = await _repository.GetReviewByIdAsync(reviewId);

                await _repository.SaveReviewAsync(review, user);

                return (true, null);
            }
            catch(UserNotFoundException e) { return (false, e); }
            catch(ReviewNotFoundException e) { return (false, e); }
            catch(Exception e) { return (false, e);}
        }

        public async Task<(bool, Exception?)> UnsaveReviewAsync(int userId, int reviewId)
        {
            try
            {
                var user = await _userRepository.GetUserByIdAsync(userId);
                var review = await _repository.GetReviewByIdAsync(reviewId);

                await _repository.UnsaveReviewAsync(review, user);

                return (true, null);
            }
            catch (UserNotFoundException e) { return (false, e); }
            catch (ReviewNotFoundException e) { return (false, e); }
            catch (Exception e) { return (false, e); }
        }
    }
}
