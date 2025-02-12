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
    }

   
}