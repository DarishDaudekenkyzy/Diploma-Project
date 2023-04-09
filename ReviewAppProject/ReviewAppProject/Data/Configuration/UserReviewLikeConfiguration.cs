﻿using ReviewAppProject.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ReviewAppProject.Data.Configuration
{
    public class UserReviewLikeConfiguration : IEntityTypeConfiguration<UserReviewLike>
    {
        public void Configure(EntityTypeBuilder<UserReviewLike> builder) {
            builder.HasKey(l => new { l.UserId, l.ReviewId });

            builder.HasOne(l => l.User)
                .WithMany(u => u.LikedReviews)
                .HasForeignKey(l => l.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull);

            builder.HasOne(l => l.Review)
                .WithMany(r => r.LikedUsers)
                .HasForeignKey(l => l.ReviewId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
