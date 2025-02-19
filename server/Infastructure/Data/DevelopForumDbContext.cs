using server.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace server.Infastructure.Data
{
    public class DevelopForumDbContext : DbContext
    {
        public DevelopForumDbContext(DbContextOptions<DevelopForumDbContext> options) : base(options)
        {
        }

        public DbSet<Post> Posts { get; set; }
        public DbSet<User> Users { get; set; }

        public DbSet<Category> Categories { get; set; }

        public DbSet<Comment> Comments { get; set; }

        public DbSet<Role> Roles { get; set; }

        public DbSet<Likes> Likes { get; set; }

        public DbSet<Follows> Follows { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Конфигурация связи подписок и подписчиков
            modelBuilder.Entity<Follows>()
                .HasOne(f => f.Follower)
                .WithMany(u => u.Followings)  // Пользователь может иметь много подписок
                .HasForeignKey(f => f.FollowerId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Follows>()
                .HasOne(f => f.Following)
                .WithMany(u => u.Followers)   // Пользователь может иметь много подписчиков
                .HasForeignKey(f => f.FollowingId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }

   
}