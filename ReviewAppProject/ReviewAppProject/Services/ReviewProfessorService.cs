﻿using Microsoft.EntityFrameworkCore;
using ReviewAppProject.Data.Models;
using ReviewAppProject.Data.Repository;
using ReviewAppProject.Exceptions;
using ReviewAppProject.Models;
using ReviewAppProject.Views;
using Serilog;

namespace ReviewAppProject.Services
{
    public class ReviewProfessorService
    {
        private readonly IReviewProfessorRepository _repository;
        private readonly IUserRepository _userRepository;
        private readonly IProfessorRepository _profRepository;

        public ReviewProfessorService(
            IReviewProfessorRepository repository,
            IUserRepository userRepository,
            IProfessorRepository profRepository)
        {
            _repository = repository;
            _userRepository = userRepository;
            _profRepository = profRepository;
        }

        public async IAsyncEnumerable<ReviewProfessor> GetAllReviewsAsync()
        {
            var reviews = _repository.GetAllReviewsAsync();

            await foreach (var r in reviews)
            {
                yield return r;
            }
        }

        public async IAsyncEnumerable<ReviewProfessor> GetAllReviewsOfUserAsync(int userId)
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
